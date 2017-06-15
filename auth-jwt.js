var passport = require('passport');
var passportJWT = require('passport-jwt');
var config = require('./config/jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var User = require('./models/User');
var params = {
	secretOrKey: config.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
	var strategy = new Strategy(params, function(payload, done) {
		if (payload) {
			return done(null, payload);
		} 
		return done(new Error('Payload error'), null);
	});

	passport.use(strategy);

	return {
		initialize: function() {
			return passport.initialize();
		},
		authenticate: function() {
			return passport.authenticate('jwt', config.jwtSession);
		}
	};
};
