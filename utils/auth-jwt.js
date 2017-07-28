var passport = require('passport');
var passportJWT = require('passport-jwt');
var optJWT = require('../config/jwt');

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;

var User = require('../models/User');

module.exports = function() {
	var jwtStrategy = new JwtStrategy(optJWT, function(jwt_payload, done) {

		var password = jwt_payload.password;

		User.findOne({_id: jwt_payload.id}, function(err, user) {
			if (err) {
				return done(err);
			} 

			if (!user) {
				return done(null, false, { message: 'Such user doesn t exists' });
			}

			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, user);
		});

	});

	passport.use(jwtStrategy);
};
