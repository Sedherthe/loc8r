var express = require('express');
var controller = require('../controllers/main.js');
var ctrlLocations = require('../controllers/locations.js');
var ctrlOthers = require('../controllers/others.js');

var router = express.Router();

// Pass the function from the main controller.
//router.get('/', controller.index);

/* Locations page */
router.get('/', ctrlLocations.homelist); // List of locations.
router.get('/location/:locationid', ctrlLocations.locationInfo);
router
	.route('/location/:locationid/review/new')
	.get(ctrlLocations.addReview)
	.post(ctrlLocations.doAddReview);
/* Others page */
router.get('/about', ctrlOthers.about);

module.exports = router;