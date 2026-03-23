import { ConfigurationClient } from "../configurationClient";
import { EndpointDescription, ISecureChannel, NodeId, getLogger } from "opcjs-base";
import { SessionService } from "../services/sessionService";
import { UserIdentity } from "../userIdentity";
import { Session } from "./session";

export class SessionHandler {
    private sessionServices: SessionService;
    private logger = getLogger("sessions.SessionHandler");

    async createNewSession(identity:UserIdentity) : Promise<Session>{
        const ret = await this.sessionServices.createSession();
        this.sessionServices = this.sessionServices.recreate(ret.authToken)

        const session = new Session(ret.sessionId, ret.authToken, ret.endpoint, this.sessionServices);
        await session.activateSession(identity);
        return session;
    }

    /**
     * Attempts to reactivate an existing OPC UA session on the current (new) SecureChannel
     * without calling CreateSession first (OPC UA Part 4, Section 5.7.3).
     *
     * This is the preferred recovery path when the SecureChannel drops but the server-side
     * session has not yet timed out: only a new channel is needed, not a new session.
     *
     * @returns The reactivated Session if ActivateSession succeeded, or `null` if the server
     *          rejected the request (e.g. the session had already expired).
     */
    async tryActivateExistingSession(
        existingAuthToken: NodeId,
        existingSessionId: number,
        existingEndpoint: EndpointDescription,
        identity: UserIdentity,
    ): Promise<Session | null> {
        // Build a SessionService bound to the existing auth token so the RequestHeader
        // carries it and the server can correlate the ActivateSession to the right session.
        const serviceForExistingSession = this.sessionServices.recreate(existingAuthToken)
        try {
            const session = new Session(existingSessionId, existingAuthToken, existingEndpoint, serviceForExistingSession)
            await session.activateSession(identity)
            return session
        } catch (err) {
            this.logger.debug('ActivateSession for existing session failed:', err)
            return null
        }
    }

    /**
     * Closes the active session on the server (OPC UA Part 4, Section 5.7.4).
     * @param deleteSubscriptions - Forwarded to CloseSessionRequest. Defaults to true.
     */
    async closeSession(deleteSubscriptions = true): Promise<void> {
        await this.sessionServices.closeSession(deleteSubscriptions)
    }

    constructor(secureChannel:ISecureChannel, configuration: ConfigurationClient) {
        this.sessionServices = new SessionService(NodeId.newTwoByte(0), secureChannel, configuration);
    }
}