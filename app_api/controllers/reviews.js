// For adding a new review
const reviewsCreate = (req, res) => {

};

//For reading one review 
const reviewsReadOne = (req, res) => {
	const content = {
		"status" : "reading on review!"
	};
	res
		.status(200)
		.json(content);
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