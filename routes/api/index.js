var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var messagesRoutes = require('./messages');
var chatRoomRoutes = require('./chat-rooms');
var usersRoutes = require('./users');

var router = express.Router();

router.use(bodyParser.json());

router.use('/api', 
	passport.authenticate('jwt', { session: false }),
	messagesRoutes, 
	chatRoomRoutes,
	usersRoutes
);

module.exports = router;
