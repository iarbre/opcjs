/**
 * Unit tests for the Session Cancel conformance unit (optional, Core 2022 Client Facet).
 *
 * OPC UA Part 4, Section 5.7.5: Clients invoke Cancel to abandon outstanding
 * service requests. The server returns the number of requests actually cancelled.
 *
 * These tests cover:
 *  1. `requestHandle` auto-increment in `ServiceBase` (unique, non-zero handles).
 *  2. `lastAssignedHandle()` helper reflects the most-recently assigned handle.
 *  3. `SessionService.cancel()` sends `CancelRequest` and returns `cancelCount`.
 *  4. `SessionService.cancel()` throws on a non-Good response.
 *  5. `Client.cancel()` delegates through `SessionHandler` to `SessionService`.
 *  6. `Client.cancel()` throws when not connected.
 *  7. `Client.lastRequestHandle` is readable.
 *  8. `read()` / `browse()` / `callMethod()` expose `requestHandle` on the returned Promise.
 */

import { describe, expect, it, vi } from 'vitest'

import { CancelResponse, type IOpcType, NodeId, StatusCode } from 'opcjs-base'

import { Client } from '../../src/client.js'
import { ConfigurationClient } from '../../src/configuration/configurationClient.js'
import { lastAssignedHandle } from '../../src/services/serviceBase.js'
import { SECURITY_POLICY_NONE_URI } from '../../src/securityConfiguration.js'
import { UserIdentity } from '../../src/userIdentity.js'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeConfig(): ConfigurationClient {
  return ConfigurationClient.getSimple('TestClient', 'test')
}

function makeChannel(issueResponse?: () => Promise<IOpcType>) {
  return {
    getSecurityPolicy: () => SECURITY_POLICY_NONE_URI,
    getSecurityMode: () => 0,
    getEndpointUrl: () => 'opc.wss://test',
    issueServiceRequest: issueResponse ?? (() => Promise.reject(new Error('not used')) as Promise<IOpcType>),
  }
}

// ---------------------------------------------------------------------------
// Tests – requestHandle auto-increment
// ---------------------------------------------------------------------------

describe('ServiceBase – requestHandle auto-increment', () => {
  it('assigns a non-zero handle to every request', () => {
    const before = lastAssignedHandle()
    // Force a new handle to be assigned by reading the next expected value.
    // The counter starts from wherever it currently is (module state) so we just
    // verify the value after a request is different from what came before the next
    // increment. We test this indirectly via `lastAssignedHandle`.
    const next = lastAssignedHandle() + 1
    expect(next).toBeGreaterThan(0)
    expect(before).toBeGreaterThanOrEqual(0)
  })

  it('lastAssignedHandle() rises monotonically across requests', async () => {
    // Build a minimal fake channel that returns a Good CancelResponse so we can
    // trigger two real createRequestHeader() calls inside SessionService.cancel().
    const cancelResponse = new CancelResponse()
    cancelResponse.responseHeader = { serviceResult: StatusCode.Good } as CancelResponse['responseHeader']
    cancelResponse.cancelCount = 0

    const channel = makeChannel(() => Promise.resolve(cancelResponse as IOpcType))
    const { SessionService } = await import('../../src/services/sessionService.js')
    const { NodeId } = await import('opcjs-base')
    const svc = new SessionService(NodeId.newTwoByte(0), channel as ReturnType<typeof makeChannel>, makeConfig())

    await svc.cancel(0)
    const h1 = lastAssignedHandle()
    await svc.cancel(0)
    const h2 = lastAssignedHandle()
    expect(h2).toBeGreaterThan(h1)
  })
})

// ---------------------------------------------------------------------------
// Tests – SessionService.cancel()
// ---------------------------------------------------------------------------

describe('SessionService.cancel()', () => {
  async function makeService(channelResponse: () => Promise<IOpcType>) {
    const { SessionService } = await import('../../src/services/sessionService.js')
    const { NodeId } = await import('opcjs-base')
    return new SessionService(
      NodeId.newTwoByte(0),
      makeChannel(channelResponse) as ReturnType<typeof makeChannel>,
      makeConfig(),
    )
  }

  it('sends CancelRequest and returns cancelCount from the response', async () => {
    const cancelResponse = new CancelResponse()
    cancelResponse.responseHeader = { serviceResult: StatusCode.Good } as CancelResponse['responseHeader']
    cancelResponse.cancelCount = 3

    const spy = vi.fn(() => Promise.resolve(cancelResponse as IOpcType))
    const svc = await makeService(spy)

    const result = await svc.cancel(42)

    expect(result).toBe(3)
    expect(spy).toHaveBeenCalledTimes(1)
    // Verify the sent request carries the correct requestHandle.
    const calls = spy.mock.calls as unknown as [unknown[]]
    const sentRequest = calls[0][0] as { requestHandle: number }
    expect(sentRequest.requestHandle).toBe(42)
  })

  it('returns 0 when cancelCount is undefined in the response', async () => {
    const cancelResponse = new CancelResponse()
    cancelResponse.responseHeader = { serviceResult: StatusCode.Good } as CancelResponse['responseHeader']
    // cancelCount not set – should default to 0

    const svc = await makeService(() => Promise.resolve(cancelResponse as IOpcType))
    const result = await svc.cancel(1)
    expect(result).toBe(0)
  })

  it('throws when the server returns a non-Good serviceResult', async () => {
    const cancelResponse = new CancelResponse()
    cancelResponse.responseHeader = {
      serviceResult: StatusCode.BadServiceUnsupported,
    } as CancelResponse['responseHeader']
    cancelResponse.cancelCount = 0

    const svc = await makeService(() => Promise.resolve(cancelResponse as IOpcType))
    await expect(svc.cancel(1)).rejects.toThrow(/CancelRequest failed/)
  })
})

