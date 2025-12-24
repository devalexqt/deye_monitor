import { createClient } from 'redis'
import INVERTERS from "./inverters.json" with { type: 'json' }
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import fs from 'fs'
import https from "https"

const app = express()
const port = 80

console.log(">>>INVERTERS:",INVERTERS) 

//It will expire on 24 March 2028 (ip address ssl)
const options_ssl = {
  key: fs.readFileSync('/opt/production/ssl/192.168.1.95+1-key.pem'),
  cert: fs.readFileSync('/opt/production/ssl/192.168.1.95+1.pem'),
}

app.use(cors({
  origin: '*', // Only allow this specific domain
  methods: ['GET', 'POST',"HEAD","OPTIONS"],            // Only allow these methods
  optionsSuccessStatus: 200            // For legacy browser support
}))
app.use(morgan('dev'))
app.use(helmet())
// Middleware to parse JSON bodies
app.use(express.json())
app.use(express.static('/opt/production/www'))
// app.use("/assets",express.static('/opt/production/www/assets'))
app.use('/assets', express.static('/opt/production/www/assets'))
// 1. Basic Home Route
app.get('/', (req, res) => {
  res.send('<h1>Simple local Deye inverter monitoring</h1>')
})


app.get('/api/sse', async (req, res) => {
    // 1. Set SSE Headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const client = createClient()
    const subscriber = client.duplicate(); // Subscribers need a dedicated connection
    await subscriber.connect()

    //subscribe to all inverters channel
    for(const inverter of INVERTERS){
        const channel=`${inverter.id}-live-stats`
        await subscriber.subscribe(channel, (message) => {
            const data = JSON.parse(message);
            // console.log(`==>received message from '${channel}':`, data);
            res.write(`data: ${JSON.stringify(data)}\n\n`); // Must end with \n\n   
        })
    }//for

    // 3. Clean up when client disconnects
    req.on('close',async () => {
        res.end()
        try{await client.quit()}catch(err){console.log(err)}
    })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

https.createServer(options_ssl, app).listen(443, () => {
  console.log('HTTPS Server running on https://192.168.1.95...');
});