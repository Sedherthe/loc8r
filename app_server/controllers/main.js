// The controller file for the project.
const index = (req, res) => {
	// Function body
	res.render('index', {title: 'Express'});	
};

module.exports = {
	index,
}