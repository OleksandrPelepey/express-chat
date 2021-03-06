var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var chatRoomSchema = new Schema({
  _author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    require: true
  },
  public: {
    type: Boolean,
    require: true,
    default: true
  },
  users: {
    type: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
      }
    ],
    default: []
  }
});

var ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
