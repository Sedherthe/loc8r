const express = require('express');
const router = express.Router();

// import the controller functions here
const ctrlLocations = require('../controllers/locations.js');
const ctrlReviews = require('../controllers/reviews.js');

//locations
// Here we'll define routes for get(querying) and post(creating) request.
router
	.route('/locations')
	.get(ctrlLocations.locationsListByDistance)
	.post(ctrlLocations.locationsCreate);

router
	.route('/locations/:locationid')
	.get(ctrlLocations.locationsReadOne)
	.put(ctrlLocations.locationsUpdateOne)
	.delete(ctrlLocations.locationsDeleteOne);

//reviews
router
	.route('/locations/:locationid/reviews')
	.post(ctrlReviews.reviewsCreate);

router
	.route('/locations/:locationid/reviews/:reviewid')
	.get(ctrlReviews.reviewsReadOne)
	.put(ctrlReviews.reviewsUpdateOne)
	.delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;