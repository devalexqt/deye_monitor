const { MongoClient } = require('mongodb');

// FerretDB listens on the standard Mongo port 27017
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main(){
	await client.connect();
	console.log('Successfully connected to FerretDB!');


        const db = client.db('pi_database');
        const collection = db.collection('logs');

        // Insert a test document
        await collection.insertOne({ 
            device: "Raspberry Pi", 
            status: "active", 
            timestamp: new Date() 
        });
	
	console.log("===================== DONE ===================\n")
}//main


main()
