const mongoose = require('mongoose');
// To interact with the locations collection
const Loc = mongoose.model('Location'); // Name of the dbase.

// For listing the locaitons by distance
const locationsListByDistance = async (req, res) => {
	/*const content = {
		"status" : "successful get request!",
	};

	res
		.status(200)
		.json(content);*/

	console.log("Came after response");

	const lng = parseFloat(req.query.lng);
	const lat = parseFloat(req.query.lat);

	if(!lng || !lat ){
		return res
			.status(404)
			.json({
				"message": "lng and lat query parameters are required!"
			});
	}

	console.log(lng, lat);

	const near = {
		type: "Point",
		coordinates: [lng, lat]
	};

	const geoOptions = {

		spherical: true,
		distanceField : "distance.calculated",
		maxDistance: 80000,
		//limit: 10
	};	
	try{
		const results = await Loc.aggregate([
				{
					$geoNear: {
						near,
						...geoOptions // Spread operator
						//spherical: true,
						//distanceField : "distance.calculated",
						//maxDistance: 20000,
					} 
				},
				{$limit : 10},
			]);
		console.log("Calculated results.");
		const locations = results.map(result => {
			// We don't need opening times and coords in the 
			// locations list view.
			console.log(result.distance.calculated.toFixed());
			return {
				id: result._id,
				name: result.name,
				address: result.address,
				rating: result.rating,
				facilities: result.facilities,
				distance: `${result.distance.calculated.toFixed()}m`
			}
		});
		console.log(locations);
		return res
			.status(200)
			.json(locations);

	} catch (err){
		res
			.status(404)
			.json(err);
	}
};

// For adding a new location!
const locationsCreate = (req, res) => {

	Loc.create({
		name: req.body.name, 
		address: req.body.address,
		facilities: 
			req.body.facilities.split(","),
		openingTimes: [
			{
				days: req.body.days,
				opening: req.body.opening,
				closing:req.body.closing,
				closed:req.body.closed,
			}
		],
		coords: {
			type: "Point",
			coordinates: [
				parseFloat(req.body.lng),
				parseFloat(req.body.lat)
			]
		},		
	}, (err, location) => {
		if (err){
			res
				.status(400)
				.json(err);
		} else {
			res
				.status(201	)
				.json(location);
		}
	});
};

// For reading one location.
const locationsReadOne = (req, res) => {
	loc_id = '5d94bc9bab239aa52fd13769';
	loc_id = req.params.locationid;
	Loc
		.findById(loc_id)
		.exec((err, location) => {
			if(!location){
				return res
					.status(404)
					.json({
						"message": "Location not Found"
					});
			} else if (err) {
				return res
					.status(404)
					.json(err);
			}
			res
				.status(200)
				.json(location);
		});
};

//For updating one location as wanted by user.
const locationsUpdateOne = (req, res) => {

};

//For deleting the location as wanted by user.
const locationsDeleteOne = (req, res) => {

};

module.exports = {
	locationsListByDistance,
	locationsCreate,
	locationsReadOne,
	locationsUpdateOne,
	locationsDeleteOne
};