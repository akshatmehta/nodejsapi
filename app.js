var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin-list');
var areaRouter = require('./routes/area-list');
var cityRouter = require('./routes/city-list');
var categoryRouter = require('./routes/category-list');
var subcatRouter = require('./routes/sub-cat-list');
var workerRouter = require('./routes/worker-list');
var workerPhotosRouter = require('./routes/worker-photos-list');
var workerRatingRouter = require('./routes/worker-rating-list');
var bookingRouter = require('./routes/booking-list');
var usersRouter = require('./routes/users-list');
var faqRouter = require('./routes/faq-list');
var contactRouter = require('./routes/contact-list');
var addareaRouter = require('./routes/area-add');


var app = express();

var mysql = require("mysql");
//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'sfa'
	});
 global.connection.connect();
	next();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/area', areaRouter);
app.use('/city', cityRouter);
app.use('/category', categoryRouter);
app.use('/subcategory', subcatRouter);
app.use('/userslist', usersRouter);
app.use('/workerlist', workerRouter);
app.use('/workerphoto', workerPhotosRouter);
app.use('/workerrating', workerRatingRouter);
app.use('/booking', bookingRouter);
app.use('/faq', faqRouter);
app.use('/contact', contactRouter);
app.use('/addarea', addareaRouter);

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
