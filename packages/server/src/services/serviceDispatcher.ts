import {
  ActivateSessionRequest,
  CloseSessionRequest,
  CreateSessionRequest,
  DiagnosticInfo,
  ExtensionObject,
  FindServersRequest,
  GetEndpointsRequest,
  NodeId,
  ReadRequest,
  ResponseHeader,
  ServiceFault,
  StatusCode,
  getLogger,
} from 'opcjs-base'
import type { IOpcType, ILogger } from 'opcjs-base'

import { SessionError } from '../sessions/sessionManager.js'
import type { SessionManager } from '../sessions/sessionManager.js'
import type { AttributeService } from './attributeService.js'
import type { DiscoveryService } from './discoveryService.js'
import type { SessionService } from './sessionService.js'

/**
 * Routes decoded OPC UA service requests to the appropriate handler.
 *
 * Enforces the Session General Service Behaviour (OPC UA Part 4 §5.6.1):
 * - `GetEndpoints`, `FindServers` and `CreateSession` require no session.
 * - `ActivateSession` requires the session to *exist* but not yet be active.
 * - All other services validate a fully activated session before dispatching.
 *
 * On session errors a `ServiceFault` is returned in-band so the transport
 * always receives a valid encodable response.
 *
 * @see OPC UA Part 4 §5.2 & §5.6.1
 */
export class ServiceDispatcher {
  private readonly logger: ILogger

  constructor(
    private readonly sessionManager: SessionManager,
    private readonly sessionSvc: SessionService,
    private readonly attributeSvc: AttributeService,
    private readonly discoverySvc: DiscoveryService,
  ) {
    this.logger = getLogger('services.ServiceDispatcher')
  }

  /**
   * Dispatches `request` to the correct service handler.
   *
   * @param request - Fully-decoded OPC UA request object
   * @param channelId - Secure-channel ID the request arrived on
   */
  async dispatch(request: IOpcType, channelId: number): Promise<IOpcType> {
    // Session-less discovery and session-creation paths.
    if (request instanceof GetEndpointsRequest) {
      return this.discoverySvc.getEndpoints(request)
    }
    if (request instanceof FindServersRequest) {
      return this.discoverySvc.findServers(request)
    }
    if (request instanceof CreateSessionRequest) {
      return this.sessionSvc.createSession(request, channelId)
    }
    // ActivateSession: session must exist but need not be activated yet.
    if (request instanceof ActivateSessionRequest) {
      return this.sessionSvc.activateSession(request, channelId)
    }

    // All remaining services require a valid, activated session.
    const authToken = extractAuthToken(request)
    if (authToken == null) {
      this.logger.warn(`${request.constructor.name}: missing authenticationToken`)
      return makeServiceFault(0, StatusCode.BadSessionIdInvalid)
    }

    try {
      this.sessionManager.validateSession(authToken)
    } catch (err) {
      if (err instanceof SessionError) {
        return makeServiceFault(extractRequestHandle(request), err.statusCode)
      }
      throw err
    }

    this.sessionManager.touchSession(authToken)

    if (request instanceof CloseSessionRequest) {
      return this.sessionSvc.closeSession(request)
    }
    if (request instanceof ReadRequest) {
      // Session is guaranteed valid after validateSession above.
      const session = this.sessionManager.validateSession(authToken)
      return this.attributeSvc.read(request, session)
    }

    this.logger.warn(`Unhandled request type: ${request.constructor.name}`)
    return makeServiceFault(extractRequestHandle(request), StatusCode.BadServiceUnsupported)
  }
}

// ── module-level helpers ───────────────────────────────────────────────────

type RequestLike = { requestHeader?: { authenticationToken?: NodeId; requestHandle?: number } }

function extractAuthToken(request: IOpcType): NodeId | undefined {
  return (request as RequestLike).requestHeader?.authenticationToken
}

function extractRequestHandle(request: IOpcType): number {
  return (request as RequestLike).requestHeader?.requestHandle ?? 0
}

function makeServiceFault(requestHandle: number, statusCode: StatusCode): ServiceFault {
  const header = new ResponseHeader()
  header.timestamp = new Date()
  header.requestHandle = requestHandle
  header.serviceResult = statusCode
  header.serviceDiagnostics = new DiagnosticInfo()
  header.stringTable = []
  header.additionalHeader = ExtensionObject.newEmpty()

  const fault = new ServiceFault()
  fault.responseHeader = header
  return fault
}
