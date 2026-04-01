/**
 * Unit tests for the Base Info Client Selection List conformance unit.
 *
 * OPC UA Part 5, §7.18 — SelectionListType (ns=0; i=19726):
 * A variable of SelectionListType exposes the mandatory Selections property
 * (an array of permitted values) and the optional SelectionDescriptions
 * (LocalizedText[]) and RestrictToList (Boolean) properties via HasProperty
 * references.
 *
 * Tests drive `fetchSelectionList()` directly via `(client as any)` to keep
 * things fast without spinning up a real transport.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Client } from '../../src/client.js'
import { ConfigurationClient } from '../../src/configuration/configurationClient.js'
import { UserIdentity } from '../../src/userIdentity.js'
import type { SelectionList } from '../../src/selectionList.js'
import { LocalizedText, NodeId } from 'opcjs-base'

const SOME_NODE_ID = NodeId.newNumeric(2, 1001)
const SELECTIONS_NODE_ID = NodeId.newNumeric(2, 1002)
const DESC_NODE_ID = NodeId.newNumeric(2, 1003)
const RESTRICT_NODE_ID = NodeId.newNumeric(2, 1004)

/** Wraps a value in the Variant-like shape that AttributeService.ReadValue returns. */
function makeVariantResult(value: unknown) {
  return { value: { value } }
}

/** Build a fake ReferenceDescription-like object for a HasProperty ref. */
function makePropertyRef(name: string, id: NodeId) {
  return {
    referenceTypeId: NodeId.newNumeric(0, 46),
    isForward: true,
    nodeId: { nodeId: id },
    browseName: { name },
    displayName: { text: name },
    nodeClass: 2,
    typeDefinition: { nodeId: NodeId.newNumeric(0, 0) },
  }
}

function makeClient(): Client {
  const config = ConfigurationClient.getSimple('selection-list-test', 'test')
  const identity = UserIdentity.newAnonymous()
  return new Client('opc.wss://localhost:4840', config, identity)
}

function injectServices(
  client: Client,
  browseRefs: unknown[],
  readValues: unknown[],
): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = client as any
  c.browseService = {
    browse: vi.fn().mockResolvedValue([{ references: browseRefs }]),
  }
  c.attributeService = {
    ReadValue: vi.fn().mockResolvedValue(readValues),
  }
}

describe('Client.getSelectionList', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns null when node has no Selections property', async () => {
    const client = makeClient()
    injectServices(client, [], [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: SelectionList | null = await (client as any).fetchSelectionList(SOME_NODE_ID)

    expect(result).toBeNull()
  })

  it('returns SelectionList with selections when Selections property exists', async () => {
    const client = makeClient()
    injectServices(
      client,
      [makePropertyRef('Selections', SELECTIONS_NODE_ID)],
      [makeVariantResult(['a', 'b', 'c'])],
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: SelectionList | null = await (client as any).fetchSelectionList(SOME_NODE_ID)

    expect(result).not.toBeNull()
    expect(result?.selections).toEqual(['a', 'b', 'c'])
    expect(result?.selectionDescriptions).toEqual([])
    expect(result?.restrictToList).toBe(false)
  })

  it('includes selectionDescriptions when SelectionDescriptions property exists', async () => {
    const desc0 = new LocalizedText('en-US', 'Option A')
    const desc1 = new LocalizedText('en-US', 'Option B')
    const client = makeClient()
    injectServices(
      client,
      [
        makePropertyRef('Selections', SELECTIONS_NODE_ID),
        makePropertyRef('SelectionDescriptions', DESC_NODE_ID),
      ],
      [makeVariantResult(['a', 'b']), makeVariantResult([desc0, desc1])],
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: SelectionList | null = await (client as any).fetchSelectionList(SOME_NODE_ID)

    expect(result?.selectionDescriptions).toEqual([desc0, desc1])
  })

  it('sets restrictToList = true when RestrictToList property is true', async () => {
    const client = makeClient()
    injectServices(
      client,
      [
        makePropertyRef('Selections', SELECTIONS_NODE_ID),
        makePropertyRef('RestrictToList', RESTRICT_NODE_ID),
      ],
      [makeVariantResult([1, 2, 3]), makeVariantResult(true)],
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: SelectionList | null = await (client as any).fetchSelectionList(SOME_NODE_ID)

    expect(result?.restrictToList).toBe(true)
  })

  it('reads all three optional properties together', async () => {
    const desc0 = new LocalizedText(undefined, 'Low')
    const desc1 = new LocalizedText(undefined, 'Medium')
    const desc2 = new LocalizedText(undefined, 'High')
    const client = makeClient()
    injectServices(
      client,
      [
        makePropertyRef('Selections', SELECTIONS_NODE_ID),
        makePropertyRef('SelectionDescriptions', DESC_NODE_ID),
        makePropertyRef('RestrictToList', RESTRICT_NODE_ID),
      ],
      [
        makeVariantResult([10, 50, 100]),
        makeVariantResult([desc0, desc1, desc2]),
        makeVariantResult(true),
      ],
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: SelectionList | null = await (client as any).fetchSelectionList(SOME_NODE_ID)

    expect(result?.selections).toEqual([10, 50, 100])
    expect(result?.selectionDescriptions).toEqual([desc0, desc1, desc2])
    expect(result?.restrictToList).toBe(true)
  })

  it('returns the queried nodeId on the result', async () => {
    const client = makeClient()
    injectServices(
      client,
      [makePropertyRef('Selections', SELECTIONS_NODE_ID)],
      [makeVariantResult(['x'])],
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: SelectionList | null = await (client as any).fetchSelectionList(SOME_NODE_ID)

    expect(result?.nodeId).toBe(SOME_NODE_ID)
  })

  it('returns false for restrictToList when RestrictToList property is absent', async () => {
    const client = makeClient()
    injectServices(
      client,
      [makePropertyRef('Selections', SELECTIONS_NODE_ID)],
      [makeVariantResult(['only'])],
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: SelectionList | null = await (client as any).fetchSelectionList(SOME_NODE_ID)

    expect(result?.restrictToList).toBe(false)
  })

  it('ignores unrelated HasProperty references', async () => {
    const client = makeClient()
    injectServices(
      client,
      [
        makePropertyRef('UnrelatedProp', NodeId.newNumeric(2, 9999)),
        makePropertyRef('Selections', SELECTIONS_NODE_ID),
      ],
      [makeVariantResult(['val'])],
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: SelectionList | null = await (client as any).fetchSelectionList(SOME_NODE_ID)

    expect(result?.selections).toEqual(['val'])
  })

  it('throws when services are not initialised (not connected)', async () => {
    const client = makeClient()

    await expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (client as any).fetchSelectionList(SOME_NODE_ID),
    ).rejects.toThrow('Not connected')
  })
})
