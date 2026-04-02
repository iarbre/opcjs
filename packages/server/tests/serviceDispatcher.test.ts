import { describe, it, expect, vi } from 'vitest'

import {
  ActivateSessionRequest,
  ActivateSessionResponse,
  AnonymousIdentityToken,
  CloseSessionRequest,
  CreateSessionRequest,
  CreateSessionResponse,
  DataValue,
  ExtensionObject,
  FindServersRequest,
  FindServersResponse,
  GetEndpointsRequest,
  GetEndpointsResponse,
  NodeId,
  QualifiedName,
  ReadRequest,
  ReadResponse,
  ReadValueId,
  RequestHeader,
  ServiceFault,
  SignatureData,
  StatusCode,
} from 'opcjs-base'

import { StubAddressSpace } from '../src/addressSpace/stubAddressSpace.js'
import { ConfigurationServer } from '../src/configuration/configurationServer.js'
import { AttributeService } from '../src/services/attributeService.js'
import { DiscoveryService } from '../src/services/discoveryService.js'
import { ServiceDispatcher } from '../src/services/serviceDispatcher.js'
import { SessionService } from '../src/services/sessionService.js'
import { SessionManager } from '../src/sessions/sessionManager.js'

// ── helpers ──────────────────────────────────────────────────────────────────

const ENDPOINT_URL = 'opc.wss://localhost:4840/opcua'

function makeStack() {
  const cfg = ConfigurationServer.getSimple('TestServer', 'test')
  const sessionManager = new SessionManager(cfg)
  const sessionSvc = new SessionService(sessionManager, cfg, ENDPOINT_URL)
  const attributeSvc = new AttributeService(new StubAddressSpace())
  const discoverySvc = new DiscoveryService(cfg, ENDPOINT_URL)
  const dispatcher = new ServiceDispatcher(sessionManager, sessionSvc, attributeSvc, discoverySvc)
  return { cfg, sessionManager, sessionSvc, attributeSvc, discoverySvc, dispatcher }
}

function makeRequestHeader(authToken?: NodeId, requestHandle = 0): RequestHeader {
  const h = new RequestHeader()
  h.authenticationToken = authToken ?? new NodeId()
  h.requestHandle = requestHandle
  h.timestamp = new Date()
  h.timeoutHint = 0
  h.returnDiagnostics = 0
  h.auditEntryId = null
  h.additionalHeader = ExtensionObject.newEmpty()
  return h
}

function makeAnonToken(): ExtensionObject {
  return new ExtensionObject(new NodeId(0, 319), undefined, new AnonymousIdentityToken())
}

// ── DiscoveryService ──────────────────────────────────────────────────────────

describe('DiscoveryService', () => {
  it('getEndpoints returns a single SecurityPolicy None endpoint', async () => {
    const { dispatcher } = makeStack()
    const req = new GetEndpointsRequest()
    req.requestHeader = makeRequestHeader()
    req.endpointUrl = ENDPOINT_URL
    req.localeIds = []
    req.profileUris = []

    const res = await dispatcher.dispatch(req, 1)

    expect(res).toBeInstanceOf(GetEndpointsResponse)
    const epRes = res as GetEndpointsResponse
    expect(epRes.endpoints).toHaveLength(1)
    expect(epRes.endpoints[0].securityPolicyUri).toContain('None')
    expect(epRes.responseHeader.serviceResult).toBe(StatusCode.Good)
  })

  it('findServers returns self-description', async () => {
    const { dispatcher } = makeStack()
    const req = new FindServersRequest()
    req.requestHeader = makeRequestHeader()
    req.endpointUrl = ENDPOINT_URL
    req.localeIds = []
    req.serverUris = []

    const res = await dispatcher.dispatch(req, 1)

    expect(res).toBeInstanceOf(FindServersResponse)
    const fsRes = res as FindServersResponse
    expect(fsRes.servers).toHaveLength(1)
    expect(fsRes.servers[0].applicationUri).toMatch(/TestServer/)
  })
})

// ── SessionService via dispatcher ────────────────────────────────────────────

