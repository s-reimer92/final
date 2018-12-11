const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');

const pixabay = require('./pixabay.js');
const darksky = require('./darksky.js')

//Set up app
var app = express();

//Set up hbs
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


app.get('/', (request, response) => {
	response.render('home.hbs', {
		title: 'Image Search',
		addr: '/weather',
		link: 'Go to Weather'
	})
})

app.post('/', (request, response) => {
	pixabay.getImages(request.body.searchBar, (results) =>
		response.render('home.hbs', {
			title: 'Image Search',
			addr: '/weather',
			link: "Go to weather",
			images: results
		}))
})


app.get('/weather', (request, response) => {
	response.render('weather.hbs', {
		title: 'Weather Search',
		addr: '/',
		link: 'Go to Image Search'
	})
})

app.post('/weatherResults', (request, response) => {
	darksky.getWeather(request.body.searchBar, (results) => {
		pixabay.getImages(results, (thumb) => {
			response.render('weatherResults.hbs', {
				title: 'Weather Search',
				addr: '/',
				link: 'Go to Image Search',
				weather: results,
				img: thumb 
			})
		})
		

	})
})



const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Server is up on the port ${8080}`);
});

