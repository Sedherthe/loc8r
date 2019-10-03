const mongoose = require('mongoose');
// To interact with the locations collection
const Loc = mongoose.model('Location'); // Name of the dbase.

// For listing the locaitons by distance
const locationsListByDistance = (req, res) => {
	const content = {
		"status" : "successful get request!",
	};

	res
		.status(200)
		.json(content);
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
			console.log("findById complete");
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