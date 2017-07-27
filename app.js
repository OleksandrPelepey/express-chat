var express = require('express');
var morgan = require('morgan');
var passport = require('passport');

var dbConnection = require('./config/db');
var apiRoutes = require('./routes/api/index');
var authRoutes = require('./routes/auth');

var app = express();

// Initialize jwt strategy
require('./utils/auth-jwt')();
app.use(passport.initialize());

// Serve static files
app.use('/bower_components', express.static('bower_components'));
app.use('/node_modules', express.static('node_modules'));
app.use(express.static('public'));

// Routes
app.use('/', apiRoutes);
app.use('/', authRoutes);

// Sockets
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chatIo = io.of('/chat');

chatIo.on('connection', function(socket) {
	socket.join(socket.handshake.query.room);

	socket.on('message', function(message) {
		socket.broadcast.to(message._chat).emit('message', message);
	});
});


server.listen(3000, function() {
	console.log('Server is runing.');
});
