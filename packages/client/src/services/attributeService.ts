import {
    getLogger, ISecureChannel, NodeId, QualifiedName, ReadRequest, ReadResponse, ReadValueId,
    StatusCode, StatusCodeToString, StatusCodeToStringNumber, TimestampsToReturnEnum,
} from "opcjs-base";
import { AttrIdValue } from "./attributeServiceAttributes";
import { ServiceBase } from "./serviceBase";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.10.2
export class AttributeService extends ServiceBase {
    private logger = getLogger("services.AttributeService");

    /**
     * Reads the Value attribute of one or more Nodes (OPC UA Part 4, Section 5.10.2).
     * @param nodeIds - NodeIds of the Nodes to read.
     * @param maxAge - Maximum age of the cached value in milliseconds the server may return. 0 = always current value.
     * @param timestampsToReturn - Which timestamps to include in results. Default: Source.
     * @returns Array of results containing value and raw status code number, one per requested NodeId.
     */
    async ReadValue(
        nodeIds: NodeId[],
        maxAge: number = 0,
        timestampsToReturn: TimestampsToReturnEnum = TimestampsToReturnEnum.Source,
    ): Promise<{ statusCode: number, value: unknown }[]> {
        const readValueIds = nodeIds.map(ni => {
            const readValueId = new ReadValueId();
            readValueId.nodeId = ni;
            readValueId.attributeId = AttrIdValue;
            readValueId.indexRange = '';
            readValueId.dataEncoding = new QualifiedName(0, ''); // empty per OPC UA Part 4 §7.28 — no longer used
            return readValueId;
        });

        const request = new ReadRequest();
        request.requestHeader = this.createRequestHeader();
        request.maxAge = maxAge;
        request.timestampsToReturn = timestampsToReturn;
        request.nodesToRead = readValueIds;

        this.logger.debug("Sending ReadRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as ReadResponse;

        const serviceResult = response.responseHeader?.serviceResult;
        if (serviceResult !== undefined && serviceResult !== StatusCode.Good) {
            throw new Error(`ReadRequest failed: ${StatusCodeToString(serviceResult)} (${StatusCodeToStringNumber(serviceResult)})`);
        }

        const results = new Array<{ statusCode: number, value: unknown }>();
        for (const dataValue of response.results ?? []) {
            results.push({
                statusCode: dataValue.statusCode ?? StatusCode.Good,
                value: dataValue.value as unknown,
            });
        }
        return results;
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}