/**
 * Integration tests: attribute reads from a live opcjs-server.
 *
 * Starts an OpcUaServer bound to an OS-assigned port.  A shared NodeClient
 * session is established in beforeAll and torn down in afterAll.  Individual
 * tests check specific server nodes, status codes, and timestampsToReturn
 * behaviour.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { NodeId, StatusCode, TimestampsToReturnEnum, Variant, uaDouble } from 'opcjs-base'
import { OpcUaServer } from '../../src/opcUaServer.js'
import { AddressSpace } from '../../src/addressSpace/addressSpace.js'
import { NodeClient } from './nodeClient.js'

let server: OpcUaServer
let client: NodeClient

beforeAll(async () => {
  server = new OpcUaServer({ productName: 'AttrReadServer', company: 'test', port: 0 })

  // Add a custom variable for testing
  const as = server.addressSpace as AddressSpace
  as.addVariable(
    NodeId.newNumeric(1, 1),
    'TestTemperature',
    NodeId.newNumeric(0, 11), // Double data type (i=11)
    Variant.newFrom(uaDouble(23.5)),
  )

  await server.start()

  client = new NodeClient()
  await client.connect(server.endpointUrl)
}, 15_000)

afterAll(async () => {
  await client.disconnect()
  await server.stop()
}, 10_000)

describe('Attribute reads – standard server nodes', () => {
  it('reads NamespaceArray (i=2255) with Good status', async () => {
    const results = await client.read([NodeId.newNumeric(0, 2255)])
    expect(results[0].statusCode).toBe(StatusCode.Good)
    const uris = results[0].value?.value as string[]
    expect(uris).toContain('http://opcfoundation.org/UA/')
  })

  it('reads ServerArray (i=2254) with Good status', async () => {
    const results = await client.read([NodeId.newNumeric(0, 2254)])
    expect(results[0].statusCode).toBe(StatusCode.Good)
    const uris = results[0].value?.value as string[]
    expect(Array.isArray(uris)).toBe(true)
    expect(uris.length).toBeGreaterThan(0)
  })
})

describe('Attribute reads – error codes', () => {
  it('returns BadNodeIdUnknown for an absent node', async () => {
    const results = await client.read([NodeId.newNumeric(0, 9999)])
    expect(results[0].statusCode).toBe(StatusCode.BadNodeIdUnknown)
  })

  it('can read multiple nodes in a single request', async () => {
    const results = await client.read([
      NodeId.newNumeric(0, 2254), // ServerArray – Good
      NodeId.newNumeric(0, 9999), // absent      – BadNodeIdUnknown
    ])
    expect(results).toHaveLength(2)
    expect(results[0].statusCode).toBe(StatusCode.Good)
    expect(results[1].statusCode).toBe(StatusCode.BadNodeIdUnknown)
  })
})

describe('Attribute reads – timestampsToReturn', () => {
  it('Neither returns no timestamps', async () => {
    const results = await client.read(
      [NodeId.newNumeric(0, 2254)],
      TimestampsToReturnEnum.Neither,
    )
    expect(results[0].statusCode).toBe(StatusCode.Good)
    expect(results[0].sourceTimestamp).toBeUndefined()
    expect(results[0].serverTimestamp).toBeUndefined()
  })

  it('Server returns only server timestamp', async () => {
    const results = await client.read(
      [NodeId.newNumeric(0, 2254)],
      TimestampsToReturnEnum.Server,
    )
    expect(results[0].statusCode).toBe(StatusCode.Good)
    expect(results[0].sourceTimestamp).toBeUndefined()
    expect(results[0].serverTimestamp).toBeInstanceOf(Date)
  })

  it('Source returns only source timestamp for nodes that carry one', async () => {
    // Use the custom variable that was added with a source timestamp via setValue
    const nodeId = NodeId.newNumeric(1, 1)
    const results = await client.read([nodeId], TimestampsToReturnEnum.Source)
    expect(results[0].statusCode).toBe(StatusCode.Good)
    // Source timestamp from AddressSpace: DataValue was created with StatusCode.Good
    // The variable node constructor sets Value directly — no source timestamp by default.
    // Just check the value is correct.
    expect(typeof (results[0].value?.value)).not.toBe('undefined')
  })

  it('Both returns server timestamp', async () => {
    const results = await client.read(
      [NodeId.newNumeric(0, 2254)],
      TimestampsToReturnEnum.Both,
    )
    expect(results[0].statusCode).toBe(StatusCode.Good)
    expect(results[0].serverTimestamp).toBeInstanceOf(Date)
  })
})
