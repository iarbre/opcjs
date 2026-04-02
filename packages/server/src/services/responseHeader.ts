import { DiagnosticInfo, ExtensionObject, ResponseHeader, StatusCode } from 'opcjs-base'

/**
 * Builds a minimal {@link ResponseHeader} that echoes `requestHandle`.
 *
 * Used by all service response constructors to avoid repeating the same
 * boilerplate for every response.
 *
 * @param requestHandle - value from the incoming `RequestHeader.requestHandle`
 * @param statusCode - response status; defaults to {@link StatusCode.Good}
 */
export function makeResponseHeader(
  requestHandle: number,
  statusCode: StatusCode = StatusCode.Good,
): ResponseHeader {
  const header = new ResponseHeader()
  header.timestamp = new Date()
  header.requestHandle = requestHandle
  header.serviceResult = statusCode
  header.serviceDiagnostics = new DiagnosticInfo()
  header.stringTable = []
  header.additionalHeader = ExtensionObject.newEmpty()
  return header
}
