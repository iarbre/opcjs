/**
 * Unit tests for the Base Info Client Estimated Return Time conformance unit.
 *
 * OPC UA Part 5, §12.6: when a server announces a shutdown the client reads
 * `Server/ServerStatus/EstimatedReturnTime` (ns=0, i=2992) to determine how long
 * to wait before attempting to reconnect.
 *
 * Special values:
 *   MinDateTime (1601-01-01, getTime() ≤ OPC_UA_MIN_DATE_TIME_MS) → server will not restart
 *   Past DateTime                                                  → reconnect immediately (1 s)
 *   Future DateTime                                                → delay = returnTime − now
 *   Not a Date / read error                                        → fall back to shutdownReconnectDelayMs
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Client } from '../../src/client.js'
import { ConfigurationClient } from '../../src/configuration/configurationClient.js'
import { UserIdentity } from '../../src/userIdentity.js'

// OPC UA MinDateTime decoded as a JS epoch timestamp.
const OPC_UA_MIN_DATE_TIME_MS = -11_644_473_600_000

function makeClient(): Client {
    const config = ConfigurationClient.getSimple('ert-test', 'test')
    const identity = UserIdentity.newAnonymous()
    return new Client('opc.wss://localhost:4840', config, identity)
}

/** Wraps a Date in the Variant shape that AttributeService.ReadValue returns. */
function makeDateResult(date: Date) {
    return [{ value: { value: date } }]
}

describe('Client.computeReconnectDelayMs', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns shutdownReconnectDelayMs when attributeService is not initialised', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        const result: number | null = await c.computeReconnectDelayMs()
        expect(result).toBe(c.configuration.shutdownReconnectDelayMs)
    })

    it('returns null for MinDateTime (server will not restart)', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        const minDateTime = new Date(OPC_UA_MIN_DATE_TIME_MS)
        c.attributeService = { ReadValue: vi.fn().mockResolvedValue(makeDateResult(minDateTime)) }

        const result: number | null = await c.computeReconnectDelayMs()
        expect(result).toBeNull()
    })

    it('returns null for a date at the OPC UA epoch boundary', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        // Any date at or before MinDateTime is treated as "server will not restart".
        const epochDate = new Date(OPC_UA_MIN_DATE_TIME_MS)
        c.attributeService = { ReadValue: vi.fn().mockResolvedValue(makeDateResult(epochDate)) }

        expect(await c.computeReconnectDelayMs()).toBeNull()
    })

    it('returns the delay for a future EstimatedReturnTime', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        const futureDate = new Date(Date.now() + 8_000)
        c.attributeService = { ReadValue: vi.fn().mockResolvedValue(makeDateResult(futureDate)) }

        const result: number | null = await c.computeReconnectDelayMs()
        // Allow small timing tolerance.
        expect(result).toBeGreaterThan(7_000)
        expect(result).toBeLessThanOrEqual(8_000)
    })

    it('returns MIN_RECONNECT_DELAY_MS for a past EstimatedReturnTime', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        const pastDate = new Date(Date.now() - 5_000)
        c.attributeService = { ReadValue: vi.fn().mockResolvedValue(makeDateResult(pastDate)) }

        const result: number | null = await c.computeReconnectDelayMs()
        expect(result).toBe(c.configuration.minReconnectDelayMs)
    })

    it('falls back to shutdownReconnectDelayMs when the read returns a non-Date value', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        c.attributeService = {
            ReadValue: vi.fn().mockResolvedValue([{ value: { value: 'not-a-date' } }]),
        }

        const result: number | null = await c.computeReconnectDelayMs()
        expect(result).toBe(c.configuration.shutdownReconnectDelayMs)
    })

    it('falls back to shutdownReconnectDelayMs when the read rejects', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        c.attributeService = {
            ReadValue: vi.fn().mockRejectedValue(new Error('network error')),
        }

        const result: number | null = await c.computeReconnectDelayMs()
        expect(result).toBe(c.configuration.shutdownReconnectDelayMs)
    })
})

describe('Client.handleServerShutdownDetected – EstimatedReturnTime integration', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('uses the EstimatedReturnTime delay instead of shutdownReconnectDelayMs', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        const shutdownDelay: number = c.configuration.shutdownReconnectDelayMs
        const ertDelay = shutdownDelay + 3_000
        const futureDate = new Date(Date.now() + ertDelay)

        c.attributeService = {
            ReadValue: vi.fn().mockResolvedValue(makeDateResult(futureDate)),
        }
        const reconnect = vi.fn().mockResolvedValue(undefined)
        c.reconnectAndReactivate = reconnect
        c.initServices = vi.fn()

        c.handleServerShutdownDetected()

        // Should not fire after the old shutdownReconnectDelayMs.
        await vi.advanceTimersByTimeAsync(shutdownDelay)
        expect(reconnect).not.toHaveBeenCalled()

        // Should fire after the EstimatedReturnTime delay.
        await vi.advanceTimersByTimeAsync(ertDelay - shutdownDelay + 100)
        expect(reconnect).toHaveBeenCalledOnce()
    })

    it('fires onPermanentShutdown and does not reconnect for MinDateTime', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        const shutdownDelay: number = c.configuration.shutdownReconnectDelayMs
        const minDateTime = new Date(OPC_UA_MIN_DATE_TIME_MS)

        c.attributeService = {
            ReadValue: vi.fn().mockResolvedValue(makeDateResult(minDateTime)),
        }
        const reconnect = vi.fn().mockResolvedValue(undefined)
        c.reconnectAndReactivate = reconnect

        const permanentShutdown = vi.fn()
        client.onPermanentShutdown = permanentShutdown

        c.handleServerShutdownDetected()
        await vi.advanceTimersByTimeAsync(shutdownDelay * 3)

        expect(permanentShutdown).toHaveBeenCalledOnce()
        expect(reconnect).not.toHaveBeenCalled()
    })

    it('resets shutdownReconnectPending after onPermanentShutdown fires', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        const minDateTime = new Date(OPC_UA_MIN_DATE_TIME_MS)

        c.attributeService = {
            ReadValue: vi.fn().mockResolvedValue(makeDateResult(minDateTime)),
        }
        client.onPermanentShutdown = vi.fn()

        c.handleServerShutdownDetected()
        await vi.advanceTimersByTimeAsync(0)

        expect(c.shutdownReconnectPending).toBe(false)
    })

    it('reconnects quickly when EstimatedReturnTime is already in the past', async () => {
        const client = makeClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        const pastDate = new Date(Date.now() - 2_000)

        c.attributeService = {
            ReadValue: vi.fn().mockResolvedValue(makeDateResult(pastDate)),
        }
        const reconnect = vi.fn().mockResolvedValue(undefined)
        c.reconnectAndReactivate = reconnect
        c.initServices = vi.fn()

        c.handleServerShutdownDetected()

        // After minReconnectDelayMs the reconnect should have fired.
        await vi.advanceTimersByTimeAsync(c.configuration.minReconnectDelayMs + 100)
        expect(reconnect).toHaveBeenCalledOnce()
    })
})
