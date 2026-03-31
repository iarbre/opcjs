/**
 * Unit tests for the Client keep-alive mechanism.
 *
 * The keep-alive timer is private, so we access it through `(client as any)`
 * after wiring minimal mocks for `attributeService` and `subscriptionHandler`.
 * Vitest's fake-timer API advances real time without wall-clock delays.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Client } from '../../src/client.js'
import { ConfigurationClient } from '../../src/configuration/configurationClient.js'
import { UserIdentity } from '../../src/userIdentity.js'

/** NodeId of Server_ServerStatus (ns=0, i=2256) — must match the constant in client.ts. */
const KEEP_ALIVE_INTERVAL_MS = 25_000

function makeClient(): Client {
  const config = ConfigurationClient.getSimple('keep-alive-test', 'test')
  const identity = UserIdentity.newAnonymous()
  return new Client('opc.wss://localhost:4840', config, identity)
}

function injectMocks(
  client: Client,
  hasActiveSubscription: boolean,
  readValue: ReturnType<typeof vi.fn>,
): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = client as any
  c.attributeService = { ReadValue: readValue }
  c.subscriptionHandler = { hasActiveSubscription: () => hasActiveSubscription }
}

describe('Client keep-alive', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('reads Server_ServerStatus when no subscription is active', async () => {
    const readValue = vi.fn().mockResolvedValue([])
    const client = makeClient()
    injectMocks(client, false, readValue)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(client as any).startKeepAlive()

    await vi.advanceTimersByTimeAsync(KEEP_ALIVE_INTERVAL_MS)

    expect(readValue).toHaveBeenCalledOnce()
  })

  it('skips the read when a subscription is active', async () => {
    const readValue = vi.fn().mockResolvedValue([])
    const client = makeClient()
    injectMocks(client, true, readValue)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(client as any).startKeepAlive()

    await vi.advanceTimersByTimeAsync(KEEP_ALIVE_INTERVAL_MS)

    expect(readValue).not.toHaveBeenCalled()
  })

  it('fires multiple times over multiple intervals', async () => {
    const readValue = vi.fn().mockResolvedValue([])
    const client = makeClient()
    injectMocks(client, false, readValue)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(client as any).startKeepAlive()

    await vi.advanceTimersByTimeAsync(KEEP_ALIVE_INTERVAL_MS * 3)

    expect(readValue).toHaveBeenCalledTimes(3)
  })

  it('stops firing after stopKeepAlive is called', async () => {
    const readValue = vi.fn().mockResolvedValue([])
    const client = makeClient()
    injectMocks(client, false, readValue)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = client as any
    c.startKeepAlive()

    await vi.advanceTimersByTimeAsync(KEEP_ALIVE_INTERVAL_MS)
    expect(readValue).toHaveBeenCalledOnce()

    c.stopKeepAlive()
    readValue.mockClear()

    await vi.advanceTimersByTimeAsync(KEEP_ALIVE_INTERVAL_MS * 5)
    expect(readValue).not.toHaveBeenCalled()
  })

  it('does not throw when attributeService is unavailable', async () => {
    const client = makeClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = client as any
    c.attributeService = undefined
    c.subscriptionHandler = { hasActiveSubscription: () => false }

    c.startKeepAlive()

    await expect(vi.advanceTimersByTimeAsync(KEEP_ALIVE_INTERVAL_MS)).resolves.not.toThrow()

    c.stopKeepAlive()
  })

  it('logs a warning but does not rethrow when ReadValue rejects', async () => {
    const readValue = vi.fn().mockRejectedValue(new Error('network error'))
    const client = makeClient()
    injectMocks(client, false, readValue)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = client as any
    c.startKeepAlive()

    // Should not throw — errors are swallowed with a warn log.
    await expect(vi.advanceTimersByTimeAsync(KEEP_ALIVE_INTERVAL_MS)).resolves.not.toThrow()

    c.stopKeepAlive()
  })
})
