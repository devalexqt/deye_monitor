from pysolarmanv5 import PySolarmanV5
import json
import time
import os
import sys

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

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

# FIXME: we need convet all values from unsignedinto to int
# In Modbus, registers are 16-bit integers. When you see a value like 65451, it means you are looking at a negative number represented in "Two's Complement" notation.
# To get the real value, you need to tell Python to treat the 16-bit unsigned integer as a signed integer.
def handle_signed_value(raw_value, scaling=0.1):
    # Check if the number is greater than the max for a signed 16-bit int (32767)
    if raw_value > 32767:
        signed_value = raw_value - 65536
    else:
        signed_value = raw_value
    
    return signed_value * scaling

def parse_bms_total(input):
    # print(">>>input parse_bms_total:",input)

    result={
        "max_charge_voltage":round(int(input[0])*0.01,2),
        "max_discharge_voltage":round(int(input[1])*0.01,2),
        "max_charge_current":int(input[2]),
        "max_discharge_current":int(input[3]),

        "capacity":int(input[4]),
        "voltage":round(int(input[5])*0.01,2),
        "current":handle_signed_value(int(input[6]),1.0),
        "temparature":parse_temperature(input[7]),

        "max_charge_current":int(input[8]),
        "max_discharge_current":int(input[9]),        

        "battery_alarm_position":int(input[10]),
        "battery_fault_location":int(input[11]),        
        "battery_symbol":int(input[12]),
        "battery_type":int(input[13]),
        "battery_SOH":int(input[14]),
    }

    return result


def parse_temperature(value):
    return round((int(value)-1000)*0.1,2)

#[1162, 5099, 84, 0, 398, 776, 200, 0]
def parse_battery(input):
    # print("==>parse_battery:",input)
    result={
        "temperature":parse_temperature(int(input[0])),
        "voltage":round(int(input[1])*0.01,2),
        "capacity":int(input[2]),
        "power":int(input[4]),
        "current":round(int(input[5])*0.01,2),
        "corrected_ah":int(input[6]),     
    }
    return result

# [18, 0, 0, 0, 3923, 0, 1867, 0, 0, 0, 0, 0]
def parse_pv(input):
    # print("==>parse_pv:",input)
    result={
        "power_PV1":int(input[0]),        
        "power_PV2":int(input[1]),        
        "power_PV3":int(input[2]),        
        "power_PV4":int(input[3]),        

        "voltage_PV1":round(int(input[4])*0.1,2),        
        "current_PV1":round(int(input[5])*0.1,2),        

        "voltage_PV2":round(int(input[6])*0.1,2),        
        "current_PV3":round(int(input[7])*0.1,2),  

        "voltage_PV3":round(int(input[8])*0.1,2),        
        "current_PV3":round(int(input[9])*0.1,2),          

        "voltage_PV4":round(int(input[10])*0.1,2),        
        "current_PV4":round(int(input[11])*0.1,2),  
    }
    return result

# [2402, 2338, 2321, 0, 0, 0, 2441, 2431, 2431, 7303, 0, 5000, 1011, 1032, 1045, 29, 29, 28, 65530, 1, 5, 0, 0, 0, 2441, 2431, 2431, 7303]
def parse_grid(input):
    # print("==>parse_grid:",input)
    result={
        "grid_voltage_phase_A":round(int(input[0])*0.1,2),
        "grid_voltage_phase_B":round(int(input[1])*0.1,2),
        "grid_voltage_phase_C":round(int(input[2])*0.1,2),

        "gird_voltage_phase_AB":round(int(input[3])*0.1,2),
        "gird_voltage_phase_BC":round(int(input[4])*0.1,2),
        "gird_voltage_phase_AC":round(int(input[5])*0.1,2),

        "gird_power_phase_A":int(input[6]),
        "gird_power_phase_B":int(input[7]),
        "gird_power_phase_C":int(input[8]),
        "gird_power_total":int(input[9]),
        "gtid_power_total_inside":int(input[10]),

        "frequency":round(int(input[11])*0.01,2),

        "grid_side_inner_current_phase_A":round(int(input[12])*0.01,2),
        "grid_side_inner_current_phase_B":round(int(input[13])*0.01,2),
        "grid_side_inner_current_phase_C":round(int(input[14])*0.01,2),

        "grid_out_current_A":round(int(input[15])*0.01,2),
        "grid_out_current_B":round(int(input[16])*0.01,2),
        "grid_out_current_C":round(int(input[17])*0.01,2),        

        "grid_out_power_phase_A":int(input[18]),
        "grid_out_power_phase_B":int(input[19]),
        "grid_out_power_phase_C":int(input[20]),
        "grid_out_power_total":int(input[21]),
        "grid_out_power_total_VA":int(input[22]),

        "grid_power_factor":int(input[23]),

        "gird_power_phase_A_2":int(input[24]),
        "gird_power_phase_B_2":int(input[25]),
        "gird_power_phase_C_2":int(input[26]),
        "gird_power_total_2":int(input[27]),

    }
    return result    

#parse load data
# [2391, 2410, 2384, 0, 0, 0, 883, 211, 490, 1584, 1584, 5000]
def parse_load(input):
    # print("==>parse_load:",input)
    result={
        "voltage_phase_A":round(int(input[0])*0.1,2),        
        "voltage_phase_B":round(int(input[1])*0.1,2),        
        "voltage_phase_C":round(int(input[2])*0.1,2),        

        "current_phase_A":round(int(input[3])*0.01,2),        
        "current_phase_B":round(int(input[4])*0.01,2),        
        "current_phase_C":round(int(input[5])*0.01,2),        

        "power_phase_A":int(input[6]),        
        "power_phase_B":int(input[7]),        
        "power_phase_C":int(input[8]),        
        "power_total":int(input[9]),        
        "power_total_VA":int(input[10]),        
        "frequency":round(int(input[11])*0.01,2),        
    }
    return result

#parse generator data
# [5, 5, 2, 0, 0, 0, 0]
def parse_generator(input):
    # print("==>parse_generator:",input)
    result={
        "voltage_phase_A":round(int(input[0])*0.1,2),        
        "voltage_phase_B":round(int(input[1])*0.1,2),        
        "voltage_phase_C":round(int(input[2])*0.1,2),             

        "power_phase_A":int(input[3]),        
        "power_phase_B":int(input[4]),        
        "power_phase_C":int(input[5]),        
        "power_total":int(input[6]),        
    }
    return result



# read data from inverter registers
def read_inverter_data(inverter):
        modbus=inverter["modbus"]
        result={
                "id":inverter["id"],
                "name":inverter["name"],
                "ctime":int(time.time() * 1000),
                "type":"live-stats",
            }

        #Read BMS total data
        result["bms_sum"] =  parse_bms_total(read_value(modbus,210,225-210+1))#15

        #read inverter-level batt power
        result["battery"] =  parse_battery(read_value(modbus,586,7))

        #read inverter-level PV generation energy  
        result["pv"] =  parse_pv(read_value(modbus,672,683-672+1))

        #read grid side data
        result["grid"] =  parse_grid(read_value(modbus,598,625-598+1))

        #read load side data
        result["load"] =  parse_load(read_value(modbus,644,655-644+1))

        #read generator data     
        result["generator"] =  parse_generator(read_value(modbus,661,667-661+1))

        return result