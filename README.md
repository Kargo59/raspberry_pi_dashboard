# Real-Time Sensor Visualization Dashboard

An interactive educational platform designed to show students how IoT sensors work and how real-time data can be visualized. This project demonstrates a complete pipeline from sensor emiting data through MQTT messaging to live web-based visualization. Originally developed with a Raspberry Pi using distance and moisture sensors, this version includes a data simulator for easier demonstration and testing.

## Project Overview

This system consists of three main components working together:

- **MQTT Simulator** (`simulate.py`): Generates sensor data (temperature, humidity, distance, water level). It can easily be replaced with a real MQTT publisher, for example running on a Raspberry Pi connected to physical sensors.
- **MQTT Subscriber** (`mqtt_subscriber.py`): Receives sensor data and broadcasts it via WebSocket
- **Flask Web App**: Real-time dashboard that visualizes incoming sensor data with interactive SVG components

### Use Case: Educational Demo

Perfect for teaching students:
- How IoT sensors capture real-world data
- MQTT protocol for device-to-server communication
- Real-time data visualization in web applications
- System architecture and integration

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kargo59/dash-dashboard.git
   cd <your-folder-name>
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Install and start MQTT broker (Mosquitto):**

   **Linux/Mac:**
   ```bash
   brew install mosquitto
   mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
   ```

   **Windows:**
   Download from [mosquitto.org](https://mosquitto.org/download/)

## Usage

### 1. Start the MQTT Broker
```bash
mosquitto
```

### 2. Start the Flask Application
```bash
python app.py
```
The dashboard will be available at `http://localhost:5000`

### 3. Run the MQTT Simulator (in a new terminal)
```bash
python simulate.py
```

You should see data flowing through:
- Simulator prints: `Sent data: Temperature: 23.45, Humidity: 51.23, ...`
- Subscriber prints: `Emitting sensor_update: {...}`
- Dashboard updates in real-time

## How It Works

```
┌─────────────────┐
│  MQTT Simulator │ → generates sensor data
└────────┬────────┘
         │ (publishes)
         ↓
┌─────────────────┐
│  MQTT Broker    │ → distributes messages
└────────┬────────┘
         │ (subscribes)
         ↓
┌─────────────────┐
│  MQTT Subscriber│ → receives & transforms data
└────────┬────────┘
         │ (WebSocket)
         ↓
┌─────────────────┐
│  Flask App      │ → broadcasts to clients
└────────┬────────┘
         │ (SocketIO)
         ↓
┌─────────────────┐
│  Web Dashboard  │ → visualizes in real-time
└─────────────────┘
```

## Dashboard Indicators

### Parking Sensor
- **FREI (Free)**: Distance > 10 cm → **Green**
- **BELEGT (Occupied)**: Distance < 10 cm → **Red**

### Soil Moisture
- **Adequate**: Humidity > 45% → **Green**
- **Low**: Humidity ≤ 45% → **Red**

### Water Level
- **Full**: > 16 cm → 4 bars (dark blue)
- **High**: 13-16 cm → 3 bars
- **Medium**: 9-13 cm → 2 bars
- **Low**: 5-9 cm → 1 bar
- **Empty**: < 5 cm → all bars (light blue)

## License

MIT License - Feel free to use for educational purposes
