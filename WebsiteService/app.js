var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var createAccountRouter = require('./routes/createAccount');
 
const app = express();

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
app.use('/createAccount', createAccountRouter)

app.use(function(req, res, next) {
    next(createError(404));
});

app.use((req, res, next) => {
    res.status(404).send('404: Page Not Found');
  });
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500: Internal Server Error');
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;