describe('SessionService (via dispatcher)', () => {
  it('CreateSession returns sessionId and authenticationToken', async () => {
    const { dispatcher } = makeStack()
    const req = new CreateSessionRequest()
    req.requestHeader = makeRequestHeader()
    req.sessionName = 'test-session'
    req.requestedSessionTimeout = 60_000
    req.maxResponseMessageSize = 0
    req.clientNonce = new Uint8Array(32)

    const res = await dispatcher.dispatch(req, 1)

    expect(res).toBeInstanceOf(CreateSessionResponse)
    const csRes = res as CreateSessionResponse
    expect(csRes.responseHeader.serviceResult).toBe(StatusCode.Good)
    expect(csRes.sessionId).toBeInstanceOf(NodeId)
    expect(csRes.authenticationToken).toBeInstanceOf(NodeId)
    expect(csRes.serverNonce).toHaveLength(32)
    expect(csRes.serverEndpoints).toHaveLength(1)
    expect(csRes.responseHeader.requestHandle).toBe(0)
  })

  it('CreateSession echoes requestHandle', async () => {
    const { dispatcher } = makeStack()
    const req = new CreateSessionRequest()
    req.requestHeader = makeRequestHeader(undefined, 42)
    req.sessionName = 'test'
    req.requestedSessionTimeout = 60_000
    req.maxResponseMessageSize = 0
    req.clientNonce = new Uint8Array(32)

    const res = (await dispatcher.dispatch(req, 1)) as CreateSessionResponse
    expect(res.responseHeader.requestHandle).toBe(42)
  })

  it('ActivateSession succeeds with anonymous token', async () => {
    const { dispatcher } = makeStack()

    const csReq = new CreateSessionRequest()
    csReq.requestHeader = makeRequestHeader()
    csReq.sessionName = 'test'
    csReq.requestedSessionTimeout = 60_000
    csReq.maxResponseMessageSize = 0
    csReq.clientNonce = new Uint8Array(32)

    const csRes = (await dispatcher.dispatch(csReq, 1)) as CreateSessionResponse
    const authToken = csRes.authenticationToken

    const asReq = new ActivateSessionRequest()
    asReq.requestHeader = makeRequestHeader(authToken)
    asReq.userIdentityToken = makeAnonToken()
    asReq.clientSignature = new SignatureData()
    asReq.clientSoftwareCertificates = []
    asReq.localeIds = []
    asReq.userTokenSignature = new SignatureData()

    const asRes = await dispatcher.dispatch(asReq, 1)
    expect(asRes.constructor.name).toBe('ActivateSessionResponse')
    expect((asRes as unknown as ActivateSessionResponse).responseHeader.serviceResult)
      .toBe(StatusCode.Good)
  })

  it('CloseSession is dispatched correctly after activation', async () => {
    const { dispatcher } = makeStack()

    const csReq = new CreateSessionRequest()
    csReq.requestHeader = makeRequestHeader()
    csReq.sessionName = 'test'
    csReq.requestedSessionTimeout = 60_000
    csReq.maxResponseMessageSize = 0
    csReq.clientNonce = new Uint8Array(32)
    const csRes = (await dispatcher.dispatch(csReq, 1)) as CreateSessionResponse
    const authToken = csRes.authenticationToken

    const asReq = new ActivateSessionRequest()
    asReq.requestHeader = makeRequestHeader(authToken)
    asReq.userIdentityToken = makeAnonToken()
    asReq.clientSignature = new SignatureData()
    asReq.clientSoftwareCertificates = []
    asReq.localeIds = []
    asReq.userTokenSignature = new SignatureData()
    await dispatcher.dispatch(asReq, 1)

    const clReq = new CloseSessionRequest()
    clReq.requestHeader = makeRequestHeader(authToken)
    clReq.deleteSubscriptions = false
    const clRes = await dispatcher.dispatch(clReq, 1)
    expect(clRes.constructor.name).toBe('CloseSessionResponse')

    // Session is now gone; Read should get BadSessionIdInvalid.
    const rdReq = new ReadRequest()
    rdReq.requestHeader = makeRequestHeader(authToken)
    rdReq.maxAge = 0
    rdReq.timestampsToReturn = 0
    rdReq.nodesToRead = []
    const rdRes = await dispatcher.dispatch(rdReq, 1)
    expect(rdRes).toBeInstanceOf(ServiceFault)
  })
})

// ── ServiceDispatcher — session checks ──────────────────────────────────────

