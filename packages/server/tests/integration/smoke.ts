/**
 * Standalone smoke test for the integration infrastructure.
 * Run with: npx tsx tests/integration/smoke.ts
 */
import { OpcUaServer } from '../../src/opcUaServer.js'
import { NodeClient } from './nodeClient.js'
import { NodeId } from 'opcjs-base'

console.log('Starting server...')
const server = new OpcUaServer({ productName: 'SmokeTest', company: 'test', port: 0 })
await server.start()
console.log(`Server started at ${server.endpointUrl}`)

console.log('Connecting client...')
const client = new NodeClient()
await client.connect(server.endpointUrl)
console.log('Client connected and session activated!')

console.log('Reading NamespaceArray...')
const results = await client.read([NodeId.newNumeric(0, 2255)])
console.log('NamespaceArray result:', JSON.stringify(results[0].value?.value))
console.log('StatusCode:', results[0].statusCode)

console.log('Disconnecting...')
await client.disconnect()
console.log('Client disconnected.')

await server.stop()
console.log('Server stopped. ✓')
process.exit(0)
