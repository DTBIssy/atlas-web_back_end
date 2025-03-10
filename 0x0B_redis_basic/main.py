#!/usr/bin/env python3
""" Main file """

Cache = __import__('exercise').Cache
replay = __import__('exercise').replay

cache = Cache()
cache.store("foo")
cache.store("bar")
cache.store(42)
replay(cache.store)

inputs = cache._redis.lrange("{}:inputs".format(cache.store.__qualname__), 0, -1)
outputs = cache._redis.lrange("{}:outputs".format(cache.store.__qualname__), 0, -1)

print("inputs: {}".format(inputs))
print("outputs: {}".format(outputs))
