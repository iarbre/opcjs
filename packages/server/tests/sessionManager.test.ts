import { describe, it, expect, vi, afterEach } from 'vitest'

import {
  AnonymousIdentityToken,
  ExtensionObject,
  NodeId,
  UserNameIdentityToken,
} from 'opcjs-base'

import { ConfigurationServer } from '../src/configuration/configurationServer.js'
import {
  validateAnonymousToken,
  AuthenticationError,
} from '../src/security/anonymousAuthenticator.js'
import { SessionManager, SessionError } from '../src/sessions/sessionManager.js'

// ── helpers ──────────────────────────────────────────────────────────────────

function makeConfig(overrides?: {
  minSessionTimeoutMs?: number
  maxSessionTimeoutMs?: number
  maxSessions?: number
}) {
  const cfg = ConfigurationServer.getSimple('TestServer', 'test')
  if (overrides != null) {
    if (overrides.minSessionTimeoutMs !== undefined) cfg.minSessionTimeoutMs = overrides.minSessionTimeoutMs
    if (overrides.maxSessionTimeoutMs !== undefined) cfg.maxSessionTimeoutMs = overrides.maxSessionTimeoutMs
    if (overrides.maxSessions !== undefined) cfg.maxSessions = overrides.maxSessions
  }
  return cfg
}

function makeAnonToken(): ExtensionObject {
  return new ExtensionObject(new NodeId(0, 319), undefined, new AnonymousIdentityToken())
}

// ── validateAnonymousToken ────────────────────────────────────────────────────

describe('validateAnonymousToken', () => {
  it('accepts an AnonymousIdentityToken inside an ExtensionObject', () => {
    expect(() => validateAnonymousToken(makeAnonToken())).not.toThrow()
  })

  it('throws AuthenticationError when token is null', () => {
    expect(() => validateAnonymousToken(null)).toThrow(AuthenticationError)
  })

  it('throws AuthenticationError when token is undefined', () => {
    expect(() => validateAnonymousToken(undefined)).toThrow(AuthenticationError)
  })

  it('throws AuthenticationError when token wraps a non-anonymous type', () => {
    const usernameToken = new UserNameIdentityToken()
    usernameToken.userName = 'alice'
    usernameToken.password = new Uint8Array()
    usernameToken.encryptionAlgorithm = ''
    const token = new ExtensionObject(new NodeId(0, 322), undefined, usernameToken)
    expect(() => validateAnonymousToken(token)).toThrow(AuthenticationError)
  })
})

// ── SessionManager ────────────────────────────────────────────────────────────

