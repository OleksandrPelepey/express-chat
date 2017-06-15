var express = require('express');
var router = express.Router();

/**
 * Get chat rooms
 * accept q get variable for searching
 */
router.get('/chat-rooms', function(req, res) {
	res.json(req.user);
});

/**
 * Get chat-room by id
 */
router.get('/chat-room/:id', function(req, res) {
	
});

/**
 * Add new chat-room
 */
router.post('/chat-room', function(req, res) {
	
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
