document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Wasserstand',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: false  // Ensure line chart does not fill under the line
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        maxTicksLimit: 10  // Limits the number of ticks on Y-axis
                    },
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Wasserstand (cm)',  // Y-axis label
                        font: {
                            size: 16  // Adjust font size as needed
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Zeit',  // X-axis label
                        font: {
                            size: 16  // Adjust font size as needed
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Wasserstand / Zeit',
                    font: {
                        size: 24  // Make the title bigger
                    }
                },
                legend: {
                    display: false  // Hide the legend
                }
            }
        }
    });

    socket.on('sensor_update', function(data) {
        var date = new Date(data.mid * 1000); // Ensure your timestamp is in seconds
        var formattedDate = date.toLocaleTimeString(); // Converts to human-readable time
        
        myChart.data.labels.push(formattedDate);
        myChart.data.datasets.forEach((dataset) => {
            dataset.data.push(data.waterLevel);
        });

        if (myChart.data.labels.length > 10) {
            myChart.data.labels.shift();  // Remove the first label
            myChart.data.datasets.forEach((dataset) => {
                dataset.data.shift();  // Remove the first data point
            });
        }

        myChart.update();
    });
});