describe('ServiceDispatcher session validation', () => {
  it('Read with unknown authToken returns ServiceFault BadSessionIdInvalid', async () => {
    const { dispatcher } = makeStack()
    const req = new ReadRequest()
    req.requestHeader = makeRequestHeader(new NodeId(0, 9999))
    req.maxAge = 0
    req.timestampsToReturn = 0
    req.nodesToRead = []

    const res = await dispatcher.dispatch(req, 1)

    expect(res).toBeInstanceOf(ServiceFault)
    expect((res as ServiceFault).responseHeader.serviceResult).toBe(StatusCode.BadSessionIdInvalid)
  })

  it('Read with unactivated session returns ServiceFault BadSessionClosed', async () => {
    const { dispatcher } = makeStack()

    const csReq = new CreateSessionRequest()
    csReq.requestHeader = makeRequestHeader()
    csReq.sessionName = 'test'
    csReq.requestedSessionTimeout = 60_000
    csReq.maxResponseMessageSize = 0
    csReq.clientNonce = new Uint8Array(32)
    const csRes = (await dispatcher.dispatch(csReq, 1)) as CreateSessionResponse

    const rdReq = new ReadRequest()
    rdReq.requestHeader = makeRequestHeader(csRes.authenticationToken)
    rdReq.maxAge = 0
    rdReq.timestampsToReturn = 0
    rdReq.nodesToRead = []

    const res = await dispatcher.dispatch(rdReq, 1)
    expect(res).toBeInstanceOf(ServiceFault)
    expect((res as ServiceFault).responseHeader.serviceResult).toBe(StatusCode.BadSessionClosed)
  })

  it('missing requestHeader returns ServiceFault BadSessionIdInvalid', async () => {
    const { dispatcher } = makeStack()
    const req = new ReadRequest()
    // no requestHeader set (undefined)
    req.maxAge = 0
    req.timestampsToReturn = 0
    req.nodesToRead = []

    const res = await dispatcher.dispatch(req, 1)
    expect(res).toBeInstanceOf(ServiceFault)
    expect((res as ServiceFault).responseHeader.serviceResult).toBe(StatusCode.BadSessionIdInvalid)
  })

  it('unknown request type returns ServiceFault BadServiceUnsupported', async () => {
    const { dispatcher } = makeStack()

    // Create + activate a session so we pass the auth check.
    const csReq = new CreateSessionRequest()
    csReq.requestHeader = makeRequestHeader()
    csReq.sessionName = 'test'
    csReq.requestedSessionTimeout = 60_000
    csReq.maxResponseMessageSize = 0
    csReq.clientNonce = new Uint8Array(32)
    const csRes = (await dispatcher.dispatch(csReq, 1)) as CreateSessionResponse

    const asReq = new ActivateSessionRequest()
    asReq.requestHeader = makeRequestHeader(csRes.authenticationToken)
    asReq.userIdentityToken = makeAnonToken()
    asReq.clientSignature = new SignatureData()
    asReq.clientSoftwareCertificates = []
    asReq.localeIds = []
    asReq.userTokenSignature = new SignatureData()
    await dispatcher.dispatch(asReq, 1)

    // Inject a custom IOpcType with a requestHeader that has the valid authToken.
    const unknownRequest = {
      getTypeId: () => 9999,
      getBinaryEncodingId: () => 9999,
      getXmlEncodingId: () => 9999,
      getJsonEncodingId: () => 9999,
      requestHeader: {
        authenticationToken: csRes.authenticationToken,
        requestHandle: 7,
      },
    }

    const res = await dispatcher.dispatch(unknownRequest, 1)
    expect(res).toBeInstanceOf(ServiceFault)
    expect((res as ServiceFault).responseHeader.serviceResult).toBe(StatusCode.BadServiceUnsupported)
  })
})

// ── AttributeService ────────────────────────────────────────────────────────

