# Monitoring Deye inverters
Monitoring deye inverters remotely.
This "Global service" include: webserver, python deye registers reader, redis (for pub/sub comunication), database.
For dev I used `vite` fast bundler.
To serve I used self signed `SSL` cert for IP address.

```
# VIte dev server
http://192.168.1.88:8080/
npm run dev

```

## local IP address SSL certificate
To serve https from local ip address we need to generate cert localy:
```
# Install:
apt update
apt install mkcert
mkcert -install
mkcert 192.168.1.95 localhost  # Replace with your computer's local IP
```

## Requirements
As databes we use `ferretdb` v.1.24 adapter with `SQLite` backend , db path: `/opt/production/DB/`
Node.js v.24
Python 3.12

## Bundle python code sto single file
pyinstaller --onefile --clean main.py

## Activate python virtual env
```
#create new env
cd /root/dev/deye_monitor/src/python
python3 -m venv ./env_deye

#activate new env
source env_deye/bin/activate
```


## webserver
To run webserver:
```
cd /root/dev/deye_monitor/src
npm run start

```
## dev webserver
To run dev webserver run:
```
cd /root/dev/deye_monitor/www/monitoring
npm run dev
```


### EXAMPLE inverter output
```
{
    "id": "master-id",
    "name": "Master",
    "ctime": 1766449500236,
    "type": "live-stats",
    "bms_sum": {
        "max_charge_voltage": 53.25,
        "max_discharge_voltage": 45,
        "max_charge_current": 1300,
        "max_discharge_current": 1980,
        "capacity": 80,
        "voltage": 50.1,
        "current": 109,
        "temparature": 16.7,
        "battery_alarm_position": 0,
        "battery_fault_location": 0,
        "battery_symbol": 0,
        "battery_type": 12,
        "battery_SOH": 0
    },
    "battery": {
        "temperature": 16.7,
        "voltage": 50.37,
        "capacity": 80,
        "power": 1694,
        "current": 33.81,
        "corrected_ah": 200
    },
    "pv": {
        "power_PV1": 0,
        "power_PV2": 0,
        "power_PV3": 0,
        "power_PV4": 0,
        "voltage_PV1": 36.3,
        "current_PV1": 0,
        "voltage_PV2": 6.5,
        "current_PV3": 0,
        "voltage_PV3": 0,
        "voltage_PV4": 0,
        "current_PV4": 0
    },
    "grid": {
        "grid_voltage_phase_A": 0,
        "grid_voltage_phase_B": 0,
        "grid_voltage_phase_C": 0,
        "gird_voltage_phase_AB": 0,
        "gird_voltage_phase_BC": 0,
        "gird_voltage_phase_AC": 0,
        "gird_power_phase_A": 0,
        "gird_power_phase_B": 0,
        "gird_power_phase_C": 0,
        "gird_power_total": 0,
        "gtid_power_total_inside": 0,
        "frequency": 0,
        "grid_side_inner_current_phase_A": 0,
        "grid_side_inner_current_phase_B": 0,
        "grid_side_inner_current_phase_C": 0.01,
        "grid_out_current_A": 0.04,
        "grid_out_current_B": 0.03,
        "grid_out_current_C": 0.05,
        "grid_out_power_phase_A": 0,
        "grid_out_power_phase_B": 0,
        "grid_out_power_phase_C": 0,
        "grid_out_power_total": 0,
        "grid_out_power_total_VA": 0,
        "grid_power_factor": 65535,
        "gird_power_phase_A_2": 0,
        "gird_power_phase_B_2": 0,
        "gird_power_phase_C_2": 0,
        "gird_power_total_2": 0
    },
    "load": {
        "voltage_phase_A": 239.5,
        "voltage_phase_B": 240.7,
        "voltage_phase_C": 239.2,
        "current_phase_A": 0,
        "current_phase_B": 0,
        "current_phase_C": 0,
        "power_phase_A": 870,
        "power_phase_B": 240,
        "power_phase_C": 508,
        "power_total": 1618,
        "power_total_VA": 1618,
        "frequency": 50
    },
    "generator": {
        "voltage_phase_A": 0.5,
        "voltage_phase_B": 0.4,
        "voltage_phase_C": 0.3,
        "power_phase_A": 0,
        "power_phase_B": 0,
        "power_phase_C": 0,
        "power_total": 0
    }
}
```