/**
 * @fileoverview Codec error class for OPC UA encoding/decoding errors
 * @module codec/errors
 */

/**
 * CodecError represents errors that occur during encoding or decoding operations.
 * @see FR-044 - Error must contain encoding ID, format, and suggested action
 */
export class CodecError extends Error {
  /**
   * The encoding ID involved in the error (if applicable).
   */
  public readonly encodingId?: string;
  
  /**
   * The encoding format where the error occurred (Binary, Xml, Json).
   */
  public readonly format?: string;
  
  /**
   * Suggested action to resolve the error.
   */
  public readonly suggestedAction?: string;
  
  /**
   * The type name involved in the error (if applicable).
   */
  public readonly typeName?: string;
  
  /**
   * Original error that caused this codec error (if any).
   */
  public readonly cause?: Error;

  constructor(message: string, options?: {
    encodingId?: string;
    format?: string;
    suggestedAction?: string;
    typeName?: string;
    cause?: Error;
  }) {
    super(message);
    this.name = 'CodecError';
    this.encodingId = options?.encodingId;
    this.format = options?.format;
    this.suggestedAction = options?.suggestedAction;
    this.typeName = options?.typeName;
    this.cause = options?.cause;
    
    // Maintains proper stack trace for where error was thrown (V8 engines)
    (Error as { captureStackTrace?: (target: object, constructor: unknown) => void }).captureStackTrace?.(this, CodecError);
  }

  /**
   * Returns a detailed error message including all context.
   */
  override toString(): string {
    let result = `${this.name}: ${this.message}`;
    
    if (this.encodingId) {
      result += `\n  Encoding ID: ${this.encodingId}`;
    }
    
    if (this.format) {
      result += `\n  Format: ${this.format}`;
    }
    
    if (this.typeName) {
      result += `\n  Type: ${this.typeName}`;
    }
    
    if (this.suggestedAction) {
      result += `\n  Suggested Action: ${this.suggestedAction}`;
    }
    
    return result;
  }
}
