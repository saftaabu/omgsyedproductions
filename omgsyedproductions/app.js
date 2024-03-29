var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mariadb = require('mariadb/callback');
const cart = [];
const session = require('express-session');

const db = mariadb.createConnection ({host: 'eagle.cdm.depaul.edu', user: 'saftaabu', password: 'saftaabu', database: 'omgsyedb'});

// connect to database
db.connect((err) => {
  if (err) {
    console.log("not connected due to error: " + err);
  } else
	{
    console.log("connected to db");
  }
});

global.db = db;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var layouts = require('express-ejs-layouts');
var dynaRouter = require('./routes/dyna');
var packagesRouter = require('./routes/packages');
var privacyRouter = require('./routes/privacy');
var helpRouter = require('./routes/help');
var productRouter = require('./routes/product');
var catalogRouter = require('./routes/catalog');
var customerRouter = require('./routes/customer');




var app = express();
app.use(session({secret: 'omgsyedproductions'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use('/dyna', dynaRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/packages', packagesRouter);
app.use('/privacy', privacyRouter);
app.use('/help', helpRouter);
app.use('/product', productRouter);
app.use('/catalog', catalogRouter);
app.use('/customer', customerRouter);
 



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
