/*

First, we’ll get some naming conventions out of the way:
 In MongoDB, each entry in a database is called a document.
 In MongoDB, a group of documents is called a collection. (Think table if you’re
used to relational databases.)
 In Mongoose, the definition of a document is called a schema.
 Each individual data entity defined in a schema is called a path.
*/

const mongoose = require('mongoose');

// Subdocument schema for restaurant timings.
const openingTimeSchema = new mongoose.Schema({
	days: {
		type: String,
		required: true
	},
	opening: String,
	closing: String,
	closed: {
		type: Boolean,
		required: true,
	}
});

// Subdocument schema for user reviews.
const reviewSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		'default': 0,
		min: 0,
		max: 5,
	},
	reviewText: String,
	createdOn: {
		type: Date,
		'default': Date.now
	}
});

const locationSchema = new mongoose.Schema({
	// Each documnet has a unique id as primary key.
	name: {
		type: String,
		required: true,
	},
	address: String,
	rating: {
		type: Number,
		'default': 0, //Default need not be in strings, but since its keyword.
		min: 0,
		max: 5,
	},
	facilities: [String],
	coords: {
		type: {type: String},
		coordinates: [Number], // Longitude and Latitude.
	},
	openingTimes: [openingTimeSchema], //Each subdoc in arr has uniq id.
	reviews: [reviewSchema],
});
locationSchema.index({coords: '2dsphere'});

//Compiling the schema into a model!
// Model Name, Schema to use, and collection name(opt)
mongoose.model('Location', locationSchema);


