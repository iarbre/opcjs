# opcjs-client

An OPC UA client library for TypeScript targeting the browser and Node.js, built on top of `opcjs-base`.

## Installation

```sh
npm install opcjs-client opcjs-base
```

## Quick Start

```ts
import { Client, ConfigurationClient, UserIdentity } from 'opcjs-client'
import { NodeId } from 'opcjs-base'

const config = ConfigurationClient.getSimple('MyApp', 'MyCompany')
const client = new Client('opc.tcp://localhost:4840', UserIdentity.newAnonymous(), config)

await client.connect()

// Read a node value
const results = await client.read([NodeId.newNumeric(0, 2258)]) // CurrentTime
console.log(results[0].value)

await client.disconnect()
```

## API

### `new Client(endpointUrl, identity, configuration)`

Creates a new client instance. Does not connect until `connect()` is called.

| Parameter | Type | Description |
|-----------|------|-------------|
| `endpointUrl` | `string` | OPC UA server endpoint (e.g. `opc.tcp://host:4840`) |
| `identity` | `UserIdentity` | Credentials used for `ActivateSession` |
| `configuration` | `ConfigurationClient` | Application description, encoder/decoder, and security settings |

### `client.connect(): Promise<void>`

Opens the WebSocket transport, establishes a TCP/SecureChannel, creates an OPC UA session, and starts the keep-alive timer.

Reconnects automatically on channel drops (Session Auto Reconnect, OPC UA Part 4 §5.7.1):
1. Attempts `ActivateSession` on the new channel to reuse the existing session.
2. Falls back to a full `CreateSession` + `ActivateSession` if reactivation fails.

### `client.disconnect(): Promise<void>`

Sends `CloseSession` (with `deleteSubscriptions=true`), closes the SecureChannel, and shuts down the WebSocket transport.

### `client.read(ids, options?): Promise<ReadValueResult[]>`

Reads the `Value` attribute of one or more nodes.

```ts
const [result] = await client.read([NodeId.newNumeric(0, 2258)])
// result.value          — the read value
// result.statusCode     — OPC UA StatusCode
// result.diagnosticInfo — populated when returnDiagnostics > 0
```

### `client.browse(nodeId, recursive?, options?): Promise<BrowseNodeResult[]>`

Browses the `HierarchicalReferences` of a node. Set `recursive` to `true` to traverse the full sub-tree.

Continuation points are handled automatically: all pages are fetched and merged before the promise resolves.

### `client.callMethod(objectId, methodId, inputArguments?, options?): Promise<CallMethodResult>`

Calls an OPC UA method.

```ts
import { CallMethodArgument } from 'opcjs-client'

const result = await client.callMethod(
  NodeId.newNumeric(0, 1000),  // Object that owns the method
  NodeId.newNumeric(0, 1001),  // Method node
  [42, 'hello'] as CallMethodArgument[],
)
// result.values         — output argument values
// result.statusCode     — OPC UA StatusCode
// result.diagnosticInfo — populated when returnDiagnostics > 0
```

### `client.subscribe(ids, callback, options?): Promise<void>`

Creates an OPC UA subscription and monitored items, then starts the Publish loop.

```ts
await client.subscribe(
  [NodeId.newNumeric(0, 2258)],
  (notifications) => {
    for (const { id, value } of notifications) {
      console.log(id, value)
    }
  },
  { requestedPublishingInterval: 1000 },
)
```

`SubscriptionOptions` (all optional, server may revise):

| Field | Default | Description |
|-------|---------|-------------|
| `requestedPublishingInterval` | `2000` ms | Publishing interval |
| `requestedLifetimeCount` | `360000` | Subscription lifetime in publishing intervals |
| `requestedMaxKeepAliveCount` | `60000` | Keep-alive count |
| `maxNotificationsPerPublish` | `200` | `0` = no limit |
| `priority` | `1` | Priority relative to other subscriptions |
| `samplingInterval` | `-1` (use publishing interval) | Monitored item sampling interval |
| `queueSize` | server default | Per-item notification queue |

## Authentication

```ts
// Anonymous (default)
const identity = UserIdentity.newAnonymous()

// Username / password
const identity = UserIdentity.newWithUserName('user', 'pass')

// Issued token (e.g. OAuth / JWT)
const identity = UserIdentity.newWithIssuerToken(async (config) => {
  return { tokenData: new TextEncoder().encode(await fetchJwt(config)) }
})
```

## Security Configuration

Attach a `SecurityConfiguration` to the `ConfigurationClient` to restrict which security options are accepted:

