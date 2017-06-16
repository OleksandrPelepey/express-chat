var expect = require('chai').expect;
var dbConection = require('../../config/db');
var User = require('../../models/User');
var ChatRoom = require('../../models/ChatRoom');

describe('ChatRoom model testing', function() {	
	
	var user = new User({
		nik: 'karpa',
		full_name: 'Oksana Pelepey',
		password: '12',
		email: 'oksana.pelepey@gmail.com'
	});

	var chatRoom = new ChatRoom({
		_author: user.id,
		name: 'dsfd',
		public: false
	});

	it('Chat room model should not accept private room without password', function(done) {
		chatRoom.validate(function(error) {
			expect(error.errors['password'].message).to.be.equal('Password is required for private accounts.');
			done();
		});
	});

	it('Chat room model should accept null as a password for public rooms', function(done) {
		chatRoom.public = true;
		chatRoom.validate(function(e) {
			expect(e).to.be.null;
			done();
		});
	});
});