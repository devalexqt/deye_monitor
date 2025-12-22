import redis
import time
import json
from helper import connect_to_modbus, read_value

_redis = redis.Redis(host='localhost', port=6379, decode_responses=True)

#master external
ip = "192.168.1.88" 
sn = 2955433426   # inverter=>   2405162005, logger => 2955433426
port = 8899
slave_id = 1

# Initialize connection
modbus = connect_to_modbus(ip, sn, port, slave_id)

while True:
    try:
        results=read_value(modbus,210,15)
        print(">>>>results:",results)
        # FIXME:  DO we need to parse result before pushing to DB/websocket???
        data = {"id":"master-id","bms": results, "ctime":int(time.time() * 1000)}
        _redis.publish('pi_sensors', json.dumps(data))
        time.sleep(5)
    except Exception as e:
            print(f"Error reading value from inverter: {e}")