const request = require('request');

var getAddress = (address, callback) => {
	request({
		url: "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBnDPPldLldn_FzI5cIBkIAbY75ELz0Qeo&address=" + encodeURIComponent(address),
		json: true,
	}, (error, response, body) => {
		if (error) {
			callback('Cannot connect to Google Maps');
		} else if (body.status === 'ZERO_RESULTS') {
			callback("Cannot find requested address");
		} else if (body.status === 'OK'){
			location = {
				lat: body.results[0].geometry.location.lat,
				lng: body.results[0].geometry.location.lng
			}
			callback(location);
			//console.log(`Your requested venue: ${address}`);
			//console.log("Address:", JSON.stringify(body.results[0].formatted_address));
			//console.log("Type:", JSON.stringify(body.results[0].types[0]));
		}
	});
};

module.exports = {
	getAddress
}