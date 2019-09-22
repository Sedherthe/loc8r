var express = require('express');
var controller = require('../controllers/main.js');
var router = express.Router();

// Pass the function from the main controller.
router.get('/', controller.index);

module.exports = router;