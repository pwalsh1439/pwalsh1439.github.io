//loads map and creates markers
function loadMap(){
	// set up leaflet map
	var ofstedMap = L.map('ofstedMapDiv').setView([51.257151, -1.621854], 9);
	
	//Load OSM basemap into leaflet map 
	//maybe change basemap to Arc? Mapbox?
	L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution:'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery ©CloudMade',maxZoom: 18}).addTo(ofstedMap);

		//Creat Icon object options for the creation of diiferent marker icons
	var BulletIcon = L.Icon.extend({
		options: {
			iconSize:     [20, 20],
		}});
	// Icons provided by Mark James @ http://www.famfamfam.com/lab/icons/silk/ under the Creative Commons Attribution 2.5 License
	var redIcon = new BulletIcon({iconUrl: 'bullet_red.png'}),
    orangeIcon = new BulletIcon({iconUrl: 'bullet_orange.png'}),
	yellowIcon = new BulletIcon({iconUrl: 'bullet_yellow.png'}),
    greenIcon = new BulletIcon({iconUrl: 'bullet_green.png'});
		
	//create new feature group for the markers to be loaded into
	var markersLayer = L.featureGroup().addTo(ofstedMap);
	
	//iterate through json data and create new marker
	for (var i = 0; i < Ofsted_markers.length; i++){
		//marker location varible
		var markerLocation = new L.LatLng(Ofsted_markers[i].Latitude, Ofsted_markers[i].Longitude);
		
		//Create new marker, set icon depending on rating. then create marker properties to be populated with the data informaion
		if (Ofsted_markers[i].Overall_ef == "Inadequate"){
			var marker = L.marker(markerLocation, {icon: redIcon}).bindTooltip(Ofsted_markers[i].Provider_n);
			marker.properties = {};
			marker.properties.provider = Ofsted_markers[i].Provider_n;
			marker.properties.rating = Ofsted_markers[i].Overall_ef;
			marker.properties.Phase = Ofsted_markers[i].Phase;
			marker.properties.Remit = Ofsted_markers[i].Remit;
			marker.properties.Constituen = Ofsted_markers[i].Constituen;
			marker.properties.Local_auth = Ofsted_markers[i].Local_auth;
			marker.properties.Provider_t = Ofsted_markers[i].Provider_t;
			marker.properties.Provision = Ofsted_markers[i].Provision;
			marker.properties.Learner_nu = Ofsted_markers[i].Learner_nu;
			marker.properties.Deprivatio = Ofsted_markers[i].Deprivatio;
			marker.properties.As_at_date = Ofsted_markers[i].As_at_date;
			
			marker.addTo(markersLayer)
		}
		//Create new marker, set icon depending on rating. then create marker properties to be populated with the data informaion
		else if (Ofsted_markers[i].Overall_ef == "Requires improvement"){
			var marker = L.marker(markerLocation, {icon: orangeIcon}).bindTooltip(Ofsted_markers[i].Provider_n);
			marker.properties = {};
			marker.properties.provider = Ofsted_markers[i].Provider_n;
			marker.properties.rating = Ofsted_markers[i].Overall_ef;
			marker.properties.Phase = Ofsted_markers[i].Phase;
			marker.properties.Remit = Ofsted_markers[i].Remit;
			marker.properties.Constituen = Ofsted_markers[i].Constituen;
			marker.properties.Local_auth = Ofsted_markers[i].Local_auth;
			marker.properties.Provider_t = Ofsted_markers[i].Provider_t;
			marker.properties.Provision = Ofsted_markers[i].Provision;
			marker.properties.Learner_nu = Ofsted_markers[i].Learner_nu;
			marker.properties.Deprivatio = Ofsted_markers[i].Deprivatio;
			marker.properties.As_at_date = Ofsted_markers[i].As_at_date;
			
			marker.addTo(markersLayer)
		}
		//Create new marker, set icon depending on rating. then create marker properties to be populated with the data informaion
		else if (Ofsted_markers[i].Overall_ef == "Good"){
			var marker = L.marker(markerLocation, {icon: yellowIcon}).bindTooltip(Ofsted_markers[i].Provider_n);
			marker.properties = {};
			marker.properties.provider = Ofsted_markers[i].Provider_n;
			marker.properties.rating = Ofsted_markers[i].Overall_ef;
			marker.properties.Phase = Ofsted_markers[i].Phase;
			marker.properties.Remit = Ofsted_markers[i].Remit;
			marker.properties.Constituen = Ofsted_markers[i].Constituen;
			marker.properties.Local_auth = Ofsted_markers[i].Local_auth;
			marker.properties.Provider_t = Ofsted_markers[i].Provider_t;
			marker.properties.Provision = Ofsted_markers[i].Provision;
			marker.properties.Learner_nu = Ofsted_markers[i].Learner_nu;
			marker.properties.Deprivatio = Ofsted_markers[i].Deprivatio;
			marker.properties.As_at_date = Ofsted_markers[i].As_at_date;
			
			marker.addTo(markersLayer)
		}
		//Create new marker, set icon depending on rating. then create marker properties to be populated with the data informaion
		else if (Ofsted_markers[i].Overall_ef == "Outstanding"){
			var marker = L.marker(markerLocation, {icon: greenIcon}).bindTooltip(Ofsted_markers[i].Provider_n);
			marker.properties = {};
			marker.properties.provider = Ofsted_markers[i].Provider_n;
			marker.properties.rating = Ofsted_markers[i].Overall_ef;		
			marker.properties.Phase = Ofsted_markers[i].Phase;
			marker.properties.Remit = Ofsted_markers[i].Remit;
			marker.properties.Constituen = Ofsted_markers[i].Constituen;
			marker.properties.Local_auth = Ofsted_markers[i].Local_auth;
			marker.properties.Provider_t = Ofsted_markers[i].Provider_t;
			marker.properties.Provision = Ofsted_markers[i].Provision;
			marker.properties.Learner_nu = Ofsted_markers[i].Learner_nu;
			marker.properties.Deprivatio = Ofsted_markers[i].Deprivatio;
			marker.properties.As_at_date = Ofsted_markers[i].As_at_date;
			
			marker.addTo(markersLayer)
		}
    }
	
	//create popup. add listner to featurre group that runs functions when clicked 
	markersLayer.on('click', markerOnClick);
	
	/*
	//set up new geocoder object. add listner to post code search that runs function
	var geocoder = new google.maps.Geocoder();
    document.getElementById('postcode_search').addEventListener('click', function() {
		postcodeSearch(geocoder, ofstedMap);
    });
	*/
	// Add listner to post code search that runs postcode geocodeer function
	document.getElementById('postcode_search').addEventListener('click', function() {
		postcodeSearch(ofstedMap);
    });

//function to perform popup process.
//modify the side bar with the marker property information.
function markerOnClick(e) {
	var attributes = e.layer.properties;
	document.getElementById('updatehtml').innerHTML = 
			"<b>Provider:</b> " + attributes.provider + "<br>" +
			"<b>Rating:</b> " + attributes.rating + "<br>" +
			"<b>Phase:</b> " + attributes.Phase + "<br>" +
			"<b>Remit:</b> " + attributes.Remit + "<br>" + 
			"<b>Constituency:</b> " + attributes.Constituen + "<br>" +
			"<b>Local authority:</b> " + attributes.Local_auth + "<br>" +
			"<b>Provider Type:</b> " + attributes.Provider_t + "<br>" +
			"<b>Provision Type:</b> " + attributes.Provision + "<br>" +
			"<b>Learner Number/Places:</b> " + attributes.Learner_nu + "<br>" +
			"<b>Deprivation:</b> " + attributes.Deprivatio + "<br>" +
			"<b>As at Date:</b> " + attributes.As_at_date + "<br>"
			};
	
	};