import { ConfigurationClient } from "../configurationClient";
import { ISecureChannel, NodeId } from "opcjs-base";
import { SessionService } from "../services/sessionService";
import { UserIdentity } from "../userIdentity";
import { Session } from "./session";

export class SessionHandler {
    private sessionServices: SessionService;
    async createNewSession(identity:UserIdentity) : Promise<Session>{
        const ret = await this.sessionServices.createSession();
        this.sessionServices = this.sessionServices.recreate(ret.authToken)

        const session = new Session(ret.sessionId, ret.authToken, ret.endpoint, this.sessionServices);
        await session.activateSession(identity);
        return session;
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