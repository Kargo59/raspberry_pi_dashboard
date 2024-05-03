document.addEventListener('DOMContentLoaded', function() {
    var socket = io.connect(window.location.origin);

    // Listener for 'sensor_update' event from the server
    socket.on('sensor_update', function(data) {
      console.log('Received data:', data);
      // Assuming data has properties corresponding to sensors
      document.getElementById('parksensorValue').innerText = `Wasserstand: ${data.waterLevel.toFixed(2)}cm` || "No data";
      document.getElementById('abstandssensorValue').innerText = `Distance: ${data.distance.toFixed(2)}cm` || "No data";
      document.getElementById('bodenfeuchtesensorValue').innerText = `Bodenfeuchte: ${data.distance.toFixed(2)}%` || "No data";

    // Update the parking sensor SVG
    updateParkingStatus(data.distance);
    updateSoilMoisture(data.distance)
    updateWaterLevel(data.waterLevel)
    });

    function updateParkingStatus(distance) {
        const statusText = document.querySelector('#svgContainerParking #statusText');
        const statusRect = document.querySelector('#svgContainerParking #rectToChange');
    
        if (distance < 25) {
            statusText.textContent = 'BESETZT';
            statusRect.style.fill = 'red';
        } else {
            statusText.textContent = 'FREI';
            statusRect.style.fill = 'green';
        }
    }

    function updateSoilMoisture(distance) {
        const backgroundColorLeft = document.querySelector('#svgContainerSoilMoisture .cls-1');
        const backgroundColorRight = document.querySelector('#svgContainerSoilMoisture .cls-2');

        if (distance < 25) {
            backgroundColorLeft.style.fill = 'green';
            backgroundColorRight.style.fill = 'green';

        } else {
            backgroundColorLeft.style.fill = 'red';
            backgroundColorRight.style.fill = 'red';

        }
    }

    function updateWaterLevel(waterLevel) {
        const level1 = document.querySelector('#svgContainerWaterJug #level1');
        const level2 = document.querySelector('#svgContainerWaterJug #level2');
        const level3 = document.querySelector('#svgContainerWaterJug #level3');
        const level4 = document.querySelector('#svgContainerWaterJug #level4');

    
        if (waterLevel == 0) {
            level1.style.fill = '#E2F5FE'
            level2.style.fill = '#E2F5FE'
            level3.style.fill = '#E2F5FE'
            level4.style.fill = '#E2F5FE'

        } else if (waterLevel > 2 && waterLevel < 5) {
            level1.style.fill = '#6ecdfb'
            level2.style.fill = '#E2F5FE'
            level3.style.fill = '#E2F5FE'
            level4.style.fill = '#E2F5FE'        
        }
        else if (waterLevel >= 5 && waterLevel < 10) {
            level1.style.fill = '#6ecdfb'
            level2.style.fill = '#6ecdfb'
            level3.style.fill = '#E2F5FE'
            level4.style.fill = '#E2F5FE'        
        }
        else if (waterLevel >= 10 && waterLevel < 15) {
            level1.style.fill = '#6ecdfb'
            level2.style.fill = '#6ecdfb'
            level3.style.fill = '#6ecdfb'
            level4.style.fill = '#E2F5FE'        
        }
        else if (waterLevel >= 15 ) {
            level1.style.fill = '#6ecdfb'
            level2.style.fill = '#6ecdfb'
            level3.style.fill = '#6ecdfb'
            level4.style.fill = '#6ecdfb'        
        }
    }
  });

  