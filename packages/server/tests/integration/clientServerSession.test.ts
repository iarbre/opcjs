/**
 * Integration test: full session lifecycle via the real opcjs-server.
 *
 * Starts an OpcUaServer bound to an OS-assigned port, opens a NodeClient
 * (ws:// transport), performs the complete OPC UA session lifecycle, then
 * tears everything down.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { StatusCode, NodeId, TimestampsToReturnEnum } from 'opcjs-base'
import { OpcUaServer } from '../../src/opcUaServer.js'
import { NodeClient } from './nodeClient.js'

let server: OpcUaServer
let endpointUrl: string

beforeAll(async () => {
  server = new OpcUaServer({ productName: 'IntegrationServer', company: 'test', port: 0 })
  await server.start()
  endpointUrl = server.endpointUrl
}, 10_000)

afterAll(async () => {
  await server.stop()
}, 10_000)

describe('Session lifecycle', () => {
  it('connects, creates and activates an anonymous session, then closes it cleanly', async () => {
    const client = new NodeClient()
    await client.connect(endpointUrl)
    // If connect() resolves without throwing, CreateSession + ActivateSession succeeded.
    await client.disconnect()
  }, 15_000)

  it('can create multiple independent sessions', async () => {
    const c1 = new NodeClient()
    const c2 = new NodeClient()

    await c1.connect(endpointUrl)
    await c2.connect(endpointUrl)

    // Both read from the same server concurrently.
    const [nsArr1, nsArr2] = await Promise.all([
      c1.read([NodeId.newNumeric(0, 2255)]),
      c2.read([NodeId.newNumeric(0, 2255)]),
    ])

    expect(nsArr1[0].statusCode).toBe(StatusCode.Good)
    expect(nsArr2[0].statusCode).toBe(StatusCode.Good)

    await c1.disconnect()
    await c2.disconnect()
  }, 15_000)

  it('reads NamespaceArray after session activation', async () => {
    const client = new NodeClient()
    await client.connect(endpointUrl)

    const results = await client.read([NodeId.newNumeric(0, 2255)])
    expect(results).toHaveLength(1)
    expect(results[0].statusCode).toBe(StatusCode.Good)
    const uris = results[0].value?.value as string[]
    expect(uris).toContain('http://opcfoundation.org/UA/')

    await client.disconnect()
  }, 15_000)

  it('reads ServerArray after session activation', async () => {
    const client = new NodeClient()
    await client.connect(endpointUrl)

    const results = await client.read([NodeId.newNumeric(0, 2254)])
    expect(results).toHaveLength(1)
    expect(results[0].statusCode).toBe(StatusCode.Good)
    const uris = results[0].value?.value as string[]
    expect(Array.isArray(uris)).toBe(true)
    expect(uris.length).toBeGreaterThan(0)

    await client.disconnect()
  }, 15_000)

  it('returns isRunning=true while server is running', () => {
    expect(server.isRunning).toBe(true)
  })
})
