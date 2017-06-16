var express = require('express');
var User = require('../../models/User');
var route = express.Router();

route.post('/user', function(req, res) {
	
});

route.route('/user/:userId')
	.get(function(req, res) {

	})
	.put(function(res, req) {})
	.delete(function(res, req) {});
