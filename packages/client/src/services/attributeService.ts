import {
    DiagnosticInfo, getLogger, ISecureChannel, NodeId, QualifiedName, ReadRequest, ReadResponse,
    ReadValueId, StatusCode, TimestampsToReturnEnum,
} from 'opcjs-base'

import { AttrIdValue } from './attributeServiceAttributes.js'
import { ServiceBase } from './serviceBase.js'

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.10.2
export class AttributeService extends ServiceBase {
    private logger = getLogger("services.AttributeService");

    /**
     * Reads the Value attribute of one or more Nodes (OPC UA Part 4, Section 5.10.2).
     * @param nodeIds - NodeIds of the Nodes to read.
     * @param maxAge - Maximum age of the cached value in milliseconds the server may return. 0 = always current value.
     * @param timestampsToReturn - Which timestamps to include in results. Default: Source.
     * @param returnDiagnostics - Bitmask of diagnostic fields to request (OPC UA Part 4, §7.15). Default: 0.
     * @returns Array of results containing value, raw status code, and optional diagnostic info, one per requested NodeId.
     */
    async ReadValue(
        nodeIds: NodeId[],
        maxAge: number = 0,
        timestampsToReturn: TimestampsToReturnEnum = TimestampsToReturnEnum.Source,
        returnDiagnostics = 0,
    ): Promise<{ statusCode: number, value: unknown, diagnosticInfo?: DiagnosticInfo }[]> {
        const readValueIds = nodeIds.map(ni => {
            const readValueId = new ReadValueId();
            readValueId.nodeId = ni;
            readValueId.attributeId = AttrIdValue;
            readValueId.indexRange = '';
            readValueId.dataEncoding = new QualifiedName(0, ''); // empty per OPC UA Part 4 §7.28 — no longer used
            return readValueId;
        });

        const request = new ReadRequest();
        request.requestHeader = this.createRequestHeader(returnDiagnostics);
        request.maxAge = maxAge;
        request.timestampsToReturn = timestampsToReturn;
        request.nodesToRead = readValueIds;

        this.logger.debug("Sending ReadRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as ReadResponse;

        this.checkServiceResult(response.responseHeader?.serviceResult, 'ReadRequest')

        const results = new Array<{ statusCode: number, value: unknown, diagnosticInfo?: DiagnosticInfo }>();
        const diagInfos = response.diagnosticInfos ?? []
        for (let i = 0; i < (response.results ?? []).length; i++) {
            const dataValue = response.results[i]
            results.push({
                statusCode: dataValue.statusCode ?? StatusCode.Good,
                value: dataValue.value as unknown,
                diagnosticInfo: diagInfos[i],
            });
        }
        return results;
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}