/**
 * Integration tests – read a node from the OPC UA ConsoleReferenceServer.
 *
 * The server is started automatically by the global setup (globalSetup.ts)
 * before Vitest executes any test in this suite.
 */

import { describe, expect, it } from 'vitest';
import { Client } from '../../src/client.js';
import { ConfigurationClient } from '../../src/configurationClient.js';
import { UserIdentity } from '../../src/userIdentity.js';
import { NodeId, StatusCode, uaFloat, uaUint32 } from 'opcjs-base';

const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';
const methodsObject = NodeId.newString(2, "Methods");

function makeClient(): Client {
    return new Client(endpointUrl, ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos'), UserIdentity.newAnonymous());
}

describe('callMethod', () => {
    it('call', async () => {
        const client = makeClient();
        await client.connect();

        const result = await client.callMethod(
            methodsObject,
            NodeId.newString(2, "Methods_Add"),
            [uaFloat(1), uaUint32(2)]);

        expect(result.statusCode).toBe(StatusCode.Good);
        expect(result.values.length).toBe(1);
        expect(result.values[0]).toBe(3);
    });

    it('HashStringToMd5 returns MD5 hash of input string as ByteString', async () => {
        const client = makeClient();
        await client.connect();

        // MD5("hello") = 5d41402abc4b2a76b9719d911017c592
        const expectedBytes = new Uint8Array([93, 65, 64, 42, 188, 75, 42, 118, 185, 113, 157, 145, 16, 23, 197, 146]);

        const result = await client.callMethod(
            methodsObject,
            NodeId.newString(2, "Methods_HashStringToMd5"),
            ["hello"]);

        expect(result.statusCode).toBe(StatusCode.Good);
        expect(result.values.length).toBe(1);
        expect(result.values[0]).toBeInstanceOf(Uint8Array);
        expect(result.values[0]).toEqual(expectedBytes);
    });

    it('Md5HashToHex converts MD5 ByteString to lowercase hex string', async () => {
        const client = makeClient();
        await client.connect();

        // MD5("hello") as bytes → "5d41402abc4b2a76b9719d911017c592"
        const md5Bytes = new Uint8Array([93, 65, 64, 42, 188, 75, 42, 118, 185, 113, 157, 145, 16, 23, 197, 146]);

        const result = await client.callMethod(
            methodsObject,
            NodeId.newString(2, "Methods_Md5HashToHex"),
            [md5Bytes]);

        expect(result.statusCode).toBe(StatusCode.Good);
        expect(result.values.length).toBe(1);
        expect(result.values[0]).toBe("5d41402abc4b2a76b9719d911017c592");
    });

    it('HexToBytes converts hex string back to ByteString', async () => {
        const client = makeClient();
        await client.connect();

        const expectedBytes = new Uint8Array([93, 65, 64, 42, 188, 75, 42, 118, 185, 113, 157, 145, 16, 23, 197, 146]);

        const result = await client.callMethod(
            methodsObject,
            NodeId.newString(2, "Methods_HexToBytes"),
            ["5d41402abc4b2a76b9719d911017c592"]);

        expect(result.statusCode).toBe(StatusCode.Good);
        expect(result.values.length).toBe(1);
        expect(result.values[0]).toBeInstanceOf(Uint8Array);
        expect(result.values[0]).toEqual(expectedBytes);
    });

    it('round-trip: HashStringToMd5 → Md5HashToHex → HexToBytes reproduces original hash', async () => {
        const client = makeClient();
        await client.connect();

        // Step 1: String → MD5 ByteString
        const hashResult = await client.callMethod(
            methodsObject,
            NodeId.newString(2, "Methods_HashStringToMd5"),
            ["hello"]);
        expect(hashResult.statusCode).toBe(StatusCode.Good);
        const md5Bytes = hashResult.values[0] as Uint8Array;

        // Step 2: MD5 ByteString → hex String
        const hexResult = await client.callMethod(
            methodsObject,
            NodeId.newString(2, "Methods_Md5HashToHex"),
            [md5Bytes]);
        expect(hexResult.statusCode).toBe(StatusCode.Good);
        const hexString = hexResult.values[0] as string;
        expect(hexString).toBe("5d41402abc4b2a76b9719d911017c592");

        // Step 3: hex String → ByteString (round-trip back)
        const backResult = await client.callMethod(
            methodsObject,
            NodeId.newString(2, "Methods_HexToBytes"),
            [hexString]);
        expect(backResult.statusCode).toBe(StatusCode.Good);
        expect(backResult.values[0]).toEqual(md5Bytes);
    });

    it('EchoByteString round-trips a large payload (> 66000 bytes) correctly', async () => {
        // A payload this size forces the secure channel to split the message into
        // multiple MSG chunks before sending.  The test verifies that chunking on
        // the write path and chunk-reassembly on the read path both work correctly.
        const SIZE = 70_000
        const client = makeClient()
        await client.connect()

        const payload = new Uint8Array(SIZE)
        for (let i = 0; i < SIZE; i++) {
            payload[i] = i & 0xff
        }

        const result = await client.callMethod(
            methodsObject,
            NodeId.newString(2, 'Methods_EchoByteString'),
            [payload])

        expect(result.statusCode).toBe(StatusCode.Good)
        expect(result.values.length).toBe(1)
        expect(result.values[0]).toBeInstanceOf(Uint8Array)
        expect((result.values[0] as Uint8Array).byteLength).toBe(SIZE)
        expect(result.values[0]).toEqual(payload)
    })
})
