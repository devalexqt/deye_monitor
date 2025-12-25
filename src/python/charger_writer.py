print(f"==>Starting scriapt for change inverter current ....")
from pysolarmanv5 import PySolarmanV5
import time

def get_battery_soc():
    # Inverter/Logger Settings
    # 1. IP of the logger (found in previous step)
    # 2. Serial Number of the logger (found on the stick sticker)
    # 3. Port: 8899 is the default for Solarman sticks
    # 4. Slave ID: Usually 1
    
#TODO: grid charger READ FROM LOCAL NETWORK OR EXTERNAL NETWORK!!!!
    ip = "192.168.2.237" 
    sn = 3100508095   # inverter=>   2405162005, logger => 2955433426
    port = 8899
    slave_id = 0

    # Initialize connection
    modbus = PySolarmanV5(ip, sn, port=port, slave_id=slave_id, auto_reconnect=True, verbose=False)
    register_addr=128 # 128 --> Grid charge the battery current 1A 
    quantity=1

    min_current=145# minimal charge current
    max_current=240# 240A maximal charge current

    #read value from register
    def read_value():
        results = modbus.read_holding_registers(register_addr=register_addr, quantity=quantity)#3
        print(f"==>read result:",results)
        return results[0]

    def write_value(value):
        # value=145 # min 145, max 240 
        results = modbus.write_multiple_holding_registers(register_addr=register_addr, values=[value])
        print(f"==>write result:",results)# must be: 1
        return results

    #get initial value
    initial_value=read_value()
    print(">>>current initial_value:",initial_value)

    #mail loop for read and write to the inverter
    while True:
        print(">>>loop_main()...")
        # time.sleep(10)# 5 sec wait

        try:
            # val_readed=read_value()
            # print(">>>val_readed:",val_readed)
            #if val<max ....

            # time.sleep(10)# sec wait
            print(">>>write max value....")
            result_write=write_value(max_current)
            print(">>>write max current result:",result_write)

            #if result==1
            time.sleep(110)
            print(">>>write min value....")
            result_write=write_value(min_current)
            print(">>>write min current result:",result_write)
            time.sleep(10)

            # grid charger 145

            #write
            #FIXME: dengerus

            # modbus.disconnect()
            # return results

        except Exception as e:
            print(f"Error connecting to inverter: {e}")



  

if __name__ == "__main__":
    get_battery_soc()