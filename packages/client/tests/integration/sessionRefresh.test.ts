/**
 * Unit tests for Client's automatic session-refresh behaviour.
 *
 * All tests run fully in-process without any network connection. Instead of
 * calling `client.connect()` (which spins up WebSocket / TCP infrastructure),
 * the required private fields are injected directly via `(client as any)`.
 *
 * The key insight is that `withSessionRefresh` catches `SessionInvalidError`,
 * calls `sessionHandler.createNewSession`, then calls `initServices` to
 * rebuild the service layer. By spying on `initServices` with a no-op we keep
 * the already-injected mock services in place across the retry, which lets us
 * program both the failing first call and the succeeding retry on the same mock.
 */

import { describe, expect, it, vi } from 'vitest'

import { NodeId, StatusCode } from 'opcjs-base'

import { Client } from '../../src/client.js'
import { ConfigurationClient } from '../../src/configurationClient.js'
import { SessionInvalidError } from '../../src/sessions/sessionInvalidError.js'
import { UserIdentity } from '../../src/userIdentity.js'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeClient(): Client {
  return new Client(
    'wss://test-host/ua',
    ConfigurationClient.getSimple('TestClient', 'test'),
    UserIdentity.newAnonymous(),
  )
}

/** The mock Session that `sessionHandler.createNewSession` will return. */
function makeMockSession() {
  return { getAuthToken: () => NodeId.newTwoByte(0) }
}

/**
 * Wires up a Client instance so that:
 *  - `attributeService`, `browseService`, `methodService` are vi mocks
 *  - `sessionHandler.createNewSession` resolves to a fresh mock session
 *  - `initServices` is spied on as a no-op (so mocked services survive the refresh)
 */
function setupClientMocks(client: Client) {
  const c = client as unknown as Record<string, unknown>

  const attributeService = { ReadValue: vi.fn() }
  const browseService = { browse: vi.fn(), browseNext: vi.fn() }
  const methodService = { call: vi.fn() }
  const sessionHandler = { createNewSession: vi.fn().mockResolvedValue(makeMockSession()) }

  c.attributeService = attributeService
  c.browseService = browseService
  c.methodService = methodService
  c.subscriptionHandler = { subscribe: vi.fn() }
  c.session = makeMockSession()
  c.sessionHandler = sessionHandler
  // secureChannel must be non-null for initServices(); the spy below makes it a no-op anyway
  c.secureChannel = {}

  // Prevent initServices() from replacing the mocked services with real ones
  vi.spyOn(client as unknown as { initServices(): void }, 'initServices').mockImplementation(() => {
    // no-op: keep injected mocks in place
  })

  return { attributeService, browseService, methodService, sessionHandler }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Client – automatic session refresh', () => {
  describe('read()', () => {
    it('succeeds immediately when the session is valid', async () => {
      const client = makeClient()
      const { attributeService } = setupClientMocks(client)

      attributeService.ReadValue.mockResolvedValue([{ value: 42, statusCode: StatusCode.Good }])

      const results = await client.read([NodeId.newNumeric(0, 2258)])

      expect(results).toHaveLength(1)
      expect(results[0].value).toBe(42)
      expect(attributeService.ReadValue).toHaveBeenCalledOnce()
    })

    it('refreshes the session and retries when BadSessionIdInvalid is received', async () => {
      const client = makeClient()
      const { attributeService, sessionHandler } = setupClientMocks(client)

      // First call simulates a dropped session; second call is the successful retry.
      attributeService.ReadValue
        .mockRejectedValueOnce(new SessionInvalidError(StatusCode.BadSessionIdInvalid))
        .mockResolvedValueOnce([{ value: 99, statusCode: StatusCode.Good }])

      const results = await client.read([NodeId.newNumeric(0, 2258)])

      expect(results).toHaveLength(1)
      expect(results[0].value).toBe(99)
      expect(sessionHandler.createNewSession).toHaveBeenCalledOnce()
      expect(attributeService.ReadValue).toHaveBeenCalledTimes(2)
    })

    it('refreshes the session and retries when BadSessionClosed is received', async () => {
      const client = makeClient()
      const { attributeService, sessionHandler } = setupClientMocks(client)

      attributeService.ReadValue
        .mockRejectedValueOnce(new SessionInvalidError(StatusCode.BadSessionClosed))
        .mockResolvedValueOnce([{ value: 7, statusCode: StatusCode.Good }])

      const results = await client.read([NodeId.newNumeric(0, 2258)])

      expect(results[0].value).toBe(7)
      expect(sessionHandler.createNewSession).toHaveBeenCalledOnce()
    })

    it('propagates non-session errors without triggering a refresh', async () => {
      const client = makeClient()
      const { attributeService, sessionHandler } = setupClientMocks(client)

      attributeService.ReadValue.mockRejectedValue(new Error('BadNodeIdUnknown'))

      await expect(client.read([NodeId.newNumeric(0, 9999)])).rejects.toThrow('BadNodeIdUnknown')
      expect(sessionHandler.createNewSession).not.toHaveBeenCalled()
    })

    it('propagates the error when the retry also fails', async () => {
      const client = makeClient()
      const { attributeService } = setupClientMocks(client)

      const retryError = new Error('Server still unavailable')
      attributeService.ReadValue
        .mockRejectedValueOnce(new SessionInvalidError(StatusCode.BadSessionIdInvalid))
        .mockRejectedValueOnce(retryError)

      await expect(client.read([NodeId.newNumeric(0, 2258)])).rejects.toThrow('Server still unavailable')
    })
  })

  describe('browse()', () => {
    it('refreshes the session and retries when BadSessionIdInvalid is received', async () => {
      const client = makeClient()
      const { browseService, sessionHandler } = setupClientMocks(client)

      // browse() calls browseService.browse() internally; the retry must return
      // a well-formed BrowseResult so browseRecursive can read .references.
      const emptyBrowseResult = { references: [], statusCode: StatusCode.Good, continuationPoint: null }
      browseService.browse
        .mockRejectedValueOnce(new SessionInvalidError(StatusCode.BadSessionIdInvalid))
        .mockResolvedValueOnce([emptyBrowseResult]) // retry returns a leaf node with no children

      const results = await client.browse(NodeId.newNumeric(0, 84))

      expect(results).toEqual([])
      expect(sessionHandler.createNewSession).toHaveBeenCalledOnce()
      expect(browseService.browse).toHaveBeenCalledTimes(2)
    })
  })
})
