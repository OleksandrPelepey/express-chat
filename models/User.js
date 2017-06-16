var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var saltRounds = 5;
var salt = bcrypt.genSaltSync(saltRounds);

var userSсhema = new Schema({
  nik: {
    type: String,
    required: true,
    unique: true
  },
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// making password hash
userSсhema.pre('save', true, function(next, done) {
  var self = this;

  bcrypt.hash(self.password, salt, function(err, hash) {
    if (err) {
      return done(err);
    } else {
      self.password = hash;
      return done();
    }
  });

  next();
});

/**
 * Check user password
 */
userSсhema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSсhema);

module.exports = User;
