const express = require('express');
const messagesRoutes = require('./api/messages.js');
const bodyParser = require('body-parser');

let router = express.Router();

router.use('/api', bodyParser.json());
router.use('/api', messagesRoutes);

module.exports = router;
