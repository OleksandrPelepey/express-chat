var express = require('express');
var jwt = require('jwt-simple');  
var config = require('../config/jwt');  
var User = require('../models/User');
var router = express.Router();

router.post('/signin', function(req, res) {
	if (req.body.email && req.body.password) {
		var email = req.body.email;
		var password = req.body.password;

		User.findOne({email: email}, function(err, user) {
			if (err) {
				res.status(401).json({
					success: false,
					error: 'Database request error.'
				});
			} else if(user) {
				if (user.password == password) {
					var payload = {
						id: user._id,
						nik: user.nik,
						email: user.email
					};
					var taken = 'JWT ' + jwt.encode(payload, config.jwtSecret);

					res.json({
						success: true,
						taken: taken
					});
				} else {
					res.status(401).json({
						success: false,
						message: 'The passwords do not math.'
					});
				}
			} else {
				res.status(401).json({
					success: false,
					message: 'User with such email does not exist.'
				});
			}
		});
	} else {
		res.status(401).json({
			success: false,
			message: 'Email and password is required.'
		});
	}
});

module.exports = router;
