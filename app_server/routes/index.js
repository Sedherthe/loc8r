var express = require('express');
var controller = require('../controllers/main.js');
var ctrlLocations = require('../controllers/locations.js');
var ctrlOthers = require('../controllers/others.js');

var router = express.Router();

// Pass the function from the main controller.
//router.get('/', controller.index);

/* Locations page */
router.get('/', ctrlLocations.homelist); // List of locations.
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Others page */
router.get('/about', ctrlOthers.about);

module.exports = router;