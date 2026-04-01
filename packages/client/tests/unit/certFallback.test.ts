/**
 * Unit tests for the OPC UA 1.0 Security-None CreateSession cert fallback.
 *
 * The conformance unit "Security None CreateSession ActivateSession 1.0"
 * (optional) requires that the client retries CreateSession with an
 * ApplicationInstanceCertificate when the server rejects the initial
 * (no-certificate) call with a certificate-related status code.
 *
 * These tests exercise `SessionHandler.createNewSession()` via the private
 * helper path, verifying:
 *   1. Happy path (no cert error): proceeds normally.
 *   2. Cert required + cert configured: retries with the certificate.
 *   3. Cert required + cert not configured: error propagates.
 *   4. All three trigger status codes fire the fallback.
 *   5. Non-cert errors propagate without retry.
 */

import { describe, expect, it, vi } from 'vitest'

import {
  EndpointDescription,
  type IOpcType,
  NodeId,
  StatusCode,
  UserTokenPolicy,
  UserTokenTypeEnum,
} from 'opcjs-base'

import { ConfigurationClient } from '../../src/configuration/configurationClient.js'
import { CertificateRequiredError, CERTIFICATE_REQUIRED_STATUS_CODES } from '../../src/sessions/certificateRequiredError.js'
import { SessionHandler } from '../../src/sessions/sessionHandler.js'
import { UserIdentity } from '../../src/userIdentity.js'
import { SECURITY_POLICY_NONE_URI } from '../../src/securityConfiguration.js'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeChannel() {
  return {
    getSecurityPolicy: () => SECURITY_POLICY_NONE_URI,
    getSecurityMode: () => 0,
    getEndpointUrl: () => 'opc.wss://test',
    issueServiceRequest: () => Promise.reject(new Error('not used')) as Promise<IOpcType>,
  }
}

function makeConfig(cfg: Partial<ConfigurationClient> = {}): ConfigurationClient {
  const config = ConfigurationClient.getSimple('TestClient', 'test')
  Object.assign(config, cfg)
  return config
}

/** Minimal endpoint that satisfies the anonymous-token lookup in Session.activateSession. */
function makeMinimalEndpoint(): EndpointDescription {
  const ep = new EndpointDescription()
  const policy = new UserTokenPolicy()
  policy.tokenType = UserTokenTypeEnum.Anonymous
  policy.policyId = 'anon'
  ep.userIdentityTokens = [policy]
  ep.endpointUrl = 'opc.wss://test'
  ep.securityMode = 0
  ep.securityPolicyUri = SECURITY_POLICY_NONE_URI
  return ep
}

// ---------------------------------------------------------------------------
// Helpers for mocking SessionService inside SessionHandler
// ---------------------------------------------------------------------------

/**
 * Replaces the private `sessionServices` on the handler with a mock whose
 * `createSession` resolves with `result` on the n-th call.  All other methods
 * (recreate, activateSession, closeSession) are no-ops.
 */
function injectSessionService(
  handler: SessionHandler,
  createSessionResponses: Array<{ throws?: unknown; result?: ReturnType<typeof makeFakeSessionResult> }>,
): { createSessionMock: ReturnType<typeof vi.fn> } {
  let callIndex = 0
  const createSessionMock = vi.fn(async () => {
    const response = createSessionResponses[callIndex++]
    if (response.throws) throw response.throws
    return response.result!
  })

  const fakeService = {
    createSession: createSessionMock,
    recreate: vi.fn(() => fakeService),
    activateSession: vi.fn(() => Promise.resolve()),
    closeSession: vi.fn(() => Promise.resolve()),
  }

  // `sessionServices` is private — access via type erasure for testing.
  ;(handler as unknown as Record<string, unknown>)['sessionServices'] = fakeService

  return { createSessionMock }
}

