import { ExtensionObject, ISecureChannel, NodeId, RequestHeader, StatusCode, StatusCodeToString, StatusCodeToStringNumber } from 'opcjs-base'

import { SessionInvalidError } from '../sessions/sessionInvalidError.js'

export abstract class ServiceBase {

    /**
     * Validates the `serviceResult` value from a response header.
     *
     * Throws `SessionInvalidError` for session-related status codes so callers
     * can detect a dropped session and act accordingly (e.g. reconnect).
     * Throws a generic `Error` for all other non-Good codes.
     *
     * @param result  - The `serviceResult` value from the response header.
     * @param context - Short description used in the error message (e.g. "ReadRequest").
     */
    protected checkServiceResult(result: number | undefined, context: string): void {
        if (result === undefined || result === StatusCode.Good) return

        if (result === StatusCode.BadSessionIdInvalid || result === StatusCode.BadSessionClosed) {
            throw new SessionInvalidError(result)
        }

        throw new Error(`${context} failed: ${StatusCodeToString(result)} (${StatusCodeToStringNumber(result)})`)
    }

    /**
     * Builds a RequestHeader for an outgoing service request.
     *
     * @param returnDiagnostics - Bitmask of diagnostic fields to request from the
     *   server (OPC UA Part 4, §7.15). Use {@link ReturnDiagnosticsMask} constants
     *   to compose the value. Default `0` = no diagnostics.
     */
    protected createRequestHeader(returnDiagnostics = 0): RequestHeader {
        const requestHeader = new RequestHeader();
        requestHeader.authenticationToken = this.authToken;
        requestHeader.timestamp = new Date();
        requestHeader.requestHandle = 0; // will be set by secure channel
        requestHeader.returnDiagnostics = returnDiagnostics;
        requestHeader.auditEntryId = '';
        requestHeader.timeoutHint = 60000;
        requestHeader.additionalHeader = ExtensionObject.newEmpty();

        return requestHeader;
    }
    
    constructor(private authToken: NodeId, protected secureChannel: ISecureChannel){}
}