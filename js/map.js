function getPlaces(city) {
	var request = new XMLHttpRequest();
	request.open("GET", "/" + city + "/places.json", false);
	request.send(null)

	return JSON.parse(request.responseText) 	
}

function buildMapFor(city) {
	var places = getPlaces(city);

	var map = L.map('map').setView([places.city.lat, places.city.lon], 14);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
	}).addTo(map);

	places.places.forEach(function(place) {
		L.marker([place.lat, place.lon])
		.bindPopup(
			"<b>" + place.name + "</b><br>"
			+ "address: " + place.address + "<br>"
			+ "type: " + place.type + "<br>"
			+ "power: " + place.power + "<br>"
			+ "wifi: " + place.wifi)
		.addTo(map);
	});

	function onMapClick(e) {
		map.setView([51.5073219, -0.1276474], 14)
	}

	map.on('click', onMapClick);
}