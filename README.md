# Monitoring Deye inverters
Monitoring deye inverters remotely.

## Requirements
As databes we use `ferretdb` v.1.24 adapter with `SQLite` backend , db path: `/opt/production/DB/`
Node.js v.24
Python 3.12

## Activate python virtual env
```
#create new env
cd /root/dev/deye_monitor/src/python
python3 -m venv ./env_deye

#activate new env
source env_deye/bin/activate
```