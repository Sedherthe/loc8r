const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

// For adding a new review
const reviewsCreate = (req, res) => {
	console.log("In the reviews create function");
	const lid = req.params.locationid;
	console.log(lid);
	
	Loc
		.findById(lid)
		.exec((err, location) => {
			if(err){
				return res
					.status(404)
					.json(err)
			}else if(!location){
				return res
					.status(404)
					.json({
						"message" : "Location Not Found"
					});
			} else {
				// Calling another function for adding rev.
				doAddReview(req, res, location);
			}
		});
};

const doAddReview = (req, res, location) => {
	const {author, rating, reviewText} = req.body;
	console.log(req.body);
	console.log("before pushing: ", location.reviews);
	location.reviews.push({
		author,
		rating,
		reviewText
	});
	console.log("after pushing: ", location.reviews);
	location.save((err, location) => {
		if(err){
			return res
				.status(400)
				.json(err)
		} else{
			console.log("Location id is: ", location._id);
			updateAverageRating(location._id);
			console.log(location.reviews.slice[-1], "sliced review");
			const thisReview = location.reviews.slice(-1).pop();
			return res
				.status(201)
				.json(thisReview);
		}
	});
};

const updateAverageRating = (id) => {
	Loc
		.findById(id)
		.exec((err, location) => {
			if(err){
				return res
					.status(400)
					.json(err)
			}else {
				doSetAverageRating(location);
			}
		});
};

const doSetAverageRating = (location) => {
	if (location.reviews && location.reviews.length > 0){
		const count = location.reviews.length;
		const total = location.reviews.reduce((tot, review) => {
			console.log("Review rating is: ", review.rating, tot);
			return tot + review.rating;
		}, 0);

		location.rating = parseInt(total/count, 10);
		location.save((err, location) => {
			if(err){
				return res
					.status(400)
					.json(err);
			} else {
				console.log(`Average rating updated to ${location.rating}`);
			}
		});
	}
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
						.json(response);
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
	if(!req.params.loationid || !req.params.reviewid){
		return res
			.status(404)
			.json({
				"message" : "Not found, locationid and reviewid are both required"
			});
	}
	Loc
		.findById(locationid)
		.select('reviews')
		.exec((err, loc) => {
			if(err){
				return res
					.status(400)
					.json(err)
			} else if(!loc) {
				return res
					.status(404)
					.json({
						"message" : "No location found :("
					});
			} 
			if(loc.reviews && loc.reviews.length > 0) {
				thisReview = loc.reviews.id(reviewid);
				if(!thisReview){
					return res
						.status(404)
						.json({
							"message": "Review not found :("
						});
				} else {
					thisReview.author = req.body.author;
					thisReview.rating = req.body.rating;
					thisReview.reviewText = req.body.reviewText;

					loc.save((err, location) => {
						if(err){
							return res
								.status(400)
								.json(err)
						} else {
							updateAverageRating(loc._id);
							return res
								.status(200)
								.json(thisReview);
						}
					});
				}
			} else {
				return res
					.status(404)
					.json({
						"message" : "No review to Update."
					});
			}
		});//end of exec
};

// For deleting one review
const reviewsDeleteOne = (req, res) => {
	const locationid = req.params.locationid;
	const reviewid = req.params.reviewid;

	if(!locationid || !reviewid){
		return res
			.status(404)
			.json({
				"message" : " Not found, locationid and reviewid are both required"
			});
	}
	Loc
		.findById(locationid)
		.select('reviews')
		.exec((err, loc) => {
			if(err){
				return res
					.status(400)
					.json(err);
			} else if(!loc){
				return res
					.status(404)
					.json({
						"message" : "No Location found :("
					});
			}
			if(loc.reviews && loc.reviews.length > 0){
				if(!loc.reviews.id(reviewid)){
					return res
						.status(404)
						.json({
							"message" : "No review found :("
						});
				} else {
					loc.reviews.id(reviewid).remove();
					loc.save((err, location) => {
						if(err){
							return res
								.status(404)
								.json(err);
						} else {
							updateAverageRating(loc._id);
							return res
								.state(204)
								.json(null);
						}
					});
				}
			} else {
				return res
					.status(404)
					.json({
						"message" : "No review to delete :p"
					});
			}
		});
};

module.exports = {
	reviewsCreate,
	reviewsReadOne,
	reviewsUpdateOne,
	reviewsDeleteOne
};