function makeFakeSessionResult() {
  const ep = makeMinimalEndpoint()
  return { sessionId: 1, authToken: NodeId.newTwoByte(42), endpoint: ep }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('SessionHandler – OPC UA 1.0 cert fallback (createNewSession)', () => {
  it('succeeds without fallback when CreateSession returns Good', async () => {
    const handler = new SessionHandler(makeChannel() as ReturnType<typeof makeChannel>, makeConfig())
    const { createSessionMock } = injectSessionService(handler, [
      { result: makeFakeSessionResult() },
    ])

    await handler.createNewSession(UserIdentity.newAnonymous())

    expect(createSessionMock).toHaveBeenCalledTimes(1)
    expect(createSessionMock).toHaveBeenCalledWith(null)
  })

  it('retries with cert when BadCertificateInvalid is returned and cert is configured', async () => {
    const cert = new Uint8Array([0xde, 0xad, 0xbe, 0xef])
    const handler = new SessionHandler(
      makeChannel() as ReturnType<typeof makeChannel>,
      makeConfig({ securityConfiguration: { applicationInstanceCertificate: cert } }),
    )
    const { createSessionMock } = injectSessionService(handler, [
      { throws: new CertificateRequiredError(StatusCode.BadCertificateInvalid) },
      { result: makeFakeSessionResult() },
    ])

    await handler.createNewSession(UserIdentity.newAnonymous())

    expect(createSessionMock).toHaveBeenCalledTimes(2)
    expect(createSessionMock).toHaveBeenNthCalledWith(1, null)
    expect(createSessionMock).toHaveBeenNthCalledWith(2, cert)
  })

  it('propagates CertificateRequiredError when no cert is configured', async () => {
    const handler = new SessionHandler(makeChannel() as ReturnType<typeof makeChannel>, makeConfig())
    injectSessionService(handler, [
      { throws: new CertificateRequiredError(StatusCode.BadCertificateInvalid) },
    ])

    await expect(handler.createNewSession(UserIdentity.newAnonymous())).rejects.toBeInstanceOf(
      CertificateRequiredError,
    )
  })

  it('propagates non-cert errors without retrying', async () => {
    const cert = new Uint8Array([0xca, 0xfe])
    const handler = new SessionHandler(
      makeChannel() as ReturnType<typeof makeChannel>,
      makeConfig({ securityConfiguration: { applicationInstanceCertificate: cert } }),
    )
    const otherError = new Error('BadTimeout')
    const { createSessionMock } = injectSessionService(handler, [
      { throws: otherError },
    ])

    await expect(handler.createNewSession(UserIdentity.newAnonymous())).rejects.toBe(otherError)
    expect(createSessionMock).toHaveBeenCalledTimes(1)
  })

  it.each([...CERTIFICATE_REQUIRED_STATUS_CODES])(
    'triggers fallback for status code 0x%s',
    async (code) => {
      const cert = new Uint8Array([0x01])
      const handler = new SessionHandler(
        makeChannel() as ReturnType<typeof makeChannel>,
        makeConfig({ securityConfiguration: { applicationInstanceCertificate: cert } }),
      )
      const { createSessionMock } = injectSessionService(handler, [
        { throws: new CertificateRequiredError(code as number) },
        { result: makeFakeSessionResult() },
      ])

      await handler.createNewSession(UserIdentity.newAnonymous())

      expect(createSessionMock).toHaveBeenCalledTimes(2)
      expect(createSessionMock).toHaveBeenNthCalledWith(2, cert)
    },
  )
})

// ---------------------------------------------------------------------------
// CertificateRequiredError class
// ---------------------------------------------------------------------------

describe('CertificateRequiredError', () => {
  it('stores the status code', () => {
    const err = new CertificateRequiredError(StatusCode.BadCertificateInvalid)
    expect(err.statusCode).toBe(StatusCode.BadCertificateInvalid)
  })

  it('has the correct error name', () => {
    const err = new CertificateRequiredError(StatusCode.BadCertificateInvalid)
    expect(err.name).toBe('CertificateRequiredError')
  })

  it('includes the status code hex in the message', () => {
    const err = new CertificateRequiredError(StatusCode.BadCertificateInvalid)
    expect(err.message).toContain('80120000')
  })
})
