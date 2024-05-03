from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

# This avoids circular imports by keeping MQTT setup inside a function
def initialize_mqtt():
    from app.mqqt_subscriber import setup_mqtt
    mqtt_client = setup_mqtt()

initialize_mqtt()

from app import views  # Import views at the end to avoid circular imports
