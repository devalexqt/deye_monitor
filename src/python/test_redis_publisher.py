import redis
import time
import json

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

while True:
    data = {"temp": 24.5, "status": "OK"}
    # Convert dict to string for transmission
    r.publish('pi_sensors', json.dumps(data))
    print(f"Published: {data}")
    time.sleep(3)