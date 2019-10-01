const homelist = (req, res) => {
	res.render('locations-list', {
		title: "Loc8r - Find a place to work with wifi",
		pageHeader : {
			title: 'Loc8r',
			strapline: 'Find places to work with wifi near you!'
		},
		locations: [{
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
		],
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