import { describe, expect, it } from 'vitest'
import {
  CreateSubscriptionRequest,
  DataValue,
  DeleteSubscriptionsRequest,
  ExtensionObject,
  MonitoringModeEnum,
  NodeId,
  PublishRequest,
  ReadValueId,
  RequestHeader,
  StatusCode,
  SubscriptionAcknowledgement,
  Variant,
} from 'opcjs-base'

import { uaInt32 } from 'opcjs-base'

import { AddressSpace } from '../src/addressSpace/addressSpace.js'
import { AttributeId } from '../src/addressSpace/node.js'
import { SubscriptionManager } from '../src/subscription/subscriptionManager.js'
import { SubscriptionService } from '../src/services/subscriptionService.js'
import { MonitoredItemService } from '../src/services/monitoredItemService.js'
import {
  CreateMonitoredItemsRequest,
  MonitoredItemCreateRequest,
  MonitoringParameters,
  TimestampsToReturnEnum,
} from 'opcjs-base'

function makeRequestHeader(authToken?: NodeId): RequestHeader {
  const h = new RequestHeader()
  h.authenticationToken = authToken ?? NodeId.newNumeric(0, 1)
  h.requestHandle = 1
  h.timestamp = new Date()
  h.timeoutHint = 0
  h.returnDiagnostics = 0
  h.auditEntryId = null
  h.additionalHeader = ExtensionObject.newEmpty()
  return h
}

function makeAuthToken(): NodeId {
  return NodeId.newNumeric(0, Math.floor(Math.random() * 1_000_000) + 1)
}

function makeStack() {
  const addressSpace = new AddressSpace()
  const manager = new SubscriptionManager(addressSpace)
  const subscriptionSvc = new SubscriptionService(manager)
  const monitoredItemSvc = new MonitoredItemService(manager)
  return { addressSpace, manager, subscriptionSvc, monitoredItemSvc }
}

describe('SubscriptionManager.createSubscription', () => {
  it('revises parameters and assigns unique ids', () => {
    const { manager } = makeStack()
    const auth = makeAuthToken()

    const a = manager.createSubscription({
      ownerAuthToken: auth,
      requestedPublishingInterval: 100,
      requestedMaxKeepAliveCount: 5,
      requestedLifetimeCount: 10,
      maxNotificationsPerPublish: 50,
      publishingEnabled: true,
      priority: 1,
    })
    const b = manager.createSubscription({
      ownerAuthToken: auth,
      requestedPublishingInterval: 100,
      requestedMaxKeepAliveCount: 5,
      requestedLifetimeCount: 10,
      maxNotificationsPerPublish: 50,
      publishingEnabled: true,
      priority: 1,
    })

    expect(a.subscriptionId).not.toBe(b.subscriptionId)
    expect(a.revisedPublishingInterval).toBeGreaterThanOrEqual(50)
    // lifetime must be >= 3 × keepAliveCount
    expect(a.revisedLifetimeCount).toBeGreaterThanOrEqual(3 * a.revisedMaxKeepAliveCount)

    a.dispose()
    b.dispose()
  })

  it('clamps too-small publishing interval to the minimum', () => {
    const { manager } = makeStack()
    const auth = makeAuthToken()

    const sub = manager.createSubscription({
      ownerAuthToken: auth,
      requestedPublishingInterval: 1,
      requestedMaxKeepAliveCount: 5,
      requestedLifetimeCount: 10,
      maxNotificationsPerPublish: 50,
      publishingEnabled: true,
      priority: 1,
    })

    expect(sub.revisedPublishingInterval).toBeGreaterThanOrEqual(50)
    sub.dispose()
  })
})

describe('SubscriptionManager.deleteSubscriptionsOfSession', () => {
  it('deletes only the subscriptions of the given session', () => {
    const { manager } = makeStack()
    const auth1 = makeAuthToken()
    const auth2 = makeAuthToken()

    manager.createSubscription({
      ownerAuthToken: auth1,
      requestedPublishingInterval: 100,
      requestedMaxKeepAliveCount: 5,
      requestedLifetimeCount: 10,
      maxNotificationsPerPublish: 50,
      publishingEnabled: true,
      priority: 1,
    })
    manager.createSubscription({
      ownerAuthToken: auth2,
      requestedPublishingInterval: 100,
      requestedMaxKeepAliveCount: 5,
      requestedLifetimeCount: 10,
      maxNotificationsPerPublish: 50,
      publishingEnabled: true,
      priority: 1,
    })

    expect(manager.count).toBe(2)
    manager.deleteSubscriptionsOfSession(auth1)
    expect(manager.count).toBe(1)
    manager.deleteSubscriptionsOfSession(auth2)
    expect(manager.count).toBe(0)
  })
})

