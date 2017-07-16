var express = require('express');
var messagesRoutes = require('./message.js');
var chatRoomRoutes = require('./chat-room.js');
var bodyParser = require('body-parser');
var passport = require('passport');

var router = express.Router();

router.use(bodyParser.json());

router.use('/api', 
	passport.authenticate('jwt', { session: false }),
	messagesRoutes, 
	chatRoomRoutes
);

module.exports = router;
