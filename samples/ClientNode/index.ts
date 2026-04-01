

import { Client, ConfigurationClient, UserIdentity } from 'opcjs-client';
import { NodeId } from 'opcjs-base';

const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';

let client: Client | null = null;

async function shutdown(): Promise<void> {
  console.log('\nShutting down gracefully...');
  if (client) {
    try {
      await client.disconnect();
      console.log('Disconnected successfully!');
    } catch (error) {
      console.error('Error during disconnect:', error);
    }
  }
  process.exit(0);
}

// Handle termination signals
process.on('SIGINT', shutdown);  // Ctrl+C
process.on('SIGTERM', shutdown); // Kill command

async function main(): Promise<void> {

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.log('Creating OPC UA Client...');

  const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
  // client = new Client(endpointUrl, configuration, UserIdentity.newWithUserName('sysadmin', 'demo'));
  client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());

  try {
    await client.connect();
    console.log('Connected successfully!');
    const id = NodeId.newString(2, 'Scalar_Simulation_Double');
    const results = await client.read([id])
    for (let r of results) {
      console.log(r.statusCode, r.value)
    }

    // client.subscribe([Id.newId(2, 'Scalar_Simulation_Double')], (datas) => {
    //   for (let data of datas) {
    //     console.log('Subscription value received: ', data.id.toString(), data.value);
    //   }
    // })

    console.log('Press Ctrl+C to disconnect and exit...');

    // Keep the process alive to receive messages
    await new Promise(() => { }); // Never resolves, keeps process running

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Error:', error);
    }
    process.exit(1);
  }
}

main().catch(console.error);
