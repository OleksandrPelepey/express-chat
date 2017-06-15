var mongoose = require('mongoose');

var Shema = mongoose.Schema;

var userShema = new Shema({
  nik: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', userShema);

module.exports = User;
