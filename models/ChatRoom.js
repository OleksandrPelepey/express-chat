var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var chatRoomSchema = new Schema({
  author_id: {
    type: ObjectId,
    required: true
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
  password: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        if (!this.public) return !!v;
        return true;
      },
      message: 'Password is required for private accounts.'
    }
  }
});

var ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
