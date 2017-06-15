var express = require('express');
var messagesRoutes = require('./api/message.js');
var chatRoomRoutes = require('./api/chat-room.js');
var authJWT = require('../auth-jwt')();

var router = express.Router();

router.use('/api', 
	authJWT.initialize(), 
	authJWT.authenticate(), 
	messagesRoutes, 
	chatRoomRoutes
);

module.exports = router;
