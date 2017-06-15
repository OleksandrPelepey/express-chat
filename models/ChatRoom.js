var mongoose = require('mongoose');

var Shema = mongoose.Schema;
var chatRoomSchema = new Schema({
  author_id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true
  },
  public: {
    type: Boolean,
    require: true,
    default: true
  },
  password: String,
  members: [mongoose.Schema.Types.ObjectId]
});

var ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