```ts
import { UserTokenTypeEnum } from 'opcjs-base'

const config = ConfigurationClient.getSimple('MyApp', 'MyCompany')
config.securityConfiguration = {
  // Require authentication — reject anonymous connections
  allowedUserTokenTypes: [UserTokenTypeEnum.UserName],
  // Require an encrypted channel (throws until non-None policies are supported)
  allowSecurityPolicyNone: false,
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `allowedUserTokenTypes` | all types | Token types the client will accept |
| `allowSecurityPolicyNone` | `true` | Allow unencrypted SecurityPolicy None channels |
| `messageSecurityMode` | any | Required `MessageSecurityMode` |
| `trustedCAs` | — | DER-encoded trusted CA certificates (reserved for future use) |
| `unknownCertificatePolicy` | — | `'reject'` or `'trust'` for unverifiable server certificates (reserved for future use) |

> **Security note:** `allowSecurityPolicyNone: true` (the default) allows cleartext communication. Set it to `false` once non-None security policies are available in this client implementation.

## Request Options

All service methods (`read`, `callMethod`, `browse`) accept an optional `RequestOptions` object as their last parameter.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `returnDiagnostics` | `number` | `0` | Bitmask of diagnostic fields the server should populate (OPC UA Part 4, §7.15). Use `ReturnDiagnosticsMask` constants to compose the value. |

### `ReturnDiagnosticsMask` constants

```ts
import { ReturnDiagnosticsMask } from 'opcjs-client'
```

| Constant | Value | Description |
|----------|-------|-------------|
| `ServiceLevel` | `0x001f` | All service-level fields |
| `OperationLevel` | `0x03e0` | All operation-level fields |
| `All` | `0x03ff` | All diagnostic fields |
| `ServiceSymbolicId` | `0x0001` | Service symbolic identifier |
| `ServiceLocalizedText` | `0x0002` | Service localised text |
| `ServiceAdditionalInfo` | `0x0004` | Service additional info |
| `ServiceInnerStatusCode` | `0x0008` | Service inner status code |
| `ServiceInnerDiagnostics` | `0x0010` | Service inner diagnostic info |
| `OperationSymbolicId` | `0x0020` | Operation symbolic identifier |
| `OperationLocalizedText` | `0x0040` | Operation localised text |
| `OperationAdditionalInfo` | `0x0080` | Operation additional info |
| `OperationInnerStatusCode` | `0x0100` | Operation inner status code |
| `OperationInnerDiagnostics` | `0x0200` | Operation inner diagnostic info |

### Example

```ts
import { ReturnDiagnosticsMask } from 'opcjs-client'

const [result] = await client.read(
  [NodeId.newNumeric(0, 2258)],
  { returnDiagnostics: ReturnDiagnosticsMask.All },
)
if (result.diagnosticInfo) {
  console.log('additional info:', result.diagnosticInfo.additionalInfo)
}

const callResult = await client.callMethod(
  objectId,
  methodId,
  [],
  { returnDiagnostics: ReturnDiagnosticsMask.OperationLevel },
)
```

When `returnDiagnostics` is `0` (the default) the `diagnosticInfo` field on each result is `undefined`.

## Core Capacities

This section satisfies the **Documentation – Core Capacities** conformance unit (OPC UA Core 2022 Client Facet, §A).

| Capacity | Value | Notes |
|----------|-------|-------|
| SecureChannels per `Client` instance | **1** | A single channel is opened on `connect()` and renewed automatically at 75 % of token lifetime |
| Sessions per `Client` instance | **1** | One OPC UA session per `Client`; create multiple `Client` instances for multiple sessions |
| Subscriptions per session | **1** | More than one subscription per `Client` is not yet implemented |
| Monitored items per subscription | Unlimited (server-limited) | All requested items are batched into a single `CreateMonitoredItems` call |
| Continuation points | Server-determined | `browse()` follows all continuation points automatically via `BrowseNext` |
| Max message size | Server-determined | Negotiated during Hello/Ack (UA-TCP handshake) |
| Request handles | Monotonically increasing `uint32` | Managed by `serviceBase.ts`; wraps at 2³²−1 |

## Time Synchronisation

This client relies on the **OS system clock** for all timestamps.

On Linux this is typically kept accurate by `systemd-timesyncd` (SNTP) or a full NTP daemon (`ntpd`, `chrony`). On Windows, the W32tm service provides equivalent synchronisation. On macOS, `timed` handles clock sync.

This satisfies the **Time Sync – OS based support** optional conformance unit, which in turn satisfies the **Time Sync – Support** required conformance unit from the OPC UA Core 2022 Client Facet.

No application-level time-sync mechanism (IEEE 1588 PTP, IEEE 802.1AS, UA-based time sync) is implemented.

## Conformance Status

| Conformance Unit | Status |
|-----------------|--------|
| Address Space Client NodeId IdTypes | ✅ Done |
| Documentation – Core Capacities | ✅ Done (see above) |
| Base Services Client Diagnostics | ✅ Done (`RequestOptions.returnDiagnostics`, `ReturnDiagnosticsMask`) |
| Security Administration | ✅ Done (`SecurityConfiguration`) |
| Session Client Auto Reconnect | ✅ Done |
| Session Client Base (`CloseSession`) | ✅ Done |
| Session Client General Service Behaviour | ✅ Done |
| Session Client KeepAlive | ✅ Done (dedicated timer + Publish loop) |
| Protocol UA TCP | ✅ Done |
| UA Binary Encoding | ✅ Done |
| UA Secure Conversation | ✅ Done |
| SecurityPolicy None | ✅ Done |
| Time Sync – Support (via OS) | ✅ Satisfied |
| Security User Anonymous Client | ✅ Done |

## License

MIT
