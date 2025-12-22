from pysolarmanv5 import PySolarmanV5


# connect to modbus 
def connect_to_modbus(ip,sn, port, slave_id):
    return PySolarmanV5(ip, sn, port=port, slave_id=slave_id, auto_reconnect=True, verbose=False)# 

#read value from modbus register
def read_value(modbus=None,register_addr=128,quantity=1):
    results = modbus.read_holding_registers(register_addr=register_addr, quantity=quantity)#3
    return results


# write value to modbus register
def write_value(modbus=None, register_addr=1000000000000,value=111111111111111111):
    results = modbus.write_multiple_holding_registers(register_addr=register_addr, values=[value])
    return results