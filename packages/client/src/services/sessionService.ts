import {
    ActivateSessionRequest, ApplicationDescription, ApplicationTypeEnum,
    Configuration, CreateSessionRequest, CreateSessionResponse, EndpointDescription, ExtensionObject,
    getLogger,
    ISecureChannel, LocalizedText, NodeId, SignatureData, SignedSoftwareCertificate, UserIdentityToken
} from "opcjs-base";
import { ServiceBase } from "./serviceBase";

export class SessionService extends ServiceBase {
    private logger = getLogger("services.SessionService");
    async createSession(): Promise<{ sessionId: number, authToken: NodeId, endpoint: EndpointDescription }> {
        this.logger.debug("Creating session...");

        const clientDescription = new ApplicationDescription();
        clientDescription.applicationUri = this.configuration.applicationUri;
        clientDescription.productUri = this.configuration.productUri;
        clientDescription.applicationName = new LocalizedText(undefined, this.configuration.productName);
        clientDescription.applicationType = ApplicationTypeEnum.Client;
        clientDescription.gatewayServerUri = '';
        clientDescription.discoveryProfileUri = '';
        clientDescription.discoveryUrls = new Array<string>();

        const request = new CreateSessionRequest();
        request.requestHeader = this.createRequestHeader();
        request.clientDescription = clientDescription;
        request.serverUri = '';
        request.endpointUrl = this.secureChannel.getEndpointUrl();
        request.sessionName = '';
        request.clientNonce = null;
        request.clientCertificate = null;
        request.requestedSessionTimeout = 60000;
        request.maxResponseMessageSize = 0;


        // todo: verify endpoints
        // todo: check application uri in server certificate

        this.logger.debug("Sending CreateSessionRequest...");
        const response = await this.secureChannel.issueServiceRequest(request);
        if (!response || !(response instanceof CreateSessionResponse)) {
            throw new Error("Invalid response type for CreateSessionRequest");
        }

        const castedResponse = response as CreateSessionResponse;
        if (!castedResponse || !castedResponse.sessionId || !castedResponse.authenticationToken) {
            throw new Error("CreateSessionResponse missing SessionId or AuthenticationToken");
        }

        const endpoint = 'opc.' + this.secureChannel.getEndpointUrl();
        const endpointUrl = new URL(endpoint);
        const securityMode = this.secureChannel.getSecurityMode();
        const securityPolicyUri = this.secureChannel.getSecurityPolicy(); // todo: does not work with localhost. Not sure why.

        const serverEndpoint = castedResponse
            ?.serverEndpoints
            ?.find(currentEndpoint => {
                const currentEndpointUrl = new URL(currentEndpoint.endpointUrl as string);

                return currentEndpointUrl.protocol === endpointUrl.protocol
                && currentEndpointUrl.pathname === endpointUrl.pathname
                && currentEndpointUrl.port === endpointUrl.port
                && currentEndpoint.securityMode === securityMode
                && currentEndpoint.securityPolicyUri === securityPolicyUri});

        if (!serverEndpoint) {
            throw new Error(`Server endpoint ${endpoint} not found in CreateSessionResponse`);
        }

        this.logger.debug("Session created with id:", castedResponse.sessionId.identifier);
        return {
            sessionId: castedResponse.sessionId.identifier as number,
            authToken: castedResponse.authenticationToken,
            endpoint: serverEndpoint
        };
    }

    async activateSession(identityToken: UserIdentityToken): Promise<void> {
        const signatureData = new SignatureData();
        signatureData.algorithm = this.secureChannel.getSecurityPolicy();
        signatureData.signature = new Uint8Array(0);

        const request = new ActivateSessionRequest();
        request.requestHeader = this.createRequestHeader();
        request.clientSignature = signatureData;
        request.clientSoftwareCertificates = new Array<SignedSoftwareCertificate>();
        request.localeIds = ['en-US'];
        request.userIdentityToken = ExtensionObject.newBinary(identityToken);
        request.userTokenSignature = signatureData;

        this.logger.debug("Sending ActivateSessionRequest...");
        await this.secureChannel.issueServiceRequest(request);
        this.logger.debug("Session activated.");
    }

    recreate(authToken: NodeId): SessionService {
        return new SessionService(authToken, this.secureChannel, this.configuration)
    }

    constructor(authToken: NodeId, secureChannel: ISecureChannel, private configuration: Configuration) {
        super(authToken, secureChannel)
    }
}