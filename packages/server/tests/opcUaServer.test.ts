import { describe, it, expect } from 'vitest'
import { OpcUaServer } from '../src/opcUaServer.js'

describe('OpcUaServer', () => {
  it('starts and stops cleanly', async () => {
    const server = new OpcUaServer({
      applicationUri: 'urn:test:opcua:server',
      productName: 'TestServer',
    })

    expect(server.isRunning).toBe(false)

    await server.start()
    expect(server.isRunning).toBe(true)

    await server.stop()
    expect(server.isRunning).toBe(false)
  })

  it('exposes the configured applicationUri', () => {
    const server = new OpcUaServer({
      applicationUri: 'urn:example:server',
      productName: 'Example',
    })

    expect(server.applicationUri).toBe('urn:example:server')
  })

  it('calling start twice is idempotent', async () => {
    const server = new OpcUaServer({
      applicationUri: 'urn:test:opcua:server',
      productName: 'TestServer',
    })

    await server.start()
    await server.start()
    expect(server.isRunning).toBe(true)

    await server.stop()
  })

  it('calling stop when not running is idempotent', async () => {
    const server = new OpcUaServer({
      applicationUri: 'urn:test:opcua:server',
      productName: 'TestServer',
    })

    await expect(server.stop()).resolves.toBeUndefined()
    expect(server.isRunning).toBe(false)
  })
})
