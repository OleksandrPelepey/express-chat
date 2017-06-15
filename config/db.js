var mongoose = require('mongoose');

var dbConnection = mongoose.connect('mongodb://localhost:27017/test');

module.exports = dbConnection;
