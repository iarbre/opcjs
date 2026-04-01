import { ExtensionObject, ISecureChannel, NodeId, RequestHeader, StatusCode, StatusCodeToString, StatusCodeToStringNumber } from 'opcjs-base'

import { SessionInvalidError } from '../sessions/sessionInvalidError.js'

/**
 * Monotonically-increasing counter used to generate unique `requestHandle` values.
 *
 * OPC UA Part 4, Section 7.28: requestHandle is a client-assigned value that
 * identifies a request within a session. It must be unique for outstanding requests
 * so that `CancelRequest` can target a specific pending operation.
 *
 * The counter is module-level so it stays unique even when multiple `ServiceBase`
 * instances (AttributeService, BrowseService, …) share the same session.
 */
let requestHandleCounter = 0

/** Returns the next unique requestHandle value, wrapping safely at 2^31 - 1. */
export function nextRequestHandle(): number {
  // OPC UA requestHandle is a UInt32, but we cap at Int32 max to avoid sign issues
  // in servers that treat it as signed.  Wrapping back to 1 (not 0) reserves 0 as
  // a sentinel "no handle / unknown" value.
  if (requestHandleCounter >= 0x7fffffff) {
    requestHandleCounter = 1
  } else {
    requestHandleCounter++
  }
  return requestHandleCounter
}

/**
 * Returns the most recently assigned `requestHandle` value.
 *
 * Useful for capturing the handle of an in-flight request immediately after
 * the service call was issued — e.g. to pass to `Client.cancel()`.
 *
 * Returns `0` before any request has been sent.
 */
export function lastAssignedHandle(): number {
  return requestHandleCounter
}

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
    protected createRequestHeader(returnDiagnostics = 0, preAllocatedHandle?: number): RequestHeader {
        const requestHeader = new RequestHeader();
        requestHeader.authenticationToken = this.authToken;
        requestHeader.timestamp = new Date();
        requestHeader.requestHandle = preAllocatedHandle ?? nextRequestHandle();
        requestHeader.returnDiagnostics = returnDiagnostics;
        requestHeader.auditEntryId = '';
        requestHeader.timeoutHint = 60000;
        requestHeader.additionalHeader = ExtensionObject.newEmpty();

        return requestHeader;
    }
    
    constructor(private authToken: NodeId, protected secureChannel: ISecureChannel){}
}