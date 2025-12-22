import redis

# Connect to local Redis
r = redis.Redis(host='127.0.0.1', port=6379, decode_responses=True)

r.set('pi_status', 'running')
print("==>test result read-write:",r.get('pi_status')) # Output: running