describe('AttributeService', () => {
  it('returns BadNodeIdUnknown for stub address space', async () => {
    const { dispatcher } = makeStack()

    // full create+activate flow
    const csReq = new CreateSessionRequest()
    csReq.requestHeader = makeRequestHeader()
    csReq.sessionName = 'test'
    csReq.requestedSessionTimeout = 60_000
    csReq.maxResponseMessageSize = 0
    csReq.clientNonce = new Uint8Array(32)
    const csRes = (await dispatcher.dispatch(csReq, 1)) as CreateSessionResponse
    const authToken = csRes.authenticationToken

    const asReq = new ActivateSessionRequest()
    asReq.requestHeader = makeRequestHeader(authToken)
    asReq.userIdentityToken = makeAnonToken()
    asReq.clientSignature = new SignatureData()
    asReq.clientSoftwareCertificates = []
    asReq.localeIds = []
    asReq.userTokenSignature = new SignatureData()
    await dispatcher.dispatch(asReq, 1)

    const item = new ReadValueId()
    item.nodeId = new NodeId(0, 2253)
    item.attributeId = 13 // Value
    item.indexRange = null
    item.dataEncoding = new QualifiedName(0, "")

    const rdReq = new ReadRequest()
    rdReq.requestHeader = makeRequestHeader(authToken)
    rdReq.maxAge = 0
    rdReq.timestampsToReturn = 3 // Neither
    rdReq.nodesToRead = [item]

    const res = await dispatcher.dispatch(rdReq, 1)
    expect(res).toBeInstanceOf(ReadResponse)
    const rr = res as ReadResponse
    expect(rr.results).toHaveLength(1)
    expect(rr.results[0].statusCode).toBe(StatusCode.BadNodeIdUnknown)
  })

  it('AttributeService applies timestamps correctly (Neither = no timestamps)', () => {
    const addressSpace = new StubAddressSpace()
    vi.spyOn(addressSpace, 'read').mockReturnValue(
      new DataValue(undefined, StatusCode.Good, new Date(1000), new Date(2000)),
    )

    const svc = new AttributeService(addressSpace)
    const session = {
      sessionId: new NodeId(0, 1),
      authenticationToken: new NodeId(0, 2),
      serverNonce: new Uint8Array(32),
      revisedTimeoutMs: 60_000,
      boundChannelId: 1,
      isActivated: true,
      createdAt: new Date(),
      lastActivityAt: new Date(),
    }

    const item = new ReadValueId()
    item.nodeId = new NodeId(0, 1)
    item.attributeId = 13
    item.indexRange = null
    item.dataEncoding = new QualifiedName(0, "")

    const req = new ReadRequest()
    req.requestHeader = makeRequestHeader()
    req.maxAge = 0
    req.timestampsToReturn = 3 // Neither
    req.nodesToRead = [item]

    const res = svc.read(req, session)
    expect(res.results[0].sourceTimestamp).toBeUndefined()
    expect(res.results[0].serverTimestamp).toBeUndefined()
  })

  it('AttributeService Source mode returns the address-space sourceTimestamp as-is', () => {
    const sourceTs = new Date(1000)
    const addressSpace = new StubAddressSpace()
    vi.spyOn(addressSpace, 'read').mockReturnValue(
      new DataValue(undefined, StatusCode.Good, sourceTs),
    )

    const svc = new AttributeService(addressSpace)
    const session = {
      sessionId: new NodeId(0, 1),
      authenticationToken: new NodeId(0, 2),
      serverNonce: new Uint8Array(32),
      revisedTimeoutMs: 60_000,
      boundChannelId: 1,
      isActivated: true,
      createdAt: new Date(),
      lastActivityAt: new Date(),
    }

    const item = new ReadValueId()
    item.nodeId = new NodeId(0, 1)
    item.attributeId = 13
    item.indexRange = null
    item.dataEncoding = new QualifiedName(0, "")

    const req = new ReadRequest()
    req.requestHeader = makeRequestHeader()
    req.maxAge = 0
    req.timestampsToReturn = 0 // Source
    req.nodesToRead = [item]

    const res = svc.read(req, session)
    expect(res.results[0].sourceTimestamp).toBe(sourceTs)
    expect(res.results[0].serverTimestamp).toBeUndefined()
  })

  it('AttributeService Source mode returns undefined when address space provides no sourceTimestamp', () => {
    const addressSpace = new StubAddressSpace()
    // DataValue with no sourceTimestamp set
    vi.spyOn(addressSpace, 'read').mockReturnValue(new DataValue(undefined, StatusCode.Good))

    const svc = new AttributeService(addressSpace)
    const session = {
      sessionId: new NodeId(0, 1),
      authenticationToken: new NodeId(0, 2),
      serverNonce: new Uint8Array(32),
      revisedTimeoutMs: 60_000,
      boundChannelId: 1,
      isActivated: true,
      createdAt: new Date(),
      lastActivityAt: new Date(),
    }

    const item = new ReadValueId()
    item.nodeId = new NodeId(0, 1)
    item.attributeId = 13
    item.indexRange = null
    item.dataEncoding = new QualifiedName(0, "")

    const req = new ReadRequest()
    req.requestHeader = makeRequestHeader()
    req.maxAge = 0
    req.timestampsToReturn = 0 // Source
    req.nodesToRead = [item]

    const res = svc.read(req, session)
    // The server does NOT substitute its own timestamp — that is the address space's job.
    expect(res.results[0].sourceTimestamp).toBeUndefined()
  })
})
