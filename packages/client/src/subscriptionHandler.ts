import {
    DataChangeNotification,
    ExpandedNodeId,
    getLogger,
    NodeId,
    StatusChangeNotification,
    SubscriptionAcknowledgement,
} from 'opcjs-base'

import { MonitoredItemService } from './services/monitoredItemService'
import { SubscriptionService } from './services/subscriptionService'
import { SubscriptionHandlerEntry } from './subscriptionHandlerEntry'

// OPC UA Part 4, §5.14 — Subscriptions and Monitored Items

/** Node type IDs for notification payloads (OPC UA Part 4, §7.21) */
const NODE_ID_DATA_CHANGE_NOTIFICATION = 811
const NODE_ID_STATUS_CHANGE_NOTIFICATION = 818

export class SubscriptionHandler {
    private logger = getLogger('SubscriptionHandler')
    private entries = new Array<SubscriptionHandlerEntry>()
    private nextHandle = 0
    private isRunning = false

    /** Returns true when at least one subscription is active and the publish loop is running. */
    hasActiveSubscription(): boolean {
        return this.isRunning && this.entries.length > 0
    }

    async subscribe(ids: NodeId[], callback: (data: { id: NodeId; value: unknown }[]) => void) {
        if (this.entries.length > 0) {
            throw new Error('Subscribing more than once is not implemented')
        }

        const subscriptionId = await this.subscriptionService.createSubscription()
        const items = []
        for (const id of ids) {
            const entry = new SubscriptionHandlerEntry(subscriptionId, this.nextHandle++, id, callback)
            this.entries.push(entry)
            items.push({ id, handle: entry.handle })
        }
        await this.monitoredItemService.createMonitoredItems(subscriptionId, items)

        // Start the publish loop with no pending acknowledgements.
        this.isRunning = true
        void this.publishLoop([])
    }

    // https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14.5
    private async publishLoop(pendingAcknowledgements: SubscriptionAcknowledgement[]): Promise<void> {
        if (!this.isRunning) return

        let response
        try {
            response = await this.subscriptionService.publish(pendingAcknowledgements)
        } catch (err) {
            this.logger.error(`Publish failed, stopping publish loop: ${err}`)
            this.isRunning = false
            return
        }

        const { subscriptionId, availableSequenceNumbers, moreNotifications, notificationMessage } = response
        const notificationDatas = notificationMessage?.notificationData ?? []
        const seqNumber = notificationMessage?.sequenceNumber

        // Build acknowledgements for the next publish request.
        // Per spec: only acknowledge sequence numbers that are in availableSequenceNumbers
        // and only for real notification messages (not keep-alive, which have empty notificationData).
        const nextAcknowledgements: SubscriptionAcknowledgement[] = []
        const isKeepAlive = notificationDatas.length === 0

        if (!isKeepAlive && seqNumber !== undefined) {
            // Acknowledge only if the server still lists this sequence number as available.
            const isAvailable = !availableSequenceNumbers || availableSequenceNumbers.includes(seqNumber)
            if (isAvailable) {
                const ack = new SubscriptionAcknowledgement()
                ack.subscriptionId = subscriptionId
                ack.sequenceNumber = seqNumber
                nextAcknowledgements.push(ack)
            }
        }

        // Dispatch notifications to registered callbacks.
        for (const notificationData of notificationDatas) {
            const decodedData = notificationData.data
            const rawTypeId = notificationData.typeId
            const typeNodeId = rawTypeId instanceof ExpandedNodeId ? rawTypeId.nodeId : rawTypeId

            if (typeNodeId.namespace === 0 && typeNodeId.identifier === NODE_ID_DATA_CHANGE_NOTIFICATION) {
                const dataChangeNotification = decodedData as DataChangeNotification
                for (const item of dataChangeNotification.monitoredItems) {
                    const entry = this.entries.find(e => e.handle === item.clientHandle)
                    entry?.callback([{ id: entry.id, value: item.value.value?.value }])
                }
            } else if (typeNodeId.namespace === 0 && typeNodeId.identifier === NODE_ID_STATUS_CHANGE_NOTIFICATION) {
                // The server notifies us the subscription state has changed (e.g. expired, closed).
                const statusChange = decodedData as StatusChangeNotification
                this.logger.warn(
                    `Subscription ${subscriptionId} status changed: 0x${statusChange.status?.toString(16).toUpperCase()}`,
                )
                this.isRunning = false
                return
            } else {
                this.logger.warn(
                    `Notification data type ${typeNodeId.namespace}:${typeNodeId.identifier} is not supported.`,
                )
            }
        }

        // Per spec: if moreNotifications is true the server has more queued data — re-publish immediately
        // without delay so the server's queue drains before its lifetime counter expires.
        // Otherwise, schedule the next publish after a short yield to avoid a tight synchronous loop.
        if (moreNotifications) {
            void this.publishLoop(nextAcknowledgements)
        } else {
            setTimeout(() => void this.publishLoop(nextAcknowledgements), 0)
        }
    }

    constructor(
        private subscriptionService: SubscriptionService,
        private monitoredItemService: MonitoredItemService,
    ) {}
}