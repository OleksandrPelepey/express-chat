const express = require('express');

let router = express.Router();
let messages = [
  {id: '1', body: 'Lorem ispum'},
  {id: '2', body: 'Dolor set emet'}
];

router.get('/messages', (req, res) => {
  res.send(messages);
});

router.post('/messages', (req, res) => {
  let new_messages = req.body.new_messages;
  console.log(new_messages);

  if (new_messages) {
    new_messages.forEach((new_message) => {
      new_message.id = +messages[messages.length - 1].id + 1;
    });

    messages = messages.concat(new_messages);

    res.send(new_messages);
  } else {
    res.send([]);
  }

});

module.exports = router;
