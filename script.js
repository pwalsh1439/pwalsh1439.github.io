//loads map and creates markers
function loadMap(){
	// set up leaflet map
	var ofstedMap = L.map('ofstedMapDiv').setView([51.257151, -1.621854], 9);
	
	//Load OSM basemap into leaflet map 
	//maybe change basemap to Arc? Mapbox?
	L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution:'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery ©CloudMade',maxZoom: 18}).addTo(ofstedMap);
};