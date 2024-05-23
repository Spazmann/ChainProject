const express = require('express');
const axios = require('axios');
const http = require('http');
const socketIo = require('socket.io');
const dal = require("../apiData/messageData.js");
var router = express.Router();
const ioClient = require('socket.io-client');
const moment = require('moment');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const apiBaseUrl = 'http://localhost:5109';

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('joinChannel', async (channelId) => {
    console.log(`User joined channel: ${channelId}`);
    try {
      const messages = await dal.getChannelMessages(channelId);

      messages.forEach(message => {
        socket.emit('message', {
          username: message.Username,
          messageContent: message.MessageContent
        });
      });

      socket.on('newMessage', (message) => {
        console.log('New message received:', message);
        io.emit('message', message);
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  });
});

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
        id: channel.channelId,
        members: `${channel.users.length} Members`
      }));

      res.render('index', { title: 'Home', dmList, user });
    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});

router.get('/:channelId', async function(req, res, next) {
  const user = req.session.user;
  if (!user) {
    res.render('login', { title: 'Login' });
  } else {
    try {
      const channels = await dal.getUserChannels(user.id);
      const messages = await dal.getChannelMessages(req.params.channelId);

      messages.forEach(message => {
        if (message.date) {
          message.dateObject = new Date(message.date);
          if (isNaN(message.dateObject)) {
            console.log(`Failed to parse date: ${message.date}`);
          } else {
            console.log(`Original date: ${message.date}, Parsed date: ${message.dateObject}`);
          }
        }
      });

      // Sort messages by the parsed date in descending order
      messages.sort((a, b) => b.dateObject - a.dateObject);

      const dmList = channels.map(channel => ({
        name: channel.channelName,
        id: channel.channelId,
        members: `${channel.users.length} Members`
      }));

      const messageList = messages.map(message => ({
        username: message.username,
        message: message.messageContent,
        date: message.dateObject ? message.dateObject.toLocaleString() : 'Invalid Date'
      }));

      const channelName = dmList.find(channel => channel.id === req.params.channelId)?.name || 'Unknown Channel';

      res.render('index', { title: 'Home', dmList, messageList, user, channelName });

      const socket = ioClient('http://localhost:3003');
      socket.emit('joinChannel', req.params.channelId);

    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});


module.exports = router;
