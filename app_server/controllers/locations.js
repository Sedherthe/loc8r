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
	let message = null;
	if(!(responseBody instanceof Array)){
		message = "API Look up error";
	} else {
		if(!responseBody.length){
			message="No places found nearby";
		}
	}
	res.render('locations-list', {
		title: "Loc8r - Find a place to work with wifi",
		pageHeader : {
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		},
		sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for!",
		locations: responseBody,
		message
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
};

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
			lat : 51,
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

const getLocationInfo = (req, res, callBack) => {

}

const renderDetailPage = (req, res, location) => {
	console.log("data received is", location);
	console.log("id is ", location._id);
	res.render('location-info', {
			id : location._id,
			link : `/location/${location._id}/review/new`,
			title: `${location.name} Location Info`,
			name: location.name,
			rating: location.rating,
			address: location.address,
			timings: location.openingTimes.map((obj) => {
				if(!obj.closed){
					return `${obj.days} : ${obj.opening} - ${obj.closing}`
				} else {
					return `${obj.days} : Closed`
				}
			}),
			facilities: location.facilities,
			mapLocation: 'http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2&key=AIzaSyCHCcDvbAw0EXsxACg5meqka5pEBJKr8NE',
			userReviews : location.reviews,
		});
};

const showError = (req, res, statusCode) => {
	let title = '';
	let content = '';
	if(statusCode===404){
		title = '404, page not found';
		content = 'Oh dear, Looks like you can\'t find this page Sorry :(';
	} else {
		title = `${statusCode}, something's gone wrongg`;
		content = 'Something, somewhere has gone just a little bit wrong';
	}
	res.status(statusCode);
	res.render('generic-text', {title:title, text:content});
}

const locationInfo = (req, res) => {
	const path = `/api/locations/${req.params.locationid}`;
	const fullPath = apiOptions.server + path;
	console.log(fullPath);
	const requestOptions = {
		url : fullPath,
		method : 'GET',
		json : {},
		qs : {}
	};
	request(requestOptions, (err, response, body) => {
		if(err){
			res
				.status(400)
				.json(err);
		} else {
			if(response.statusCode === 200){
				const data = body;
				data.coords = {
					lng : body.coords[0],
					lat : body.coords[1]
				};
				renderDetailPage(req, res, data);
			} else {
				showError(req, res, response.statusCode);
			}
		}
	});
};

const renderReviewForm = (req, res) => {
	res.render('location-review-form',{
		title : "Add Review",
	});
};

const addReview = (req, res) => {
	renderReviewForm(req, res);
	//	res.render('location-review-form', {title: "Add Review"});
};

const doAddReview = (req, res) => {

};

module.exports = {
	homelist,
	locationInfo, 
	addReview,
	doAddReview
};

// Cost for breakfast and refreshments.
// 15, 4, 30(chow chow), and 25 for breakfast 50.