import { CallMethodRequest, CallRequest, CallResponse, getLogger, ISecureChannel, NodeId, StatusCode, StatusCodeToString, StatusCodeToStringNumber } from "opcjs-base";
import { ServiceBase } from "./serviceBase";

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.11.2
export class MethodService extends ServiceBase {
    private logger = getLogger("services.MethodService");

    /**
     * Calls one or more methods on the server (OPC UA Part 4, Section 5.11.2).
     * @param methodsToCall - Array of CallMethodRequest describing each method to invoke.
     * @returns Array of results containing output argument values and raw status code number, one per requested method.
     */
    async call(methodsToCall: CallMethodRequest[]): Promise<{ statusCode: number, value: unknown[] }[]> {
        const request = new CallRequest();
        request.requestHeader = this.createRequestHeader();
        request.methodsToCall = methodsToCall;

        this.logger.debug("Sending CallRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as CallResponse;

        const serviceResult = response.responseHeader?.serviceResult;
        if (serviceResult !== undefined && serviceResult !== StatusCode.Good) {
            throw new Error(`CallRequest failed: ${StatusCodeToString(serviceResult)} (${StatusCodeToStringNumber(serviceResult)})`);
        }

        return response.results.map(result => ({
            statusCode: result.statusCode ?? StatusCode.Good,
            value: result.outputArguments.map(arg => arg.value),
        }));
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}
