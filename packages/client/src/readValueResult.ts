import type { DiagnosticInfo } from 'opcjs-base'

export class ReadValueResult {
    constructor(
        public value: unknown,
        public statusCode: number,
        /** Diagnostic info returned by the server when `returnDiagnostics` was set in the request options. */
        public diagnosticInfo?: DiagnosticInfo,
    ) {}
}