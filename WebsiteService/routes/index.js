var express = require('express');
var router = express.Router();
const dal = require("../apiData/userData.js")

/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = req.session.user; 
  if (!user) {
    res.render('login', { title: 'Login' });
  } else {
    try {
      const { messages, channels } = null;

      const dmList = channels.map(channel => ({
        name: channel.ChannelName,
        members: `${channel.Users.length} Members`
      }));

      const messsageList = messages.map(message => ({
        username: message.Username,
        message: message.MessageContent
      }));

      res.render('index', { title: 'Home', dmList, messsageList, user });
    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});

module.exports = router;