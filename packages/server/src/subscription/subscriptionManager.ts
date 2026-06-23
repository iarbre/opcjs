import {
  type ILogger,
  type NodeId,
  StatusCode,
  getLogger,
} from 'opcjs-base'

import type { IAddressSpace } from '../addressSpace/iAddressSpace.js'
import { Subscription, reviseSubscriptionParameters } from './subscription.js'

/**
 * Owns all live {@link Subscription} instances of a server.
 *
 * Subscriptions are keyed by `subscriptionId` and also indexed by the
 * authentication-token of the owning session so they can be removed when a
 * session is closed (Part 4 §5.6.4 CloseSession with `deleteSubscriptions=true`).
 */
export class SubscriptionManager {
  private readonly logger: ILogger
  private readonly subscriptions = new Map<number, Subscription>()
  /** authToken.toString() → set of subscriptionIds owned by that session. */
  private readonly bySession = new Map<string, Set<number>>()
  /** Monotonically increasing subscriptionId counter. */
  private nextSubscriptionId = 1

  constructor(private readonly addressSpace: IAddressSpace) {
    this.logger = getLogger('subscription.SubscriptionManager')
  }

  /**
   * Creates a new subscription owned by the given session.
   *
   * The requested parameters are revised by {@link reviseSubscriptionParameters}.
   */
  createSubscription(args: {
    ownerAuthToken: NodeId
    requestedPublishingInterval: number
    requestedMaxKeepAliveCount: number
    requestedLifetimeCount: number
    maxNotificationsPerPublish: number
    publishingEnabled: boolean
    priority: number
  }): Subscription {
    const revised = reviseSubscriptionParameters({
      publishingInterval: args.requestedPublishingInterval,
      maxKeepAliveCount: args.requestedMaxKeepAliveCount,
      lifetimeCount: args.requestedLifetimeCount,
    })

    const subscriptionId = this.nextSubscriptionId++
    const tokenKey = args.ownerAuthToken.toString()

    const subscription = new Subscription(
      subscriptionId,
      tokenKey,
      revised.publishingInterval,
      revised.maxKeepAliveCount,
      revised.lifetimeCount,
      args.maxNotificationsPerPublish > 0 ? args.maxNotificationsPerPublish : 1000,
      args.publishingEnabled,
      args.priority,
      this.addressSpace,
      id => this.deleteSubscription(id),
    )

    this.subscriptions.set(subscriptionId, subscription)
    let owned = this.bySession.get(tokenKey)
    if (owned === undefined) {
      owned = new Set()
      this.bySession.set(tokenKey, owned)
    }
    owned.add(subscriptionId)

    this.logger.debug(
      `Subscription ${subscriptionId} created (publishingInterval=${revised.publishingInterval}ms)`,
    )
    return subscription
  }

  /** Returns the subscription, or undefined if not found. */
  get(subscriptionId: number): Subscription | undefined {
    return this.subscriptions.get(subscriptionId)
  }

  /**
   * Returns the subscription if it exists and belongs to the given session.
   * Returns undefined otherwise (the caller must convert to the appropriate
   * service-result StatusCode).
   */
  getOwned(subscriptionId: number, ownerAuthToken: NodeId): Subscription | undefined {
    const sub = this.subscriptions.get(subscriptionId)
    if (sub === undefined) return undefined
    if (sub.ownerAuthToken !== ownerAuthToken.toString()) return undefined
    return sub
  }

  /**
   * Deletes one subscription, releases its resources, and unlinks it from the
   * owning session.  Idempotent.
   */
  deleteSubscription(subscriptionId: number): StatusCode {
    const sub = this.subscriptions.get(subscriptionId)
    if (sub === undefined) return StatusCode.BadSubscriptionIdInvalid
    sub.dispose()
    this.subscriptions.delete(subscriptionId)
    const owned = this.bySession.get(sub.ownerAuthToken)
    if (owned !== undefined) {
      owned.delete(subscriptionId)
      if (owned.size === 0) this.bySession.delete(sub.ownerAuthToken)
    }
    this.logger.debug(`Subscription ${subscriptionId} deleted`)
    return StatusCode.Good
  }

  /**
   * Deletes every subscription owned by the given session.  Invoked from the
   * session-close path so terminated sessions don't leak subscriptions.
   */
  deleteSubscriptionsOfSession(authToken: NodeId): void {
    const tokenKey = authToken.toString()
    const owned = this.bySession.get(tokenKey)
    if (owned === undefined) return
    for (const id of [...owned]) {
      this.deleteSubscription(id)
    }
  }

  /** Iterates every live subscription owned by the given session. */
  forEachOwned(authToken: NodeId, cb: (sub: Subscription) => void): void {
    const owned = this.bySession.get(authToken.toString())
    if (owned === undefined) return
    for (const id of owned) {
      const sub = this.subscriptions.get(id)
      if (sub !== undefined) cb(sub)
    }
  }

  /** Disposes all subscriptions (server shutdown). */
  disposeAll(): void {
    for (const sub of this.subscriptions.values()) {
      sub.dispose()
    }
    this.subscriptions.clear()
    this.bySession.clear()
  }

  /** Test/observability helper: number of live subscriptions. */
  get count(): number {
    return this.subscriptions.size
  }
}