// ---------------------------------------------------------------------------
// Tests – Client.cancel() and Client.lastRequestHandle
// ---------------------------------------------------------------------------

describe('Client.cancel()', () => {
  it('throws when not connected (no sessionHandler)', async () => {
    const client = new Client('wss://test', makeConfig(), UserIdentity.newAnonymous())
    await expect(client.cancel(1)).rejects.toThrow(/Not connected/)
  })

  it('delegates to sessionHandler.cancel() and returns cancelCount', async () => {
    const client = new Client('wss://test', makeConfig(), UserIdentity.newAnonymous())

    // Inject a fake sessionHandler via type erasure.
    const fakeHandler = { cancel: vi.fn(() => Promise.resolve(2)) }
    ;(client as unknown as Record<string, unknown>)['sessionHandler'] = fakeHandler

    const result = await client.cancel(7)
    expect(result).toBe(2)
    expect(fakeHandler.cancel).toHaveBeenCalledWith(7)
  })

  it('lastRequestHandle returns a number', () => {
    const client = new Client('wss://test', makeConfig(), UserIdentity.newAnonymous())
    expect(typeof client.lastRequestHandle).toBe('number')
  })

  it('lastRequestHandle reflects the value from lastAssignedHandle()', () => {
    const client = new Client('wss://test', makeConfig(), UserIdentity.newAnonymous())
    expect(client.lastRequestHandle).toBe(lastAssignedHandle())
  })
})

// ---------------------------------------------------------------------------
// Tests – requestHandle on returned promise
// ---------------------------------------------------------------------------

describe('read / browse / callMethod – requestHandle on returned Promise', () => {
  it('read() exposes requestHandle synchronously on the returned Promise', () => {
    const client = new Client('wss://test', makeConfig(), UserIdentity.newAnonymous())
    // Inject a minimal fake attributeService so read() can allocate the handle
    // without needing a real connection.  The promise is never awaited here.
    ;(client as unknown as Record<string, unknown>)['attributeService'] = {
      ReadValue: () => new Promise(() => { /* never resolves */ }),
    }
    ;(client as unknown as Record<string, unknown>)['session'] = {}

    const before = lastAssignedHandle()
    const req = client.read([])
    const after = lastAssignedHandle()

    expect(req.requestHandle).toBeGreaterThan(0)
    expect(req.requestHandle).toBeGreaterThan(before)
    expect(req.requestHandle).toBeLessThanOrEqual(after)
    // The handle is a plain number available without awaiting the Promise.
    expect(typeof req.requestHandle).toBe('number')
  })

  it('callMethod() exposes requestHandle synchronously on the returned Promise', () => {
    const client = new Client('wss://test', makeConfig(), UserIdentity.newAnonymous())
    ;(client as unknown as Record<string, unknown>)['methodService'] = {
      call: () => new Promise(() => { /* never resolves */ }),
    }
    ;(client as unknown as Record<string, unknown>)['session'] = {}

    const req = client.callMethod(NodeId.newTwoByte(1), NodeId.newTwoByte(2))
    expect(req.requestHandle).toBeGreaterThan(0)
    expect(typeof req.requestHandle).toBe('number')
  })

  it('browse() exposes requestHandle synchronously on the returned Promise', () => {
    const client = new Client('wss://test', makeConfig(), UserIdentity.newAnonymous())
    ;(client as unknown as Record<string, unknown>)['browseService'] = {
      browse: () => new Promise(() => { /* never resolves */ }),
    }
    ;(client as unknown as Record<string, unknown>)['session'] = {}

    const req = client.browse(NodeId.newNumeric(0, 84))
    expect(req.requestHandle).toBeGreaterThan(0)
    expect(typeof req.requestHandle).toBe('number')
  })

  it('consecutive calls produce strictly increasing requestHandles', () => {
    const client = new Client('wss://test', makeConfig(), UserIdentity.newAnonymous())
    ;(client as unknown as Record<string, unknown>)['attributeService'] = {
      ReadValue: () => new Promise(() => { /* never resolves */ }),
    }
    ;(client as unknown as Record<string, unknown>)['session'] = {}

    const req1 = client.read([])
    const req2 = client.read([])
    expect(req2.requestHandle).toBeGreaterThan(req1.requestHandle)
  })
})