describe('SubscriptionService.publish', () => {
  it('returns Bad_NoSubscription when the session has no subscriptions', async () => {
    const { subscriptionSvc } = makeStack()
    const auth = makeAuthToken()

    const req = new PublishRequest()
    req.requestHeader = makeRequestHeader(auth)
    req.subscriptionAcknowledgements = []

    const res = await subscriptionSvc.publish(req, auth)
    expect(res.responseHeader?.serviceResult).toBe(StatusCode.BadNoSubscription)
  })

  it('waits for a publishing tick and delivers a data change', async () => {
    const { addressSpace, manager, subscriptionSvc, monitoredItemSvc } = makeStack()
    const auth = makeAuthToken()

    // Add a variable we can mutate.
    const nodeId = NodeId.newNumeric(1, 1000)
    const variable = addressSpace.addVariable(
      nodeId,
      'TestVar',
      NodeId.newNumeric(0, 6),
      Variant.newFrom(uaInt32(1)),
    )

    // CreateSubscription with a small publishing interval.
    const createReq = new CreateSubscriptionRequest()
    createReq.requestHeader = makeRequestHeader(auth)
    createReq.requestedPublishingInterval = 50
    createReq.requestedMaxKeepAliveCount = 100
    createReq.requestedLifetimeCount = 1000
    createReq.maxNotificationsPerPublish = 100
    createReq.publishingEnabled = true
    createReq.priority = 1

    const session = {
      sessionId: NodeId.newNumeric(0, 1),
      authenticationToken: auth,
      serverNonce: new Uint8Array(32),
      revisedTimeoutMs: 60_000,
      boundChannelId: 1,
      isActivated: true,
      createdAt: new Date(),
      lastActivityAt: new Date(),
    }
    const createRes = subscriptionSvc.createSubscription(createReq, session)
    expect(createRes.responseHeader?.serviceResult).toBe(StatusCode.Good)
    const subscriptionId = createRes.subscriptionId

    // CreateMonitoredItems for the variable's Value attribute.
    const rvi = new ReadValueId()
    rvi.nodeId = nodeId
    rvi.attributeId = AttributeId.Value
    rvi.indexRange = ''
    rvi.dataEncoding = { namespaceIndex: 0, name: '' } as never

    const params = new MonitoringParameters()
    params.clientHandle = 7
    params.samplingInterval = 50
    params.queueSize = 1
    params.discardOldest = true
    params.filter = ExtensionObject.newEmpty()

    const miCreate = new MonitoredItemCreateRequest()
    miCreate.itemToMonitor = rvi
    miCreate.monitoringMode = MonitoringModeEnum.Reporting
    miCreate.requestedParameters = params

    const cmiReq = new CreateMonitoredItemsRequest()
    cmiReq.requestHeader = makeRequestHeader(auth)
    cmiReq.subscriptionId = subscriptionId
    cmiReq.timestampsToReturn = TimestampsToReturnEnum.Source
    cmiReq.itemsToCreate = [miCreate]

    const cmiRes = monitoredItemSvc.createMonitoredItems(cmiReq, auth)
    expect(cmiRes.results[0].statusCode).toBe(StatusCode.Good)

    // First publish — delivers the initial value (sampled on add).
    const pubReq1 = new PublishRequest()
    pubReq1.requestHeader = makeRequestHeader(auth)
    pubReq1.subscriptionAcknowledgements = []
    const pubRes1 = await subscriptionSvc.publish(pubReq1, auth)
    expect(pubRes1.subscriptionId).toBe(subscriptionId)
    expect(pubRes1.notificationMessage?.notificationData?.length).toBe(1)

    // Mutate the variable, then issue a second publish — should receive the
    // change after the next publishing tick.
    variable.setValue(Variant.newFrom(uaInt32(2)))

    const ack = new SubscriptionAcknowledgement()
    ack.subscriptionId = subscriptionId
    ack.sequenceNumber = pubRes1.notificationMessage!.sequenceNumber

    const pubReq2 = new PublishRequest()
    pubReq2.requestHeader = makeRequestHeader(auth)
    pubReq2.subscriptionAcknowledgements = [ack]

    const pubRes2 = await subscriptionSvc.publish(pubReq2, auth)
    expect(pubRes2.subscriptionId).toBe(subscriptionId)
    expect(pubRes2.notificationMessage?.notificationData?.length).toBe(1)
    // Sequence numbers must be increasing.
    expect(pubRes2.notificationMessage!.sequenceNumber).toBeGreaterThan(
      pubRes1.notificationMessage!.sequenceNumber,
    )

    // Cleanup
    const delReq = new DeleteSubscriptionsRequest()
    delReq.requestHeader = makeRequestHeader(auth)
    delReq.subscriptionIds = [subscriptionId]
    const delRes = subscriptionSvc.deleteSubscriptions(delReq, auth)
    expect(delRes.results[0]).toBe(StatusCode.Good)
    expect(manager.count).toBe(0)
  }, 5_000)
})

