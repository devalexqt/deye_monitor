from pymongo import MongoClient

# 1. Setup the connection string
# Use '127.0.0.1' instead of 'localhost' to avoid IPv6 resolution delays on Ubuntu
uri = "mongodb://127.0.0.1:27017/"

# 2. Create the client
client = MongoClient(uri)

try:
    # 3. Send a ping to confirm a successful connection
    client.admin.command('ping')
    print("✅ Successfully connected to MongoDB/FerretDB!")
    
    # 4. Access a database and collection
    db = client["sensor_db"]
    collection = db["readings"]

    # 5. Insert and find a document
    collection.insert_one({"sensor": "RPi_Temp", "value": 42.5})
    print("Found document:", collection.find_one({"sensor": "RPi_Temp"}))

except Exception as e:
    print(f"❌ Connection failed: {e}")

finally:
    client.close()
    print("====================== DONE ========================")