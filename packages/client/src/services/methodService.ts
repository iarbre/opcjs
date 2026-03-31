import { CallMethodRequest, CallRequest, CallResponse, DiagnosticInfo, getLogger, ISecureChannel, NodeId, StatusCode } from 'opcjs-base'

import { ServiceBase } from './serviceBase.js'

// https://reference.opcfoundation.org/Core/Part4/v105/docs/5.11.2
export class MethodService extends ServiceBase {
    private logger = getLogger("services.MethodService");

    /**
     * Calls one or more methods on the server (OPC UA Part 4, Section 5.11.2).
     * @param methodsToCall - Array of CallMethodRequest describing each method to invoke.
     * @param returnDiagnostics - Bitmask of diagnostic fields to request (OPC UA Part 4, §7.15). Default: 0.
     * @returns Array of results containing output argument values, raw status code, and optional diagnostic info,
     *   one per requested method.
     */
    async call(
        methodsToCall: CallMethodRequest[],
        returnDiagnostics = 0,
    ): Promise<{ statusCode: number, value: unknown[], diagnosticInfo?: DiagnosticInfo }[]> {
        const request = new CallRequest();
        request.requestHeader = this.createRequestHeader(returnDiagnostics);
        request.methodsToCall = methodsToCall;

        this.logger.debug("Sending CallRequest...");
        const response = await this.secureChannel.issueServiceRequest(request) as CallResponse;

        this.checkServiceResult(response.responseHeader?.serviceResult, 'CallRequest')

        const diagInfos = response.diagnosticInfos ?? []
        return response.results.map((result, i) => ({
            statusCode: result.statusCode ?? StatusCode.Good,
            value: result.outputArguments.map(arg => arg.value),
            diagnosticInfo: diagInfos[i],
        }));
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel) {
        super(authToken, secureChannel);
    }
}
