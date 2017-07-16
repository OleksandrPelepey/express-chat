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
app.use(express.static('public'));

// Routes

app.use('/', apiRoutes);
app.use('/', authRoutes);

app.listen(3000, function() {
	console.log('Server is runing.');
});