describe('SessionManager', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('createSession returns a session with unique IDs and a 32-byte nonce', () => {
    const mgr = new SessionManager(makeConfig())
    const s = mgr.createSession(1, 60_000)

    expect(s.sessionId).toBeInstanceOf(NodeId)
    expect(s.authenticationToken).toBeInstanceOf(NodeId)
    expect(s.sessionId.toString()).not.toBe(s.authenticationToken.toString())
    expect(s.serverNonce).toBeInstanceOf(Uint8Array)
    expect(s.serverNonce.length).toBe(32)
    expect(s.isActivated).toBe(false)
  })

  it('createSession produces unique IDs across multiple calls', () => {
    const mgr = new SessionManager(makeConfig())
    const s1 = mgr.createSession(1, 60_000)
    const s2 = mgr.createSession(1, 60_000)

    expect(s1.sessionId.toString()).not.toBe(s2.sessionId.toString())
    expect(s1.authenticationToken.toString()).not.toBe(s2.authenticationToken.toString())
  })

  it('createSession clamps timeout to [min, max] range', () => {
    const cfg = makeConfig({ minSessionTimeoutMs: 10_000, maxSessionTimeoutMs: 60_000 })
    const mgr = new SessionManager(cfg)

    expect(mgr.createSession(1, 1_000).revisedTimeoutMs).toBe(10_000)
    expect(mgr.createSession(1, 999_999).revisedTimeoutMs).toBe(60_000)
    expect(mgr.createSession(1, 30_000).revisedTimeoutMs).toBe(30_000)
  })

  it('createSession throws BadTooManySessions when limit reached', () => {
    const cfg = makeConfig({ maxSessions: 2 })
    const mgr = new SessionManager(cfg)
    mgr.createSession(1, 60_000)
    mgr.createSession(1, 60_000)

    expect(() => mgr.createSession(1, 60_000)).toThrow(SessionError)
    expect(() => mgr.createSession(1, 60_000)).toThrowError(/limit/)
  })

  it('activateSession marks session as activated', () => {
    const mgr = new SessionManager(makeConfig())
    const s = mgr.createSession(1, 60_000)

    const activated = mgr.activateSession(s.authenticationToken, makeAnonToken(), 1)
    expect(activated.isActivated).toBe(true)
  })

  it('activateSession throws AuthenticationError for non-anonymous token', () => {
    const mgr = new SessionManager(makeConfig())
    const s = mgr.createSession(1, 60_000)

    const usernameToken = new UserNameIdentityToken()
    usernameToken.userName = 'bob'
    usernameToken.password = new Uint8Array()
    usernameToken.encryptionAlgorithm = ''
    const badToken = new ExtensionObject(new NodeId(0, 322), undefined, usernameToken)

    expect(() => mgr.activateSession(s.authenticationToken, badToken, 1)).toThrow(
      AuthenticationError,
    )
  })

  it('validateSession returns session after activation', () => {
    const mgr = new SessionManager(makeConfig())
    const s = mgr.createSession(1, 60_000)
    mgr.activateSession(s.authenticationToken, makeAnonToken(), 1)

    const validated = mgr.validateSession(s.authenticationToken)
    expect(validated.sessionId.toString()).toBe(s.sessionId.toString())
  })

  it('validateSession throws BadSessionIdInvalid for unknown token', () => {
    const mgr = new SessionManager(makeConfig())
    expect(() => mgr.validateSession(new NodeId(0, 9999))).toThrow(SessionError)
  })

  it('validateSession throws BadSessionClosed for non-activated session', () => {
    const mgr = new SessionManager(makeConfig())
    const s = mgr.createSession(1, 60_000)

    expect(() => mgr.validateSession(s.authenticationToken)).toThrow(SessionError)
  })

  it('closeSession removes the session', () => {
    const mgr = new SessionManager(makeConfig())
    const s = mgr.createSession(1, 60_000)
    mgr.activateSession(s.authenticationToken, makeAnonToken(), 1)

    mgr.closeSession(s.authenticationToken)

    expect(() => mgr.validateSession(s.authenticationToken)).toThrow(SessionError)
  })

  it('closeSession is idempotent for unknown tokens', () => {
    const mgr = new SessionManager(makeConfig())
    expect(() => mgr.closeSession(new NodeId(0, 9999))).not.toThrow()
  })

  it('touchSession resets the activity timestamp', async () => {
    vi.useFakeTimers()
    const mgr = new SessionManager(makeConfig())
    const s = mgr.createSession(1, 60_000)
    mgr.activateSession(s.authenticationToken, makeAnonToken(), 1)

    const before = s.lastActivityAt

    vi.advanceTimersByTime(1_000)
    mgr.touchSession(s.authenticationToken)

    expect(s.lastActivityAt.getTime()).toBeGreaterThan(before.getTime())
  })

  it('session is removed after timeout expires', () => {
    vi.useFakeTimers()
    const cfg = makeConfig({ minSessionTimeoutMs: 500, maxSessionTimeoutMs: 500 })
    const mgr = new SessionManager(cfg)
    const s = mgr.createSession(1, 500)

    vi.advanceTimersByTime(600)

    expect(() => mgr.validateSession(s.authenticationToken)).toThrow(SessionError)
  })
})
