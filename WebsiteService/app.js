var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');
const dal = require('./apiData/messageData')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var createAccountRouter = require('./routes/createAccount');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(session({
  secret: '1234', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/createAccount', createAccountRouter);

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
          messageContent: message.MessageContent,
          date: message.date // Ensure the date is included
        });
      });

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  });

  socket.on('newMessage', async (message) => {
    console.log('New message received:', message);

    // Save the message to the database
    try {
      await dal.saveMessage(message);

      // Broadcast the message to all clients in the same channel
      io.emit('message', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Log the error
  console.error(err.stack);
  
  // Respond with a 500 status and an error message
  res.status(err.status || 500);
  res.send('500: Internal Server Error');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
