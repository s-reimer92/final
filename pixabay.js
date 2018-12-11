const request = require('request');

var getImages = (keyword, callback) => {
	request({
		url: "https://pixabay.com/api/?key=10968963-a604ffe853afa881dfe83ea0b&q=" + encodeURIComponent(keyword),
		json: true,
	}, (error, response, body) => {
		var imageResults = []
		for(var i=0; i<20; i++) {
			imageResults.push(body.hits[i].largeImageURL)
		}
		console.log(imageResults);
		callback(imageResults)
	})
}

module.exports = {
	getImages
}