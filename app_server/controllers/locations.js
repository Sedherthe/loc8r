const request = require('request');

// Set the paths for the server
// 1. For development mode:
const apiOptions = {
	server : 'http://localhost:3000',
};
//2. For production mode. Using the env variable.
if(process.env.NODE_ENV === 'production'){
	apiOptions.server = 'https://soma-loc8r.herokuapp.com';
}

const renderHomepage = (req, res, responseBody) => {
	console.log("body is: ", responseBody);
	res.render('locations-list', {
		title: "Loc8r - Find a place to work with wifi",
		pageHeader : {
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		},
		locations: responseBody
		/*locations: [{
			name: 'Somasa',
			address: 'IIT Dharwad, Dharwad, Karnataka',
			rating: 5,
			facilities: ['Hot Drinks', 'Food', 'Wi-Fi'],
			distance: '100m'
		},
		{
			name: 'Roti Ghar',
			address: 'IIT Dharwad, Dharwad, Karnataka',
			rating: 3,
			facilities: ['Pure Veg', 'TV', 'Wi-Fi'],
			distance: '1 Km'
		},
		{
			name: 'Pit Stop',
			address: 'IIT Dharwad, Dharwad, Karnataka',
			rating: 4,
			facilities: ['Barbeque', 'Non-Veg', 'Wi-Fi'],
			distance: '3 Km'
		},
		],*/
	});
}

const formatDistance = (distance) => {
	let thisDistance = 0;
	let unit = 'm';

	if(distance > 1000){
		thisDistance = parseFloat(distance/1000).toFixed(1);
		unit = 'Km';
	} else {
		thisDistance = Math.floor(distance);
	}
	return thisDistance + unit;
};

const formatFacility = (facilities) => {
	// Here input is an array.
	newFacilities = facilities.map((facility) => {
		console.log(facility, "in");
		return facility.trim()[0].toUpperCase() + facility.trim().slice(1);
	});
	console.log("new", newFacilities);
	return newFacilities;
}

const homelist = (req, res) => {
	const homePath = '/api/locations';
	const requestOptions = {
		url : `${apiOptions.server}${homePath}`,
		method: 'GET',
		json : {},
		qs : {
			lng : 0.99,
			lat : 51.7,
			maxDistance : 200000
		}
	};
	request(requestOptions, (err, response, body) => {
		if(err){
			console.log("error found", err);
		}
		let data = [];
		if(response.statusCode === 200 && body.length > 0){
			//formatting the distance
			data = body.map((item) => {
				item.distance = formatDistance(item.distance);
				return item;
			});
			//formatting the facility strings
			data = data.map((item) => {
				item.facilities = formatFacility(item.facilities);
				console.log("new item", item.facilities);
				return item;
			});
		}
		renderHomepage(req, res, data);
	});
};

const locationInfo = (req, res) => {
	res.render('location-info', {
		title: "Somasa-Location Info",
		name: "Somasa",
		rating: 5,
		address: "IIT Dharwad, Dharwad, Karnataka",
		timings: [
			"Monday - Friday : 7:00am - 7:00pm",
			"Saturday: 8:00am - 5:00pm",
			"Sunday : Closed"
		],
		facilities: [
			'Hot Drinks', 'Food', 'Wi-Fi'
		],
		mapLocation: 'http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2&key=AIzaSyCHCcDvbAw0EXsxACg5meqka5pEBJKr8NE',
		userReviews : [
			{
				rating: 4,
				user: 'Swapnik Jagarlapudi',
				timestamp: "23rd September, 2019",
				review: "It was okay! Coffee wasn't that great."
			},
			{
				rating: 3,
				user: 'Saurav Dosi',
				timestamp : "23rd September, 2019",
				review: "It was okay! Coffee wasn't that great."
			}
		],
	});
};

const addReview = (req, res) => {
	res.render('location-review-form', {title: "Add Review"});
};

module.exports = {
	homelist,
	locationInfo, 
	addReview,
}

// Cost for breakfast and refreshments.
// 15, 4, 30(chow chow), and 25 for breakfast 50.