import { ConfigurationClient, Client, UserIdentity } from 'opcjs-client';
import { NodeId } from 'opcjs-base';

async function run() {
  console.log('Creating OPC UA Client...');

  const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
  const endpointUrl = 'wss://localhost:62542/Test/ReferenceServer/';
  const client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());
  await client.connect();
  console.log('Connected successfully!');

  const id = NodeId.newString(2, 'Scalar_Simulation_Double');
  const results = await client.read([id])
  for (let r of results) {
    console.log(r.status, r.value)
  }

  client.subscribe([id], (datas) => {
    for (let data of datas) {
      console.log('Subscription value received: ', data.id.toString(), data.value);
      document.querySelector('#currentValue').innerHTML = `${data.value}`;
    }
  })


}

run()