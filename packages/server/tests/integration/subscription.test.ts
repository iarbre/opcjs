/**
 * Integration test: subscriptions and monitored items via opcjs-server.
 *
 * Spins up an OpcUaServer with a custom variable, then uses {@link NodeClient}
 * to:
 *   1. Open an anonymous session
 *   2. CreateSubscription
 *   3. CreateMonitoredItems on the variable
 *   4. Publish — receive the initial value
 *   5. Mutate the variable server-side, Publish again — receive the change
 *   6. Receive a keep-alive notification (empty NotificationMessage)
 *   7. DeleteSubscriptions
 *
 * Mirrors the OPC UA Subscription/Monitored-Items lifecycle described in
 * Part 4 §§5.13 & 5.14.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  DataChangeNotification,
  ExpandedNodeId,
  NodeId,
  StatusCode,
  Variant,
  uaInt32,
} from 'opcjs-base'

import { OpcUaServer } from '../../src/opcUaServer.js'
import { AddressSpace } from '../../src/addressSpace/addressSpace.js'
import type { VariableNode } from '../../src/addressSpace/node.js'
import { NodeClient } from './nodeClient.js'

const TEST_VAR_NODE_ID = NodeId.newNumeric(1, 1001)

let server: OpcUaServer
let endpointUrl: string
let variable: VariableNode

beforeAll(async () => {
  const addressSpace = new AddressSpace()
  variable = addressSpace.addVariable(
    TEST_VAR_NODE_ID,
    'Counter',
    NodeId.newNumeric(0, 6), // Int32 type id
    Variant.newFrom(uaInt32(0)),
  )

  server = new OpcUaServer({
    productName: 'SubscriptionServer',
    company: 'test',
    port: 0,
  })
  server.addressSpace = addressSpace
  await server.start()
  endpointUrl = server.endpointUrl
}, 10_000)

afterAll(async () => {
  await server.stop()
}, 10_000)

describe('Subscriptions', () => {
  it('creates a subscription, monitors a variable, and receives data changes', async () => {
    const client = new NodeClient()
    await client.connect(endpointUrl)

    try {
      const subscriptionId = await client.createSubscription({
        requestedPublishingInterval: 100,
        requestedMaxKeepAliveCount: 20,
        requestedLifetimeCount: 100,
      })
      expect(subscriptionId).toBeGreaterThan(0)

      const cmiRes = await client.createMonitoredItems(subscriptionId, [
        { nodeId: TEST_VAR_NODE_ID, clientHandle: 42 },
      ])
      expect(cmiRes.responseHeader?.serviceResult).toBe(StatusCode.Good)
      expect(cmiRes.results).toHaveLength(1)
      expect(cmiRes.results[0].statusCode).toBe(StatusCode.Good)
      const monitoredItemId = cmiRes.results[0].monitoredItemId
      expect(monitoredItemId).toBeGreaterThan(0)

      // First publish: initial value (sampled on monitored-item creation).
      const pubRes1 = await client.publish()
      expect(pubRes1.subscriptionId).toBe(subscriptionId)
      expect(pubRes1.notificationMessage?.notificationData?.length).toBe(1)

      const dcn1 = unwrapDataChange(pubRes1.notificationMessage!.notificationData[0])
      expect(dcn1).not.toBeNull()
      expect(dcn1!.monitoredItems).toHaveLength(1)
      expect(dcn1!.monitoredItems[0].clientHandle).toBe(42)
      expect(extractInt32(dcn1!.monitoredItems[0].value.value)).toBe(0)

      // Server-side mutation, ack the previous, publish again.
      variable.setValue(Variant.newFrom(uaInt32(7)))

      const pubRes2 = await client.publish([
        {
          subscriptionId,
          sequenceNumber: pubRes1.notificationMessage!.sequenceNumber,
        },
      ])
      expect(pubRes2.subscriptionId).toBe(subscriptionId)
      expect(pubRes2.notificationMessage?.notificationData?.length).toBe(1)
      const dcn2 = unwrapDataChange(pubRes2.notificationMessage!.notificationData[0])
      expect(dcn2).not.toBeNull()
      expect(extractInt32(dcn2!.monitoredItems[0].value.value)).toBe(7)

      // Cleanup.
      const delRes = await client.deleteSubscriptions([subscriptionId])
      expect(delRes.responseHeader?.serviceResult).toBe(StatusCode.Good)
      expect(delRes.results[0]).toBe(StatusCode.Good)
    } finally {
      await client.disconnect()
    }
  }, 20_000)

  it('returns Bad_SubscriptionIdInvalid when monitoring on an unknown subscription', async () => {
    const client = new NodeClient()
    await client.connect(endpointUrl)
    try {
      const res = await client.createMonitoredItems(99999, [
        { nodeId: TEST_VAR_NODE_ID, clientHandle: 1 },
      ])
      expect(res.responseHeader?.serviceResult).toBe(StatusCode.BadSubscriptionIdInvalid)
    } finally {
      await client.disconnect()
    }
  }, 15_000)

  it('returns Bad_NoSubscription when publishing without a subscription', async () => {
    const client = new NodeClient()
    await client.connect(endpointUrl)
    try {
      const res = await client.publish()
      expect(res.responseHeader?.serviceResult).toBe(StatusCode.BadNoSubscription)
    } finally {
      await client.disconnect()
    }
  }, 15_000)

  it('delivers a keep-alive when no data changed', async () => {
    const client = new NodeClient()
    await client.connect(endpointUrl)
    try {
      // Use a tiny keep-alive count so the keep-alive fires quickly.
      const subscriptionId = await client.createSubscription({
        requestedPublishingInterval: 80,
        requestedMaxKeepAliveCount: 2,
        requestedLifetimeCount: 50,
      })
      // No monitored items → first publish must keep-alive (empty notificationData).
      const pubRes = await client.publish()
      expect(pubRes.subscriptionId).toBe(subscriptionId)
      expect(pubRes.notificationMessage?.notificationData ?? []).toHaveLength(0)
      await client.deleteSubscriptions([subscriptionId])
    } finally {
      await client.disconnect()
    }
  }, 20_000)
})

// ── helpers ──────────────────────────────────────────────────────────────

function unwrapDataChange(eo: import('opcjs-base').ExtensionObject): DataChangeNotification | null {
  const typeNodeId = eo.typeId instanceof ExpandedNodeId ? eo.typeId.nodeId : eo.typeId
  if (typeNodeId.namespace !== 0 || typeNodeId.identifier !== 811) return null
  return eo.data as DataChangeNotification
}

function extractInt32(v: unknown): number {
  if (v === null || v === undefined) return Number.NaN
  if (typeof v === 'number') return v
  // primitives are wrapped as { value, type }
  return (v as { value: number }).value
}
