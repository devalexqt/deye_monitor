import redis
import time
import json
from helper import connect_to_modbus, read_inverter_data,resource_path

_redis = redis.Redis(host='localhost', port=6379, decode_responses=True)
INVERTERS=[]#list of inverters

#import config inverters (file must be in script folder!!!!)
with open(resource_path("./inverters.json"), "r") as f:
   INVERTERS = json.load(f)

print(">>INVERTERS:",json.dumps(INVERTERS))


#connect to all inverter:
for inverter in INVERTERS:
     inverter["modbus"]=connect_to_modbus(inverter["ip"], inverter["sn"], inverter["port"], inverter["slave_id"])

#infinity loop
while True:
    for inverter in INVERTERS:
        try:        
            data=read_inverter_data(inverter)
            # print(">>>inverter data:",data)
            _redis.publish(f'{inverter["id"]}-live-stats', json.dumps(data))
        except Exception as e:
                print(f"Error reading value from inverter: {e}")
    
    #wait in seconds...                
    time.sleep(10)

