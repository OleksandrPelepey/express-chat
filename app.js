const express = require('express');
const app = express();

app.use('/bower_components', express.static('bower_components'));
app.use( express.static('public') );

app.listen(3000, () => { console.log('Server is runing') });
