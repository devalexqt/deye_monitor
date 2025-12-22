import { createClient } from 'redis';

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

await client.connect();
await client.set('pi_status', 'active');
const value = await client.get('pi_status');
console.log("==>test result:",value); // Output: active