/**
 * Unit tests for Variant.newFrom() covering every OPC UA built-in type.
 *
 * For each type we verify:
 *  - the returned Variant has the correct BuiltInType discriminant
 *  - the wrapped value is exactly the value that was passed in
 */

import { describe, expect, it } from 'vitest'

import { BuiltInType } from '../../src/types/builtinType.js'
import { DataValue } from '../../src/types/dataValue.js'
import { DiagnosticInfo } from '../../src/types/diagnosticInfo.js'
import { ExpandedNodeId } from '../../src/types/expandedNodeId.js'
import { ExtensionObject } from '../../src/types/extensionObject.js'
import { LocalizedText } from '../../src/types/localizedText.js'
import { NodeId } from '../../src/types/nodeId.js'
import {
  uaByte,
  uaDouble,
  uaFloat,
  uaGuid,
  uaInt16,
  uaInt32,
  uaInt64,
  uaSbyte,
  uaUint16,
  uaUint32,
  uaUint64,
} from '../../src/types/primitives.js'
import { QualifiedName } from '../../src/types/qualifiedName.js'
import { StatusCode } from '../../src/types/statusCode.js'
import { Variant } from '../../src/types/variant.js'
import { XmlElement } from '../../src/types/xmlElement.js'

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function expectVariant(v: Variant, expectedType: BuiltInType, expectedValue: unknown) {
  expect(v.type).toBe(expectedType)
  expect(v.value).toBe(expectedValue)
}

// ---------------------------------------------------------------------------
// Null / undefined
// ---------------------------------------------------------------------------

describe('Variant.newFrom - null / undefined', () => {
  it('null returns Null variant', () => {
    const v = Variant.newFrom(null)
    expect(v.type).toBe(BuiltInType.Null)
  })

  it('undefined returns Null variant', () => {
    const v = Variant.newFrom(undefined)
    expect(v.type).toBe(BuiltInType.Null)
  })
})

// ---------------------------------------------------------------------------
// Boolean  (BuiltInType 1)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - Boolean', () => {
  it('true', () => expectVariant(Variant.newFrom(true), BuiltInType.Boolean, true))
  it('false', () => expectVariant(Variant.newFrom(false), BuiltInType.Boolean, false))
})

// ---------------------------------------------------------------------------
// Numeric tagged primitives  (BuiltInTypes 2-11)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - tagged numeric primitives', () => {
  it('SByte', () => {
    const p = uaSbyte(-42)
    expectVariant(Variant.newFrom(p), BuiltInType.SByte, -42)
  })

  it('Byte', () => {
    const p = uaByte(255)
    expectVariant(Variant.newFrom(p), BuiltInType.Byte, 255)
  })

  it('Int16', () => {
    const p = uaInt16(-1000)
    expectVariant(Variant.newFrom(p), BuiltInType.Int16, -1000)
  })

  it('UInt16', () => {
    const p = uaUint16(65535)
    expectVariant(Variant.newFrom(p), BuiltInType.UInt16, 65535)
  })

  it('Int32', () => {
    const p = uaInt32(-100000)
    expectVariant(Variant.newFrom(p), BuiltInType.Int32, -100000)
  })

  it('UInt32', () => {
    const p = uaUint32(4294967295)
    expectVariant(Variant.newFrom(p), BuiltInType.UInt32, 4294967295)
  })

  it('Int64', () => {
    const p = uaInt64(-9007199254740991n)
    expectVariant(Variant.newFrom(p), BuiltInType.Int64, -9007199254740991n)
  })

  it('UInt64', () => {
    const p = uaUint64(18446744073709551615n)
    expectVariant(Variant.newFrom(p), BuiltInType.UInt64, 18446744073709551615n)
  })

  it('Float', () => {
    const p = uaFloat(3.14)
    expectVariant(Variant.newFrom(p), BuiltInType.Float, 3.14)
  })

  it('Double', () => {
    const p = uaDouble(2.718281828459045)
    expectVariant(Variant.newFrom(p), BuiltInType.Double, 2.718281828459045)
  })
})

// ---------------------------------------------------------------------------
// String  (BuiltInType 12)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - String', () => {
  it('regular string', () => expectVariant(Variant.newFrom('hello'), BuiltInType.String, 'hello'))
  it('empty string', () => expectVariant(Variant.newFrom(''), BuiltInType.String, ''))
  it('null string', () => {
    const v = Variant.newFrom(null)
    expect(v.type).toBe(BuiltInType.Null)
  })
})

// ---------------------------------------------------------------------------
// DateTime  (BuiltInType 13)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - DateTime', () => {
  it('Date instance', () => {
    const d = new Date('2026-03-19T00:00:00Z')
    expectVariant(Variant.newFrom(d), BuiltInType.DateTime, d)
  })
})

// ---------------------------------------------------------------------------
// Guid  (BuiltInType 14)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - Guid', () => {
  it('tagged guid', () => {
    const g = uaGuid('550e8400-e29b-41d4-a716-446655440000')
    expectVariant(Variant.newFrom(g), BuiltInType.Guid, '550e8400-e29b-41d4-a716-446655440000')
  })
})

// ---------------------------------------------------------------------------
// ByteString  (BuiltInType 15)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - ByteString', () => {
  it('Uint8Array', () => {
    const bytes = new Uint8Array([0xde, 0xad, 0xbe, 0xef])
    expectVariant(Variant.newFrom(bytes), BuiltInType.ByteString, bytes)
  })
})

