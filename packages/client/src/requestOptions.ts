/**
 * Bitmask constants for the `returnDiagnostics` field in the OPC UA RequestHeader
 * (OPC UA Part 4, §7.15 — DiagnosticsMask).
 *
 * Combine values with bitwise OR to request multiple diagnostic fields.
 *
 * @example
 * ```ts
 * import { ReturnDiagnosticsMask, RequestOptions } from 'opcjs-client'
 *
 * const options: RequestOptions = {
 *   returnDiagnostics: ReturnDiagnosticsMask.ServiceLevel | ReturnDiagnosticsMask.OperationLevel,
 * }
 * ```
 */
export const ReturnDiagnosticsMask = {
  /** All service-level diagnostic fields. */
  ServiceLevel: 0x001f,
  /** All operation-level diagnostic fields. */
  OperationLevel: 0x03e0,
  /** All diagnostic fields (service level + operation level). */
  All: 0x03ff,
  /** Service-level: index to SymbolicId in the server string table. */
  ServiceSymbolicId: 0x0001,
  /** Service-level: index to LocalizedText in the server string table. */
  ServiceLocalizedText: 0x0002,
  /** Service-level: additional info string. */
  ServiceAdditionalInfo: 0x0004,
  /** Service-level: inner status code. */
  ServiceInnerStatusCode: 0x0008,
  /** Service-level: inner diagnostic info. */
  ServiceInnerDiagnostics: 0x0010,
  /** Operation-level: index to SymbolicId in the server string table. */
  OperationSymbolicId: 0x0020,
  /** Operation-level: index to LocalizedText in the server string table. */
  OperationLocalizedText: 0x0040,
  /** Operation-level: additional info string. */
  OperationAdditionalInfo: 0x0080,
  /** Operation-level: inner status code. */
  OperationInnerStatusCode: 0x0100,
  /** Operation-level: inner diagnostic info. */
  OperationInnerDiagnostics: 0x0200,
} as const

/**
 * Options accepted by all `Client` service calls.
 *
 * Each field is optional; omitting it keeps the existing default behaviour.
 */
export type RequestOptions = {
  /**
   * Bitmask specifying which diagnostic fields the server should populate in
   * the `diagnosticInfo` fields of the response (OPC UA Part 4, §7.15).
   *
   * Use {@link ReturnDiagnosticsMask} constants to compose the value:
   * ```ts
   * returnDiagnostics: ReturnDiagnosticsMask.All
   * ```
   *
   * Default: `0` — no diagnostics returned.
   */
  returnDiagnostics?: number
}
