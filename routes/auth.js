var express = require('express');
var jwt = require('jwt-simple');  
var bodyParser = require('body-parser');
var config = require('../config/jwt');  
var User = require('../models/User');

var router = express.Router();

router.use(bodyParser.json());

// Signin route
router.post('/signin', function(req, res) {
	if (req.body.email && req.body.password) {
		var email = req.body.email;
		var password = req.body.password;

		User.findOne({email: email}, function(err, user) {
			if (err) {
				res.json({
					success: false,
					error: 'Database request error.'
				});
			} else if(user) {
				if (user.checkPassword(password)) {
					var payload = makePayload(user);
					var taken = makeJwtUserTaken(payload);

					res.json({
						success: true,
						taken: taken,
						user: payload
					});
				} else {
					res.json({
						success: false,
						message: 'The passwords do not math.'
					});
				}
			} else {
				res.json({
					success: false,
					message: 'User with such email does not exists.'
				});
			}
		});
	} else {
		res.json({
			success: false,
			message: 'Email and password is required.'
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

		var payload = makePayload(newUser);
		var taken = makeJwtUserTaken(payload);

		return res.json({
			success: true,
			user: payload,
			taken: taken
		});
	});
});

function makePayload(user) {
	var payload = {
		id: user.id,
		nik: user.nik,
		full_name: user.full_name,
		email: user.email
	};
	return payload;
}

function makeJwtUserTaken(payload) {
	var taken = 'JWT ' + jwt.encode(payload, config.jwtSecret);
	return taken;
}

module.exports = router;
