var express = require('express');
var Message = require('../../models/Message');

var router = express.Router();

/**
 * Get messages
 */
router.get('/messages/:chatRoomId', function(req, res) {
	Message
		.find({_chat: req.params.chatRoomId})
		.select('-_chat')
		.populate('_author', 'nik full_name')
		.exec(function(err, messages) {
			if (err) return res.json([]);
			return res.json(messages);
		});
});

/**
 * Get message
 */
router.get('/message/:messageId', function(req, res) {
	
});

/**
 * Post new message
 */
router.post('/message/:chatRoomId', function(req, res) {
	var newMessage = Object.assign({}, req.body);
	newMessage._chat = req.params.chatRoomId;
	newMessage._author = req.user.id;

	Message.create(newMessage, function(err, newMessage) {
		if (err) return res.json([]);
		return res.json(newMessage);
	});
});

/**
 * Update message
 */
router.put('/message/:messageId', function(req, res) {
	
});

/**
 * Delete message
 */
router.delete('/message/:messageId', function(req, res) {
	
});

module.exports = router;
