var express = require('express');
var bodyParser = require('body-parser');

var passport = require('passport');
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwt');

var User = require('../models/User');

var router = express.Router();

router.use(bodyParser.json());

// Signin route
router.post('/signin', function(req, res) {
	if (req.body.email && req.body.password) {
		var email = req.body.email;
		var password = req.body.password;

		User.findOne({email: email}, function(err, user) {
			if (err || !user) {
				res.status(401).json({success: false, message: "No such user found."});
			} 

			if (!user.checkPassword(password)) {
				res.status(401).json({success: false, message: "Incorrect password."});
			} else {
				var payload = {id: user._id, password: password};
				var token = jwt.sign(payload, jwtOptions.secretOrKey);

				// Prevent sending password hash back
				user.password = undefined;
				
				res.json({success: true, taken: 'JWT ' + token, user: user});
			}
		});
	} else {
		res.status(401).json({
			success: false,
			message: 'Email and password is required'
		});
	}
});

// Sign up route
router.post('/signup', function(req, res) {
	User.create(req.body, function(err, queryRes) {
		var response = {};
		var newUser = Object.assign({}, queryRes._doc);

		if (err) {
			response.success = false;

			if (err.code == '11000') {
				response.message = 'User with such credentials already exists';
			}
			
			return res.json(response);
		}

		var payload = {id: user._id, password: newUser.password};
		var token = jwt.sign(payload, jwtOptions.secretOrKey);

		user.password = undefined;
		
		return res.json({success: true, taken: 'JWT ' + token, user: user});
	});
});

module.exports = router;
