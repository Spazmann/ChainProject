const express = require('express');

const socketIo = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {
    console.log('Message received:', msg);
  });

  socket.on('messageCreated', (msg) => {
    console.log('Message Created:', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/',async (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
