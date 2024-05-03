import time
import paho.mqtt.client as mqtt
import random

# MQTT settings
broker = 'localhost'
port = 1883
topic = "raspberrypi/sensors"

def on_publish(client, userdata, result):
    print(f"Message published to topic {topic}")

# Create an MQTT client
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.on_publish = on_publish

# Connect to the MQTT broker
client.connect(broker, port)

# Start the network loop
client.loop_start()

waterLevel = 0
increasing = True  # Direction flag for water level

try:
    while True:
        # Simulate sensor data
        temperature = random.uniform(20.0, 25.0)
        humidity = random.uniform(40.0, 60.0)
        distance = random.uniform(0.0, 40.0)
        
        # Oscillating water level logic
        if increasing:
            waterLevel += 1
            if waterLevel >= 20:
                increasing = False
        else:
            waterLevel -= 1
            if waterLevel <= 0:
                increasing = True

        timestamp = int(time.time())  # UNIX timestamp as a simple 'mid'
        data = f"Temperature: {temperature:.2f}, Humidity: {humidity:.2f}, Distance: {distance:.2f}, Water Level: {waterLevel}, MID: {timestamp}"
        result, mid = client.publish(topic, data)
        
        print(f"Sent data: {data}, result: {result}, mid: {mid}")

        time.sleep(5)  # Send data every 5 seconds

except KeyboardInterrupt:
    print("Simulation stopped by user.")
    client.disconnect()
    client.loop_stop()
