var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var dbConnection = require('./config/db');
var apiRoutes = require('./routes/api');
var authRoutes = require('./routes/auth');

var app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

// Serve static files
app.use('/bower_components', express.static('bower_components'));
app.use(express.static('public'));

app.all('*', function(req, res, next) {
	console.log(req.body);
	next();
});

app.use('/', apiRoutes);
app.use('/', authRoutes);

app.listen(3000, function() {
	console.log('Server is runing.');
});