// ---------------------------------------------------------------------------
// XmlElement  (BuiltInType 16)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - XmlElement', () => {
  it('XmlElement instance', () => {
    const xml = XmlElement.create('Tag', 'content')
    const v = Variant.newFrom(xml)
    expect(v.type).toBe(BuiltInType.XmlElement)
    expect(v.value).toBe(xml)
  })
})

// ---------------------------------------------------------------------------
// NodeId  (BuiltInType 17)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - NodeId', () => {
  it('numeric NodeId', () => {
    const id = NodeId.newNumeric(0, 2258)
    const v = Variant.newFrom(id)
    expect(v.type).toBe(BuiltInType.NodeId)
    expect(v.value).toBe(id)
  })

  it('string NodeId', () => {
    const id = NodeId.newString(2, 'Temperature')
    const v = Variant.newFrom(id)
    expect(v.type).toBe(BuiltInType.NodeId)
    expect(v.value).toBe(id)
  })
})

// ---------------------------------------------------------------------------
// ExpandedNodeId  (BuiltInType 18)
// ExpandedNodeId is no longer derived from NodeId (composition instead of
// inheritance), so a NodeId can never accidentally be typed as ExpandedNodeId.
// ---------------------------------------------------------------------------

describe('Variant.newFrom - ExpandedNodeId', () => {
  it('ExpandedNodeId is mapped to BuiltInType.ExpandedNodeId, not NodeId', () => {
    const id = new ExpandedNodeId(new NodeId(2, 123), 'http://opcfoundation.org/UA/', 0)
    const v = Variant.newFrom(id)
    expect(v.type).toBe(BuiltInType.ExpandedNodeId)
    expect(v.value).toBe(id)
  })

  it('ExpandedNodeId without namespace URI', () => {
    const id = new ExpandedNodeId(new NodeId(0, 84))
    const v = Variant.newFrom(id)
    expect(v.type).toBe(BuiltInType.ExpandedNodeId)
  })
})

// ---------------------------------------------------------------------------
// StatusCode  (BuiltInType 19)  – tagged wrapper
// ---------------------------------------------------------------------------

describe('Variant.newFrom - StatusCode (tagged)', () => {
  it('tagged StatusCode wrapper', () => {
    // StatusCode enum values are plain numbers at runtime; pass as a tagged object.
    const tagged = { type: BuiltInType.StatusCode, value: StatusCode.Good }
    const v = Variant.newFrom(tagged as Parameters<typeof Variant.newFrom>[0])
    expect(v.type).toBe(BuiltInType.StatusCode)
    expect(v.value).toBe(StatusCode.Good)
  })
})

// ---------------------------------------------------------------------------
// QualifiedName  (BuiltInType 20)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - QualifiedName', () => {
  it('QualifiedName instance', () => {
    const qn = new QualifiedName(2, 'BrowseName')
    const v = Variant.newFrom(qn)
    expect(v.type).toBe(BuiltInType.QualifiedName)
    expect(v.value).toBe(qn)
  })
})

// ---------------------------------------------------------------------------
// LocalizedText  (BuiltInType 21)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - LocalizedText', () => {
  it('LocalizedText instance', () => {
    const lt = new LocalizedText('en-US', 'Temperature Sensor')
    const v = Variant.newFrom(lt)
    expect(v.type).toBe(BuiltInType.LocalizedText)
    expect(v.value).toBe(lt)
  })
})

// ---------------------------------------------------------------------------
// ExtensionObject  (BuiltInType 22)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - ExtensionObject', () => {
  it('ExtensionObject instance', () => {
    const eo = ExtensionObject.newEmpty()
    const v = Variant.newFrom(eo)
    expect(v.type).toBe(BuiltInType.ExtensionObject)
    expect(v.value).toBe(eo)
  })
})

// ---------------------------------------------------------------------------
// DataValue  (BuiltInType 23)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - DataValue', () => {
  it('DataValue instance wrapping a Double variant', () => {
    const inner = new Variant(BuiltInType.Double, 3.14)
    const dv = new DataValue(inner, StatusCode.Good)
    const v = Variant.newFrom(dv)
    expect(v.type).toBe(BuiltInType.DataValue)
    expect(v.value).toBe(dv)
  })
})

// ---------------------------------------------------------------------------
// Variant  (BuiltInType 24) – nested variant
// ---------------------------------------------------------------------------

describe('Variant.newFrom - nested Variant', () => {
  it('wraps an existing Variant as BuiltInType.Variant', () => {
    const inner = new Variant(BuiltInType.Int32, 7)
    const outer = Variant.newFrom(inner)
    expect(outer.type).toBe(BuiltInType.Variant)
    expect(outer.value).toBe(inner)
  })
})

// ---------------------------------------------------------------------------
// DiagnosticInfo  (BuiltInType 25)
// ---------------------------------------------------------------------------

describe('Variant.newFrom - DiagnosticInfo', () => {
  it('DiagnosticInfo instance', () => {
    const di = new DiagnosticInfo({ additionalInfo: 'test' })
    const v = Variant.newFrom(di)
    expect(v.type).toBe(BuiltInType.DiagnosticInfo)
    expect(v.value).toBe(di)
  })
})

// ---------------------------------------------------------------------------
// Error path
// ---------------------------------------------------------------------------

describe('Variant.newFrom - error path', () => {
  it('throws for an unrecognised value', () => {
    const unknown: unknown = { someRandomField: 42 }
    expect(() =>
      Variant.newFrom(unknown as Parameters<typeof Variant.newFrom>[0]),
    ).toThrow(/unhandled/)
  })
})
