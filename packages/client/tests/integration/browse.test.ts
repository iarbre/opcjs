/**
 * Integration tests – browse nodes on the OPC UA ConsoleReferenceServer.
 *
 * The server is started automatically by the global setup (globalSetup.ts)
 * before Vitest executes any test in this suite.
 */

import { describe, expect, it } from 'vitest';
import { Client } from '../../src/client.js';
import { ConfigurationClient } from '../../src/configuration/configurationClient.js';
import { UserIdentity } from '../../src/userIdentity.js';
import { NodeId } from 'opcjs-base';

describe('browse', () => {
  it('browseRootNode', async () => {
    const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';
    const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
    const client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());

    await client.connect();

    // Browse the Root folder (i=84)
    const results = await client.browse(NodeId.newNumeric(0, 84));

    // Root should have Objects (i=85), Types (i=86), Views (i=87)
    expect(results.length).toBeGreaterThanOrEqual(3);

    const displayNames = results.map(r => r.displayName.text);
    expect(displayNames).toContain('Objects');
    expect(displayNames).toContain('Types');
    expect(displayNames).toContain('Views');
  });

  it('browseRecursive', async () => {
    const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';
    const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
    const client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());

    await client.connect();

    // Browse the Types folder (i=86) recursively
    const results = await client.browse(NodeId.newNumeric(0, 86), true);

    // Recursive browse should return many more nodes than the direct children
    expect(results.length).toBeGreaterThan(10);
  });

  it('browseLeafNode', async () => {
    const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';
    const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
    const client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());

    await client.connect();

    // Browse a scalar simulation variable (leaf node, no children expected)
    const results = await client.browse(
      NodeId.newString(2, 'Scalar_Simulation_Double')
    );

    // A variable node may have children (e.g. properties) but shouldn't
    // throw an error. Accept any result including empty.
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
  });
});
