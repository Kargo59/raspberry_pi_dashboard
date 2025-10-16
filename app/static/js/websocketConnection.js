document.addEventListener('DOMContentLoaded', function() {
    var socket = io.connect(window.location.origin);

    // Listener for 'sensor_update' event from the server
    socket.on('sensor_update', function(data) {
      console.log('Received data:', data);
      
      // Update the parking sensor SVG
      updateParkingStatus(data.distance);
      updateSoilMoisture(data.humidity);
      updateWaterLevel(data.waterLevel);
    });

    function updateParkingStatus(distance) {
        const statusText = document.querySelector('#svgContainerParking #statusText');
        const statusRect = document.querySelector('#svgContainerParking #rectToChange');
    
        if (distance < 10) {
            statusText.textContent = 'BELEGT';
            statusRect.style.fill = '#E20613';
        } else {
            statusText.textContent = 'FREI';
            statusRect.style.fill = '#009540';
        }
    }

    function updateSoilMoisture(humidity) {
        const backgroundColorLeft = document.querySelector('#svgContainerSoilMoisture .cls-1');
        const backgroundColorRight = document.querySelector('#svgContainerSoilMoisture .cls-2');

        if (humidity > 45) {
            backgroundColorLeft.style.fill = '#009540';
            backgroundColorRight.style.fill = '#009540';
        } else {
            backgroundColorLeft.style.fill = '#E20613';
            backgroundColorRight.style.fill = '#E20613';
        }
    }

    function updateWaterLevel(waterLevel) {
        const level1 = document.querySelector('#svgContainerWaterJug #level1');
        const level2 = document.querySelector('#svgContainerWaterJug #level2');
        const level3 = document.querySelector('#svgContainerWaterJug #level3');
        const level4 = document.querySelector('#svgContainerWaterJug #level4');

        if (waterLevel >= 16) {
            level1.style.fill = '#009EE2'
            level2.style.fill = '#009EE2'
            level3.style.fill = '#009EE2'
            level4.style.fill = '#009EE2'
        } else if (waterLevel >= 13 && waterLevel < 16) {
            level1.style.fill = '#009EE2'
            level2.style.fill = '#009EE2'
            level3.style.fill = '#009EE2'
            level4.style.fill = '#E2F5FE'        
        } else if (waterLevel >= 9 && waterLevel < 13) {
            level1.style.fill = '#009EE2'
            level2.style.fill = '#009EE2'
            level3.style.fill = '#E2F5FE'
            level4.style.fill = '#E2F5FE'        
        } else if (waterLevel >= 5 && waterLevel < 9) {
            level1.style.fill = '#009EE2'
            level2.style.fill = '#E2F5FE'
            level3.style.fill = '#E2F5FE'
            level4.style.fill = '#E2F5FE'        
        } else if (waterLevel < 5) {
            level1.style.fill = '#E2F5FE'
            level2.style.fill = '#E2F5FE'
            level3.style.fill = '#E2F5FE'
            level4.style.fill = '#E2F5FE'        
        }
    }
});