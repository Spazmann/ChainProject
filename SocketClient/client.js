const express = require('express');
const axios = require('axios');
const http = require('http');
const ioClient = require('socket.io-client');

const app = express();
const server = http.createServer(app);
const apiBaseUrl = 'http://localhost:5109';

const socket = ioClient('http://localhost:3003');

const getUser = async () => {
  const response = await axios.get(`${apiBaseUrl}/message`);
  const user = response.data;
  return user;
};

socket.on('connect', () => {
  console.log('Connected to the server');
  socket.emit('message', 'Hello Server!');

  socket.on('message', (data) => {
    console.log('Message from server:', data);
  });

  socket.on('customEvent', (data) => {
    console.log('Custom event from server:', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
});

app.get('/message/:string1/:string2/:messageContent', async (req, res) => {
  const { string1, string2, messageContent } = req.params;
  socket.emit('message', { string1, string2, messageContent });

  res.send(`Message sent with string1: ${string1} and string2: ${string2}`);
});

const PORT = 3007;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
