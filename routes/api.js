var express = require('express');
var messagesRoutes = require('./api/message.js');
var chatRoomRoutes = require('./api/chat-room.js');
var authJWT = require('../auth-jwt')();
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

router.use('/api', 
	authJWT.initialize(), 
	authJWT.authenticate(), 
	messagesRoutes, 
	chatRoomRoutes
);

module.exports = router;