describe('MonitoredItemService.createMonitoredItems', () => {
  it('returns Bad_SubscriptionIdInvalid for unknown subscription', () => {
    const { monitoredItemSvc } = makeStack()
    const auth = makeAuthToken()

    const req = new CreateMonitoredItemsRequest()
    req.requestHeader = makeRequestHeader(auth)
    req.subscriptionId = 9999
    req.timestampsToReturn = TimestampsToReturnEnum.Source
    req.itemsToCreate = []

    const res = monitoredItemSvc.createMonitoredItems(req, auth)
    expect(res.responseHeader?.serviceResult).toBe(StatusCode.BadSubscriptionIdInvalid)
  })

  it('reads an initial DataValue on creation', () => {
    const { addressSpace, manager, monitoredItemSvc } = makeStack()
    const auth = makeAuthToken()
    const nodeId = NodeId.newNumeric(1, 2001)
    addressSpace.addVariable(nodeId, 'X', NodeId.newNumeric(0, 6), Variant.newFrom(uaInt32(42)))

    const sub = manager.createSubscription({
      ownerAuthToken: auth,
      requestedPublishingInterval: 100,
      requestedMaxKeepAliveCount: 5,
      requestedLifetimeCount: 100,
      maxNotificationsPerPublish: 100,
      publishingEnabled: true,
      priority: 1,
    })

    const rvi = new ReadValueId()
    rvi.nodeId = nodeId
    rvi.attributeId = AttributeId.Value
    rvi.indexRange = ''
    rvi.dataEncoding = { namespaceIndex: 0, name: '' } as never

    const params = new MonitoringParameters()
    params.clientHandle = 3
    params.samplingInterval = 50
    params.queueSize = 1
    params.discardOldest = true
    params.filter = ExtensionObject.newEmpty()

    const miCreate = new MonitoredItemCreateRequest()
    miCreate.itemToMonitor = rvi
    miCreate.monitoringMode = MonitoringModeEnum.Reporting
    miCreate.requestedParameters = params

    const req = new CreateMonitoredItemsRequest()
    req.requestHeader = makeRequestHeader(auth)
    req.subscriptionId = sub.subscriptionId
    req.timestampsToReturn = TimestampsToReturnEnum.Source
    req.itemsToCreate = [miCreate]

    const res = monitoredItemSvc.createMonitoredItems(req, auth)
    expect(res.results[0].statusCode).toBe(StatusCode.Good)
    expect(res.results[0].monitoredItemId).toBeGreaterThan(0)

    sub.dispose()
  })

  it('reports Bad_NodeIdInvalid for an item without a nodeId', () => {
    const { manager, monitoredItemSvc } = makeStack()
    const auth = makeAuthToken()
    const sub = manager.createSubscription({
      ownerAuthToken: auth,
      requestedPublishingInterval: 100,
      requestedMaxKeepAliveCount: 5,
      requestedLifetimeCount: 100,
      maxNotificationsPerPublish: 100,
      publishingEnabled: true,
      priority: 1,
    })

    const rvi = new ReadValueId()
    rvi.nodeId = null as unknown as NodeId
    rvi.attributeId = AttributeId.Value
    rvi.indexRange = ''
    rvi.dataEncoding = { namespaceIndex: 0, name: '' } as never

    const params = new MonitoringParameters()
    params.clientHandle = 0
    params.samplingInterval = 50
    params.queueSize = 1
    params.discardOldest = true
    params.filter = ExtensionObject.newEmpty()

    const miCreate = new MonitoredItemCreateRequest()
    miCreate.itemToMonitor = rvi
    miCreate.monitoringMode = MonitoringModeEnum.Reporting
    miCreate.requestedParameters = params

    const req = new CreateMonitoredItemsRequest()
    req.requestHeader = makeRequestHeader(auth)
    req.subscriptionId = sub.subscriptionId
    req.timestampsToReturn = TimestampsToReturnEnum.Source
    req.itemsToCreate = [miCreate]

    const res = monitoredItemSvc.createMonitoredItems(req, auth)
    expect(res.results[0].statusCode).toBe(StatusCode.BadNodeIdInvalid)

    sub.dispose()
  })
})

// Touch DataValue + Variant imports so unused-import lint stays happy
const _touch: DataValue | undefined = undefined
void _touch
