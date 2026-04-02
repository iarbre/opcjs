import { describe, it, expect } from 'vitest'

import { ConfigurationServer } from '../src/configuration/configurationServer.js'
import { OpcUaServer } from '../src/opcUaServer.js'

describe('OpcUaServer', () => {
  it('accepts a plain ServerOptions bag and exposes applicationUri', () => {
    const server = new OpcUaServer({
      productName: 'TestServer',
      applicationUri: 'urn:test:opcua:server',
    })
    expect(server.applicationUri).toBe('urn:test:opcua:server')
    expect(server.isRunning).toBe(false)
  })

  it('accepts a ConfigurationServer instance directly', () => {
    const cfg = ConfigurationServer.getSimple('TestServer', 'acme')
    cfg.applicationUri = 'urn:acme:TestServer'
    const server = new OpcUaServer(cfg)
    expect(server.applicationUri).toBe('urn:acme:TestServer')
  })

  it('derives applicationUri from productName and company when omitted', () => {
    const server = new OpcUaServer({ productName: 'MyServer', company: 'myco' })
    expect(server.applicationUri).toBe('urn:myco:MyServer')
  })
})
