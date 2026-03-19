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
import { NodeId, uaFloat, uaUint32 } from 'opcjs-base';

describe('callMethod', () => {
    it('call', async () => {
        const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';
        const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
        const client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());

        await client.connect();
        console.log('Connected successfully!');

        const results = await client.callMethod(
            NodeId.newString(2, "Methods"), 
            NodeId.newString(2, "Methods_Add"),
            [uaFloat(1), uaUint32(2)]);

        // Check that we got one result
        const result = results;;
        //expect(results).toHaveLength(1);

        // Check that the StatusCode is good (0 = Good)
        expect(result.status).toBeDefined();
        expect(result.status).toContain("Good");

        // Check that the result is correct
        expect(result).toHaveProperty('values');
        expect(result.values.length).toBe(1);
        expect(result.values[0]).toBe(3);
    });
});
