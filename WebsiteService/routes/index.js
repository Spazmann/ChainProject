const express = require('express');
const dal = require("../apiData/messageData.js");
const moment = require('moment');
const router = express.Router();

router.get('/', async function(req, res, next) {
  const user = req.session.user;
  if (!user) {
    res.render('login', { title: 'Login' });
  } else {
    res.redirect('/@me');
  }
});

router.get('/@me', async function(req, res, next) {
  const user = req.session.user;
  if (!user) {
    res.render('login', { title: 'Login' });
  } else {
    try {
      const channels = await dal.getUserChannels(user.id);

      if (!Array.isArray(channels)) {
        res.render('index', { title: 'Home', user });
      } else {
        const dmList = channels.map(channel => ({
          name: channel.channelName,
          id: channel.channelId,
          members: `${channel.users.length} Members`
        }));

        res.render('index', { title: 'Home', dmList, user });
      }

    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});

router.get('/@me/:channelId', async function(req, res, next) {
  const user = req.session.user;
  if (!user) {
    res.render('login', { title: 'Login' });
  } else {
    try {
      const channels = await dal.getUserChannels(user.id);
      const messages = await dal.getChannelMessages(req.params.channelId);

      const dmList = channels.map(channel => ({
        name: channel.channelName,
        id: channel.channelId,
        members: `${channel.users.length} Members`
      }));

      const channelName = dmList.find(channel => channel.id === req.params.channelId)?.name || 'Unknown Channel';

      if (!Array.isArray(messages)) {
        res.render('index', { title: 'Home', user, dmList, messageList: [], channelName });
        return;
      }

      messages.forEach(message => {
        if (message.date) {
          message.dateObject = new Date(message.date);
        }
      });

      messages.sort((a, b) => b.dateObject - a.dateObject);

      const messageList = messages.map(message => ({
        username: message.username,
        message: message.messageContent,
        date: message.dateObject ? message.dateObject.toLocaleString() : 'Invalid Date'
      }));



      res.render('index', { title: 'Home', dmList, messageList, user, channelName });
    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});

module.exports = router;
