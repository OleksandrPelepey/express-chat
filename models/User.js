var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Shema = mongoose.Schema;
var saltRounds = 5;
var salt = bcrypt.genSaltSync(saltRounds);

var userShema = new Shema({
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
userShema.pre('save', true, function(next, done) {
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
userShema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userShema);

module.exports = User;
