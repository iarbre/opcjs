import {
  ApplicationDescription,
  ApplicationTypeEnum,
  EndpointDescription,
  FindServersRequest,
  FindServersResponse,
  GetEndpointsRequest,
  GetEndpointsResponse,
  LocalizedText,
  MessageSecurityModeEnum,
  UserTokenPolicy,
  UserTokenTypeEnum,
  getLogger,
} from 'opcjs-base'
import type { ILogger } from 'opcjs-base'

import type { ConfigurationServer } from '../configuration/configurationServer.js'
import { SECURITY_POLICY_NONE, TRANSPORT_PROFILE_WS } from './constants.js'
import { makeResponseHeader } from './responseHeader.js'

/**
 * Handles discovery services (`GetEndpoints`, `FindServers`).
 *
 * These are session-less services that describe this server to connecting
 * clients.  Both return a single endpoint with SecurityPolicy None and
 * anonymous authentication.
 *
 * @see OPC UA Part 4 §5.4 Discovery Services
 */
export class DiscoveryService {
  private readonly logger: ILogger

  constructor(
    private readonly config: ConfigurationServer,
    private endpointUrl: string,
  ) {
    this.logger = getLogger('services.DiscoveryService')
  }

  /** Updates the endpoint URL after the listener has bound to an OS-assigned port. */
  updateEndpointUrl(url: string): void {
    this.endpointUrl = url
  }

  /**
   * Returns the single endpoint this server exposes.
   *
   * `profileUris` and `localeIds` filter fields are ignored — there is only
   * one endpoint and no locale-specific variations.
   *
   * @see OPC UA Part 4 §5.4.4
   */
  getEndpoints(request: GetEndpointsRequest): GetEndpointsResponse {
    const requestHandle = request.requestHeader?.requestHandle ?? 0

    this.logger.debug('GetEndpoints request received')

    const response = new GetEndpointsResponse()
    response.responseHeader = makeResponseHeader(requestHandle)
    response.endpoints = [this.makeEndpointDescription()]
    return response
  }

  /**
   * Returns a self-description of this server.
   *
   * `serverUris` filter is ignored.
   *
   * @see OPC UA Part 4 §5.4.2
   */
  findServers(request: FindServersRequest): FindServersResponse {
    const requestHandle = request.requestHeader?.requestHandle ?? 0

    this.logger.debug('FindServers request received')

    const response = new FindServersResponse()
    response.responseHeader = makeResponseHeader(requestHandle)
    response.servers = [this.makeApplicationDescription()]
    return response
  }

  // ── private helpers ─────────────────────────────────────────────────────

  private makeApplicationDescription(): ApplicationDescription {
    const desc = new ApplicationDescription()
    desc.applicationUri = this.config.applicationUri
    desc.productUri = this.config.applicationUri
    desc.applicationName = new LocalizedText('en', this.config.productName)
    desc.applicationType = ApplicationTypeEnum.Server
    desc.gatewayServerUri = null
    desc.discoveryProfileUri = null
    desc.discoveryUrls = [this.endpointUrl]
    return desc
  }

  private makeEndpointDescription(): EndpointDescription {
    const anonPolicy = new UserTokenPolicy()
    anonPolicy.policyId = 'anonymous'
    anonPolicy.tokenType = UserTokenTypeEnum.Anonymous
    anonPolicy.issuedTokenType = null
    anonPolicy.issuerEndpointUrl = null
    anonPolicy.securityPolicyUri = null

    const ep = new EndpointDescription()
    ep.endpointUrl = this.endpointUrl
    ep.server = this.makeApplicationDescription()
    ep.serverCertificate = null
    ep.securityMode = MessageSecurityModeEnum.None
    ep.securityPolicyUri = SECURITY_POLICY_NONE
    ep.userIdentityTokens = [anonPolicy]
    ep.transportProfileUri = TRANSPORT_PROFILE_WS
    ep.securityLevel = 0
    return ep
  }
}
