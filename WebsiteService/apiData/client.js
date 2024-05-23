const express = require('express');
const axios = require('axios');
const http = require('http');
const ioClient = require('socket.io-client');

const app = express();
const server = http.createServer(app);
const apiBaseUrl = 'http://localhost:5109';

const socket = ioClient('http://localhost:3003');

socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('message', (data) => {
  console.log('Message from server:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

app.get('/join/:channelId', async (req, res) => {
  const { channelId } = req.params;
  socket.emit('joinChannel', channelId);
  res.send(`Joined channel: ${channelId}`);
});

app.get('/message/:string1/:string2/:messageContent', async (req, res) => {
  const { string1, string2, messageContent } = req.params;
  socket.emit('message', { string1, string2, messageContent });

  res.send(`Message sent with string1: ${string1} and string2: ${string2}`);
});

app.post('/message', async (req, res) => {
  const messages = req.body;
  messages.forEach(message => {
    socket.emit('message', message.MessageContent);
  });
  res.sendStatus(200);
});

const PORT = 3007;
server.listen(PORT, () => {
  console.log(`Client server is running on port ${PORT}`);
});
