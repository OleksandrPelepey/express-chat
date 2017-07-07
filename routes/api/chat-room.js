var express = require('express');
var ChatRoom = require('../../models/ChatRoom');
var router = express.Router();

/**
 * Get chat rooms
 * accept q get variable for searching
 */
router.get('/chat-rooms', function(req, res) {
	ChatRoom.find({})
		.select('-password -__v')
		.populate('_author', 'nik full_name')
		.exec(function(err, rooms) {
			if (err) return res.json([]);
			return res.json(rooms);
		});
});

/**
 * Get chat-room by id
 */
router.get('/chat-room/:id', function(req, res) {
	ChatRoom.find({_id: req.params.id})
		.select('-password -__v')
		.populate('_author', 'nik full_name')
		.exec(function(err, room) {
			if (err) return res.json({});
			return res.json(room);
		});
});

/**
 * Add new chat-room
 */
router.post('/chat-room', function(req, res) {
	var newRoomParam = Object.assign({}, req.body);
	newRoomParam._author = req.user.id;

	ChatRoom.create(newRoomParam, function(err, doc) {
		if (err) return res.json({});
		return res.json(doc);
	})
});

/**
 * Update chat-room
 */
router.put('/chat-room/:chatRoomId', function(req, res) {
	
});

/**
 * Delete chat-room and all its messages
 */
router.delete('/chat-room/:chatRoomId', function(req, res) {
	
});

module.exports = router;
