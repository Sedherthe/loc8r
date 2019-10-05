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

	console.log(lng, lat);

	const near = {
		type: "Point",
		coordinates: [lng, lat]
	};

	const geoOptions = {
		distanceField: "distance",
		spherical: true,
		maxDistance: 20000,
		limit: 10
	};
	try{
		const results = await Loc.aggregate([
				{
					$geoNear: {
						near,
						geoOptions
					}
				}
			]);
		const locations = results.map(result => {
			// We don't need opening times and coords in the 
			// locations list view.
			return {
				id: result._id,
				name: result.name,
				address: result.address,
				rating: result.rating,
				facilities: result.facilities,
				//distance: `${result.distance.calculated.toFixed()}m`
			}
		});

		return res
			.status(200)
			.json(locations);

	} catch (err){
		console.log(err);
	}
};

// For adding a new location!
const locationsCreate = (req, res) => {
	const content = {
		"status" : "successful post request!",
	};

	res
		.status(200)
		.json(content);
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