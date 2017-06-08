const express = require('express');
const apiRoutes = require('./routes/api-routes.js');

const app = express();

app.use('/bower_components', express.static('bower_components'));
app.use( express.static('public') );
app.use('/', apiRoutes);

app.listen(3000, () => { console.log('Server is runing') });
