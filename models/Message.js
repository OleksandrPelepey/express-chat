var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var messageSchema = new Schema({
  _author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  _chat: {
    type: ObjectId,
    required: true,
    ref: 'ChatRoom'
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
