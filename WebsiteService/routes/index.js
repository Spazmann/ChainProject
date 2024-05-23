var express = require('express');
var router = express.Router();
const dal = require("../apiData/messageData.js")

/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = req.session.user;
  if (!user) {
    res.render('login', { title: 'Login' });
  } else {
    try {
      const channels = await dal.getUserChannels(user.id);

      const dmList = channels.map(channel => ({
        name: channel.channelName,
        members: `${channel.users.length} Members`
      }));

      res.render('index', { title: 'Home', dmList, user });
    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});

router.get('/{channelId}', async function(req, res, next) {
  const user = req.session.user; 
  if (!user) {
    res.render('login', { title: 'Login' });
  } else {
    try {
      const channels = null;
      const messages = null;

      const dmList = channels.map(channel => ({
        name: channel.name,
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