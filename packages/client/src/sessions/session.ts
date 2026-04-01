import { EndpointDescription, IssuedIdentityToken, NodeId, UserTokenTypeEnum } from "opcjs-base";
import { IssuerConfiguration } from "../configuration/issuerConfiguration";
import { SessionService } from "../services/sessionService";
import { UserIdentity } from "../userIdentity";

export class Session {
    async activateSession(identity: UserIdentity): Promise<void> {
        const token = identity.getUserIdentityToken();
        const tokenType = identity.getTokenType();
        const tokenPolicy = this.endpoint.userIdentityTokens?.find(t => t.tokenType === tokenType);
        if (!tokenPolicy) {
            throw new Error(`UserIdentityToken of type ${tokenType} not supported by server`);
        }
        token.policyId = tokenPolicy.policyId;

        if (tokenType === UserTokenTypeEnum.IssuedToken) {
            if (!tokenPolicy.issuerEndpointUrl) {
                throw new Error("IssuerEndpointUrl not defined for IssuedToken");
            }
            const issuerEndpointUrl = JSON.parse(tokenPolicy.issuerEndpointUrl)
            const issuerConfig = IssuerConfiguration.newFrom(issuerEndpointUrl);

            const issuerLoginCallback = identity.getIssuerLoginCallback();
            const tokenData = await issuerLoginCallback(issuerConfig);

            const issuerToken = token as IssuedIdentityToken;
            issuerToken.tokenData = new TextEncoder().encode(tokenData.json);
        }

        await this.sessionServices.activateSession(token);
    }

    getAuthToken(): NodeId {
        return this.authToken;
    }

    getSessionId(): number {
        return this.sessionId;
    }

    getEndpoint(): EndpointDescription {
        return this.endpoint;
    }

    /**
     * Switches the active user identity for this session by calling ActivateSession with
     * a new identity token (OPC UA Part 4, Section 5.7.3 — Session Client Impersonate
     * conformance unit).
     *
     * The server re-evaluates authorisation for the session under the new identity.
     * All existing Subscriptions and MonitoredItems are preserved; only the security
     * context changes.
     *
     * @param identity - The new user identity to apply to the session.
     * @throws When the server returns a non-Good ServiceResult (e.g. `BadIdentityTokenRejected`
     *   or `BadUserAccessDenied`).
     */
    async impersonate(identity: UserIdentity): Promise<void> {
        await this.activateSession(identity)
    }

    /**
     * Closes the session on the server (OPC UA Part 4, Section 5.7.4).
     * @param deleteSubscriptions - When true the server deletes all Subscriptions
     *   tied to this Session. Defaults to true.
     */
    async close(deleteSubscriptions = true): Promise<void> {
        await this.sessionServices.closeSession(deleteSubscriptions)
    }

    constructor(
        public sessionId: number,
        private authToken: NodeId,
        private endpoint: EndpointDescription,
        private sessionServices: SessionService) { }
}