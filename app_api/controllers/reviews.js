const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

// For adding a new review
const reviewsCreate = (req, res) => {

};

//For reading one review 
const reviewsReadOne = (req, res) => {
	Loc
		.findById(req.params.locationid)
		.select('name reviews')
		.exec((err, location) => {
			if(!location){
				return res
					.status(404)
					.json({
						"message": "Location not Found :("
					});
			} else if(err) {
				return res
					.status(404)
					.json(err);
			}
			console.log("reviews are: ");
			console.log(location.reviews);
			console.log(location.reviews.id('5d94be88ab239aa52fd1376a'));
			if(location.reviews && location.reviews.length > 0){
				const review = location.reviews.id(req.params.reviewid);
				console.log(review);
				if(!review){
					return res
						.status(400)
						.json({
							// Review with such id Not found :(
							"message": "Review Not Found :("
						});
				} else {
					response = {
						location: {
							name: location.name,
							id: req.params.locationid
						},
						review
					};
					res
						.status(200)
						.json(location);
				}
			} else {
				return res
					.status(404)
					.json({
						// Location exists but no reviews.
						"message": "No reviews found :("
					});
			}	
		});
};

//For updating one review 
const reviewsUpdateOne = (req, res) => {

};

// For deleting one review
const reviewsDeleteOne = (req, res) => {

};

module.exports = {
	reviewsCreate,
	reviewsReadOne,
	reviewsUpdateOne,
	reviewsDeleteOne
};