const mongoose = require('mongoose');
require('./locations.js');

let dbURI = 'mongodb://localhost/Loc8r';
if (process.env.NODE_ENV==='production'){
	dbURI = process.env.MONGODB_URI;
}
//Second arg tells it to use its own new url parser
mongoose.connect(dbURI, {useNewUrlParser: true});

//Monitoring the connection with mongoose.
mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
	console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected');
});


// Code to gracefully capture the close down signal
const readLine = require('readline');
if(process.platform == 'win32'){
	const r1 = readLine.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	r1.on ('SIGINT', () => {
		process.emit ("SIGINT");
	});
}

const gracefulShutdown = (msg, callback) => {
	// This func closes the Mongoose connection.(asynchronous)
	console.log("Here in the graceful shutdown!");
	mongoose.connection.close( () => {
		console.log(`Mongoose disconnected through ${msg}`);
		callback();
	});
};


// We need to call the closing func whenever nodemon restarts
// or application terminates.

// Listens for SIGUSR2, which is what nodemon uses.
process.once('SIGUSR2', () => {
	console.log("Got the signal for nodemon restart!");
	gracefulShutdown('nodemon restart', () => {
		// Again emits SIGUSR2 signal, killing the process
		process.kill(process.pid, 'SIGUSR2')
	});
});

//Listening for SIGINT signal
process.on('SIGINT', () => {
	gracefulShutdown('app termination', () => {
		process.exit(0);
	});
});

//Listening for SIGTERM signal
process.on('SIGTERM', () => {
	gracefulShutdown('Heroku app shutdown', () => {
		process.exit(0);
	});
});

