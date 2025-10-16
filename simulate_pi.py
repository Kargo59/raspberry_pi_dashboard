import time
import paho.mqtt.client as mqtt
import random

# MQTT settings
broker = 'localhost'
port = 1883
topic = "raspberrypi/sensors"

def on_publish(client, userdata, result):
    print(f"Message published to topic {topic}")

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.on_publish = on_publish
client.connect(broker, port)
client.loop_start()

# Start with some base values
temperature = 22.0          # °C — room temperature
humidity = 45.0             # % — indoor humidity
distance = 20.0             # cm — parking sensor (lower = occupied)
water_level = 15.0          # cm — water jug level

# Direction flags (for smooth oscillation)
temp_increasing = True
humidity_increasing = True
distance_increasing = False
wl_increasing = True

message_id = 0

try:
    while True:
        # Simulate temperature (fluctuates between 18–26°C)
        if temp_increasing:
            temperature += random.uniform(0.2, 0.8)
            if temperature >= 26:
                temp_increasing = False
        else:
            temperature -= random.uniform(0.2, 0.8)
            if temperature <= 18:
                temp_increasing = True

        # Simulate humidity (fluctuates between 30–60%)
        if humidity_increasing:
            humidity += random.uniform(0.5, 1.5)
            if humidity >= 60:
                humidity_increasing = False
        else:
            humidity -= random.uniform(0.5, 1.5)
            if humidity <= 30:
                humidity_increasing = True

        # Simulate parking distance sensor (fluctuates between 5–25 cm)
        if distance_increasing:
            distance += random.uniform(0.5, 1.5)
            if distance >= 25:
                distance_increasing = False
        else:
            distance -= random.uniform(0.5, 1.5)
            if distance <= 5:
                distance_increasing = True

        # Simulate water level (fluctuates between 10–25 cm)
        if wl_increasing:
            water_level += random.uniform(0.3, 0.8)
            if water_level >= 25:
                wl_increasing = False
        else:
            water_level -= random.uniform(0.3, 0.8)
            if water_level <= 10:
                wl_increasing = True

        message_id += 1

        # Send payload in format your subscriber expects
        data = (
            f"Temperature: {temperature:.2f}, "
            f"Humidity: {humidity:.2f}, "
            f"Distance: {distance:.2f}, "
            f"Water Level: {water_level:.2f}, "
            f"MID: {message_id}"
        )

        result, mid = client.publish(topic, data)
        print(f"Sent data: {data}")

        time.sleep(5)

except KeyboardInterrupt:
    print("Simulation stopped by user.")
    client.disconnect()
    client.loop_stop()