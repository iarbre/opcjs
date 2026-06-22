/**
 * End-to-end test: opcjs-client ←→ opcjs-server, anonymous, read a node.
 *
 * Starts an in-process {@link OpcUaServer} on an OS-assigned port, opens an
 * anonymous session with the high-level {@link Client}, reads the standard
 * `Server_NamespaceArray` node (NodeId ns=0, i=2255), and asserts that the
 * response is Good and contains the OPC UA core namespace URI.
 *
 * The global `WebSocket` constructor used by `opcjs-client` is provided by
 * `tests/setup/webSocketPolyfill.ts` (registered in vitest.config.ts) so the
 * client can talk to the server's `ws://` listener without TLS.
 */

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { NodeId, StatusCode } from 'opcjs-base'
import { Client, ConfigurationClient, UserIdentity } from 'opcjs-client'
import { OpcUaServer } from 'opcjs-server'

/** NodeId of `Server_NamespaceArray` (OPC UA Part 5, §6.3.6). */
const SERVER_NAMESPACE_ARRAY = NodeId.newNumeric(0, 2255)
const OPC_UA_CORE_NAMESPACE_URI = 'http://opcfoundation.org/UA/'

let server: OpcUaServer
let endpointUrl: string

beforeAll(async () => {
  server = new OpcUaServer({
    productName: 'OpcJsE2EServer',
    company: 'opcjs',
    port: 0,
  })
  await server.start()
  endpointUrl = server.endpointUrl
})

afterAll(async () => {
  await server.stop()
})

describe('opcjs-client ↔ opcjs-server (anonymous, read)', () => {
  it('connects anonymously and reads Server_NamespaceArray', async () => {
    const configuration = ConfigurationClient.getSimple('OpcJsE2EClient', 'opcjs')
    // The high-level Client expects a directly-parseable URL (e.g. `wss://…`);
    // it prepends the OPC UA scheme prefix internally when matching server
    // endpoint descriptions. The server reports its URL as `opc.wss://…`, so
    // strip the prefix before handing it to the client.
    const clientEndpointUrl = endpointUrl.replace(/^opc\./, '')
    const client = new Client(clientEndpointUrl, configuration, UserIdentity.newAnonymous())

    await client.connect()

    try {
      const results = await client.read([SERVER_NAMESPACE_ARRAY])

      expect(results).toHaveLength(1)
      const [result] = results
      expect(result.statusCode).toBe(StatusCode.Good)

      const variant = result.value as { value: unknown } | undefined
      const namespaceUris = variant?.value as string[]
      expect(Array.isArray(namespaceUris)).toBe(true)
      expect(namespaceUris).toContain(OPC_UA_CORE_NAMESPACE_URI)
    } finally {
      await client.disconnect()
    }
  })
})
