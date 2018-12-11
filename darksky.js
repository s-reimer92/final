const request = require('request');
const gmaps = require('./gmaps.js');

var getWeather = (address, callback) => {
	gmaps.getAddress(address, (results) => {
		request({
			url: `https://api.darksky.net/forecast/2ec3824c3d58fc6a5c82fee3f1d65575/${results.lat},${results.lng}`,
			json: true,
		}, (error, response, body) => {
			if (error) {
				callback('Cannot connect to Dark Sky')
			} else if (body === undefined) {
				callback("Cannot find requested location")
			} else {
				var array = [JSON.stringify(body.currently.summary), body.currently.icon]
				callback(JSON.stringify(body.currently.summary));
			}
		});
	})
	
}

module.exports = {
	getWeather
}

