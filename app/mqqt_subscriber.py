import paho.mqtt.client as mqtt
from app import socketio, app  # Importing here after initialization
import json

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("raspberrypi/sensors")

def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload.decode('utf-8')))
    data_string = msg.payload.decode('utf-8')
    try:
        parts = {part.split(": ")[0].strip(): float(part.split(": ")[1].strip()) for part in data_string.split(", ")}
        data = {
            'temperature': parts['Temperature'],
            'humidity': parts['Humidity'],
            'distance': parts['Distance'],
            'waterLevel': parts['Water Level'],
            'timestamp': int(parts['MID']),
        }
        with app.app_context():
            print(f"Emitting sensor_update: {data}")
            socketio.emit('sensor_update', data)
    except Exception as e:
        print(f"Error parsing MQTT data: {e}")
        print(f"Received: {data_string}")
        print(f"Parts dict: {parts if 'parts' in locals() else 'Failed to parse'}")


def setup_mqtt():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect("127.0.0.1", 1883, 60)
    client.loop_start()
    return client