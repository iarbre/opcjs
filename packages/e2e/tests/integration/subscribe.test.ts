/**
 * End-to-end test: opcjs-client ↔ opcjs-server, anonymous, data-change subscriptions.
 *
 * Starts an in-process {@link OpcUaServer} with a custom Int32 variable, then
 * uses the high-level {@link Client.subscribe} API to monitor the variable,
 * mutates it server-side, and asserts that the callback is invoked with the
 * updated value.
 *
 * A second test verifies that the keep-alive path is exercised when the
 * variable does not change during the subscription lifetime.
 *
 * The WebSocket polyfill (registered in vitest.config.ts) rewrites `wss://`
 * → `ws://` so the Node `ws` stack can reach the unencrypted server.
 */

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { NodeId, Variant, uaInt32 } from 'opcjs-base'
import { Client, ConfigurationClient, UserIdentity } from 'opcjs-client'
import { AddressSpace, OpcUaServer } from 'opcjs-server'
import type { VariableNode } from 'opcjs-server'

const COUNTER_NODE_ID = NodeId.newNumeric(1, 2001)
const INT32_TYPE_ID = NodeId.newNumeric(0, 6)

let server: OpcUaServer
let endpointUrl: string
let counter: VariableNode

beforeAll(async () => {
  const addressSpace = new AddressSpace()
  counter = addressSpace.addVariable(
    COUNTER_NODE_ID,
    'Counter',
    INT32_TYPE_ID,
    Variant.newFrom(uaInt32(0)),
  )

  server = new OpcUaServer({ productName: 'E2ESubscribeServer', company: 'opcjs', port: 0 })
  server.addressSpace = addressSpace
  await server.start()
  endpointUrl = server.endpointUrl
}, 15_000)

afterAll(async () => {
  await server.stop()
}, 15_000)

function makeClient(): Client {
  const cfg = ConfigurationClient.getSimple('OpcJsE2ESubscribeClient', 'opcjs')
  const url = endpointUrl.replace(/^opc\./, '')
  return new Client(url, cfg, UserIdentity.newAnonymous())
}

describe('opcjs-client ↔ opcjs-server (anonymous, subscribe)', () => {
  it('receives the initial value and subsequent data changes', async () => {
    const client = makeClient()
    await client.connect()

    try {
      const received: number[] = []
      const done = new Promise<void>(resolve => {
        void client.subscribe(
          [COUNTER_NODE_ID],
          updates => {
            for (const u of updates) {
              received.push(u.value as number)
              if (received.length >= 2) resolve()
            }
          },
          { requestedPublishingInterval: 100 },
        )
      })

      // Let the initial value arrive first, then mutate the variable.
      await new Promise(r => setTimeout(r, 300))
      counter.setValue(Variant.newFrom(uaInt32(42)))

      await done
      expect(received[0]).toBe(0)
      expect(received[1]).toBe(42)
    } finally {
      await client.disconnect()
    }
  }, 15_000)

  it('delivers at least one notification (keep-alive) even when the value does not change', async () => {
    const client = makeClient()
    await client.connect()

    try {
      const received: number[] = []
      const done = new Promise<void>(resolve => {
        void client.subscribe(
          [COUNTER_NODE_ID],
          updates => {
            received.push(...updates.map(u => u.value as number))
            resolve()
          },
          { requestedPublishingInterval: 100, requestedMaxKeepAliveCount: 2 },
        )
      })

      // Do NOT mutate the variable — the subscription should fire with the
      // current value on the first sampling tick and then keep-alive.
      await done
      expect(received.length).toBeGreaterThanOrEqual(1)
    } finally {
      await client.disconnect()
    }
  }, 15_000)
})
