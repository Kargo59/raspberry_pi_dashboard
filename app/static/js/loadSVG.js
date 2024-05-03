function loadSVG() {
    // Load tree.svg, change it later to a container with water
    const xhrTree = new XMLHttpRequest();
    xhrTree.open("GET", "/static/img/waterContainer.svg", true);
    xhrTree.onreadystatechange = function () {
      if (xhrTree.readyState === 4 && xhrTree.status === 200) {
        const containerTree = document.getElementById('svgContainerWaterJug');
        containerTree.innerHTML = xhrTree.responseText;  // Injects the SVG into the container
      }
    };
    xhrTree.send();

    // Load parking.svg
    const xhrParking = new XMLHttpRequest();
    xhrParking.open("GET", "/static/img/parking.svg", true);
    xhrParking.onreadystatechange = function () {
      if (xhrParking.readyState === 4 && xhrParking.status === 200) {
        const containerParking = document.getElementById('svgContainerParking');
        containerParking.innerHTML = xhrParking.responseText;  // Injects the SVG into the container
      }
    };
    xhrParking.send();
}

    // Load tree.svg
    const xhrTree = new XMLHttpRequest();
    xhrTree.open("GET", "/static/img/tree.svg", true);
    xhrTree.onreadystatechange = function () {
      if (xhrTree.readyState === 4 && xhrTree.status === 200) {
        const containerTree = document.getElementById('svgContainerSoilMoisture');
        containerTree.innerHTML = xhrTree.responseText;  // Injects the SVG into the container
      }
    };
    xhrTree.send();

document.addEventListener('DOMContentLoaded', function() {
  loadSVG();  // Load and add the SVGs when the document is ready
});
