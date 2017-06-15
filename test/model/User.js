var expect = require('chai').expect;
var dbConection = require('../../config/db');
var User = require('../../models/User');

before(function(done) {
	// clear test db before test
	User.deleteMany({}, done);
});

describe('User Model tests', function() {
	it('Should make hash of passwords to db', function(done) {
		var user = new User({
			nik: 'karpa',
			full_name: 'Oksana Pelepey',
			password: '12',
			email: 'oksana.pelepey@gmail.com'
		});

		user.save(function(err, user) {
			if (err) done(err);
			expect(user.checkPassword('12')).to.be.true;
			done();
		});
	});
});