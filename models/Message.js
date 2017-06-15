var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  body: String,
  pub_time: {
    type: Date,
    require: true,
    default: Date.now
  }
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
