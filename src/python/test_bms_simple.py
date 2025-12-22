print(f"==>Starting scriapt for change inverter current ....")
from pysolarmanv5 import PySolarmanV5
import time

#master external
ip = "192.168.1.88" 
sn = 2955433426   # inverter=>   2405162005, logger => 2955433426
port = 8899
slave_id = 1

# Initialize connection
modbus = PySolarmanV5(ip, sn, port=port, slave_id=slave_id, auto_reconnect=True, verbose=False)
register_addr=128 # 128 --> Grid charge the battery current 1A 
quantity=1

#read value from register
def read_value(register_addr=128,quantity=1):
    results = modbus.read_holding_registers(register_addr=register_addr, quantity=quantity)#3
    return results

results=read_value(210,15)
print(">>>>results:",results)
# FIXME:  DO we need to parse result before pushing to DB/websocket???


#registers per invertor data
# 586 --> battery temperature 
# 587 --> battery voltage 
# 588 --> battery capacity
# 589 --> undefined
# 590 --> Battery output power 
# 591 --> Battery output current 
# 592 --> Corrected_AH
# [1161, 5105, 85, 0, 1478, 2893, 200, 0, 0, 0]

#registers BMS data
# <start BMS section>
# 210 --> bms charge voltage (max voltage) *0.01V
# 211 --> bms discharge voltage (min voltage) *0.01V
# 212 --> bms charging current limiting *1A
# 213 --> bms Discharge current limiting *1A
# 214 --> bms real time Capacity  *1%
# 215 --> bms real time voltage *0.01V
# 216 --> real time current *1A
# 217 --> real time temp  (offset 1000, 800 --> -20| 1200 --> +20, ) *0.1C
# 218 --> BMS Maximum charge current limit *1A
# 219 --> BMS Maximum discharge current limiting *!A
# 220 --> Lithium battery alarm position
# 221 --> Lithium battery fault location 
# 222 --> Lithium battery symbol 2
# 223 --> Lithium battery type (Pulontech, deye, solax, etc...)
# 224 --> Lithium battery SOH
# <end BMS section>

# [5325, 4500, 1180, 1940, 87, 5073, 39, 1162, 1200, 1960, 0, 0, 0, 12, 0]

