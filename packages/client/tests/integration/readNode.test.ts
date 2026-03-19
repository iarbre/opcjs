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
import { NodeId } from 'opcjs-base';

describe('readNode', () => {
    it('readNode', async () => {
        const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';
        const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
        const client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());

        try {
            await client.connect();
        } catch (err) {
            console.error('Failed to connect to the OPC UA server:', err);
            throw err; // Rethrow the error to fail the test
        }
        console.log('Connected successfully!');

        const results = await client.read([NodeId.newString(2, 'Scalar_Simulation_Double')])

        // Check that we got one result
        expect(results).toHaveLength(1);
        // Check that the result is a Variant
        expect(results[0]).toHaveProperty('value');
        // Check that the StatusCode is good (0 = Good)
        expect(results[0].status).toBeDefined();
        expect(results[0].status).toContain("Good");
    });

    it('subscribe', async () => {
        const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';
        const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
        const client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());

        await client.connect();
        console.log('Connected successfully!');

        const receivedDatas = await new Promise((resolve) => {
            client.subscribe([NodeId.newString(2, 'Scalar_Simulation_Double')], (datas) => {
                resolve(datas)
            })
        }) as {
            id: NodeId;
            value: unknown;
        }[];

        expect(receivedDatas).toHaveLength(1);
        const receivedData = receivedDatas[0];
        expect(receivedData).toHaveProperty('value');
        expect(receivedData).toHaveProperty('id');
        expect(receivedData.id).toEqual(NodeId.newString(2, 'Scalar_Simulation_Double'));
        expect(typeof receivedData.value).toBe('number');
    });
});
