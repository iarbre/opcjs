import { getLogger } from "../../utils/logger/loggerProvider";
import type { WebSocketLike } from "./webSocketLike";

export type WebSocketOptions = {
    endpoint: string;
    openTimeoutMs?: number;
    maxBufferedMessages?: number;
};

/**
 * Wraps the browser WHATWG {@link WebSocket} and implements {@link WebSocketLike}.
 *
 * Normalises the `MessageEvent` callback to a plain `(data: Uint8Array) => void`
 * handler so that {@link WebSocketReadableStream} works identically on client
 * and server (where the Node.js `ws` package delivers raw `Buffer` data).
 */
export class WebSocketFascade implements WebSocketLike {
    private logger = getLogger("transport.WebSocketFascade");
    private webSocket?: WebSocket;
    // Stored as the browser-native handler so it can be assigned to onmessage after connect().
    private onMessageHandler: ((event: MessageEvent) => void) | null = null;
    private onErrorHandler: ((event: Event) => void) | null = null;
    private onCloseHandler: ((event: Event) => void) | null = null;

    public async connect() {
        const {
            endpoint,
            openTimeoutMs = 10_000,
        } = this.options;

        const url = new URL(endpoint);
        const recomposedEndpoint = `wss://${url.host}${url.pathname}`;

        this.logger.debug(`Opening WebSocket connection to ${url} with timeout ${openTimeoutMs}ms...`);
        this.webSocket = new WebSocket(recomposedEndpoint, "opcua+uacp"); //todo: use url directly
        this.webSocket.binaryType = "arraybuffer";

        await new Promise<void>((resolve, reject) => {
            const t = setTimeout(() => {
                reject(new Error(`WebSocket open timeout after ${openTimeoutMs}ms`));
            }, openTimeoutMs);

            if (!this.webSocket) {
                clearTimeout(t);
                reject(new Error("WebSocket constructor failed"));
                return;
            }

            this.webSocket.onopen = () => {
                clearTimeout(t);
                this.logger.debug("WebSocket TCP connection opened.");
                resolve();
            };
            this.webSocket.onerror = () => {
                clearTimeout(t);
                this.logger.error("WebSocket error during connect");
                reject(new Error("WebSocket error during connect"));
            };
            this.webSocket.onclose = (e) => {
                clearTimeout(t);
                const message = `WebSocket closed during connect: ${this.describeCloseCode(e.code)}`;
                this.logger.error(message);
                reject(new Error(message));
            };
        });

        // Clear transient open-phase handlers; callers install their own
        this.webSocket.onopen = null;
        this.webSocket.onerror = this.onErrorHandler;;
        this.webSocket.onclose = this.onCloseHandler;
        this.webSocket.onmessage = this.onMessageHandler
    }

    public send(data: Uint8Array) {
        if (!this.webSocket || this.webSocket.readyState !== WebSocket.OPEN) {
            throw new Error(`WebSocket is not open (state=${this.webSocket?.readyState})`);
        }
        this.webSocket.send(data as Uint8Array<ArrayBuffer>);
        this.logger.trace(`WebSocket sent ${data.byteLength} bytes`);
    }

    public close() {
        if (this.webSocket) {
            this.webSocket.onopen = null;
            this.webSocket.onerror = null;
            this.webSocket.onclose = null;
            this.webSocket.onmessage = null;
            this.webSocket.close(1000, "Normal closure");
        }
    }

    public setOnMessage(handler: (data: Uint8Array) => void): void {
        // Wrap the browser MessageEvent to extract the binary payload.
        this.onMessageHandler = (event: MessageEvent) => {
            const raw: unknown = event.data;
            if (raw instanceof ArrayBuffer) {
                handler(new Uint8Array(raw));
            } else if (raw instanceof Uint8Array) {
                handler(raw);
            } else {
                this.logger.warn("Received non-binary WebSocket message, ignoring");
            }
        };
        if (this.webSocket) {
            this.webSocket.onmessage = this.onMessageHandler;
        }
    }

    public setOnClose(handler: () => void): void {
        this.onCloseHandler = () => handler();
        if (this.webSocket) {
            this.webSocket.onclose = this.onCloseHandler;
        }
    }

    public setOnError(handler: (err: unknown) => void): void {
        this.onErrorHandler = (event: Event) => handler(event);
        if (this.webSocket) {
            this.webSocket.onerror = this.onErrorHandler;
        }
    }

    private describeCloseCode(code: number): string {
        switch (code) {
            case 1000: return "Normal closure";
            case 1001: return "Going away";
            case 1006: return "Abnormal closure (no close frame)";
            case 1008: return "Policy violation";
            case 1009: return "Message too big";
            default: return `Unknown code: ${code}`;
        }
    }

    constructor(private options: WebSocketOptions) { }
}