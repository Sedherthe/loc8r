const about = (req, res) => {
	res.render('generic-text', {
		title: 'About',
		text : 'This is about the Loc8r web page!'});
};

module.exports = {
	about,
}