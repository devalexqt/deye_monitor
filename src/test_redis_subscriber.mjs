import { createClient } from 'redis';

const client = createClient();
const subscriber = client.duplicate(); // Subscribers need a dedicated connection

await subscriber.connect();

await subscriber.subscribe('pi_sensors', (message) => {
    const data = JSON.parse(message);
    console.log(`Received Update:`, data);
});