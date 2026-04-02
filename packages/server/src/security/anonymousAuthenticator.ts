import { AnonymousIdentityToken, StatusCode } from 'opcjs-base'
import type { ExtensionObject } from 'opcjs-base'

/**
 * Error thrown when the supplied identity token is not acceptable.
 *
 * Carries the OPC UA status code that should be returned to the client.
 */
export class AuthenticationError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = StatusCode.BadIdentityTokenInvalid,
  ) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

/**
 * Validates that the supplied `userIdentityToken` extension object contains
 * an {@link AnonymousIdentityToken}.
 *
 * Throws an {@link AuthenticationError} with
 * `StatusCode.BadIdentityTokenInvalid` if the token is absent or is not an
 * `AnonymousIdentityToken`.
 *
 * @see OPC UA Part 4 §5.6.3 ActivateSession
 */
export function validateAnonymousToken(token: ExtensionObject | null | undefined): void {
  if (token == null) {
    throw new AuthenticationError('No identity token supplied')
  }
  if (!(token.data instanceof AnonymousIdentityToken)) {
    throw new AuthenticationError(
      `Expected AnonymousIdentityToken, got ${token.data?.constructor.name ?? 'null'}`,
    )
  }
}
