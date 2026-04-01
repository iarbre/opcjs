import {
  BrowseDescription, BrowseNextRequest, BrowseNextResponse,
  BrowseRequest, BrowseResponse, BrowseResult,
  getLogger, ISecureChannel, NodeId, UaByteString, ViewDescription,
} from 'opcjs-base'

import { ServiceBase } from './serviceBase.js'

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.9
export class BrowseService extends ServiceBase {
  private logger = getLogger("services.BrowseService");

  /**
   * Browses one or more Nodes and returns their References (OPC UA Part 4, Section 5.9.2).
   * @param nodesToBrowse - Array of BrowseDescriptions specifying nodes and filter criteria.
   * @param returnDiagnostics - Bitmask of diagnostic fields to request (OPC UA Part 4, §7.15). Default: 0.
   * @returns Array of BrowseResult, one per requested node.
   */
  async browse(nodesToBrowse: BrowseDescription[], returnDiagnostics = 0, requestHandle?: number): Promise<BrowseResult[]> {
    const view = new ViewDescription();
    view.viewId = NodeId.newNumeric(0, 0);
    view.timestamp = new Date(-11644473600000); // OPC UA MinDateTime (ticks=0)
    view.viewVersion = 0;

    const request = new BrowseRequest();
    request.requestHeader = this.createRequestHeader(returnDiagnostics, requestHandle);
    request.view = view;
    request.requestedMaxReferencesPerNode = 0;
    request.nodesToBrowse = nodesToBrowse;

    this.logger.debug("Sending BrowseRequest...");
    const response = await this.secureChannel
      .issueServiceRequest(request) as BrowseResponse;

    this.checkServiceResult(response.responseHeader?.serviceResult, 'BrowseRequest')

    return response.results ?? []
  }

  /**
   * Continues a Browse operation using continuation points (OPC UA Part 4, Section 5.9.3).
   * @param continuationPoints - Continuation points returned by a prior Browse or BrowseNext call.
   * @param releaseContinuationPoints - If true, releases the continuation points without returning results.
   * @param returnDiagnostics - Bitmask of diagnostic fields to request (OPC UA Part 4, §7.15). Default: 0.
   * @returns Array of BrowseResult, one per continuation point.
   */
  async browseNext(
    continuationPoints: UaByteString[],
    releaseContinuationPoints: boolean,
    returnDiagnostics = 0,
  ): Promise<BrowseResult[]> {
    const request = new BrowseNextRequest();
    request.requestHeader = this.createRequestHeader(returnDiagnostics);
    request.releaseContinuationPoints = releaseContinuationPoints;
    request.continuationPoints = continuationPoints;

    this.logger.debug("Sending BrowseNextRequest...");
    const response = await this.secureChannel
      .issueServiceRequest(request) as BrowseNextResponse;

    this.checkServiceResult(response.responseHeader?.serviceResult, 'BrowseNextRequest')

    return response.results ?? []
  }

  constructor(authToken: NodeId, secureChannel: ISecureChannel) {
    super(authToken, secureChannel);
  }
}
