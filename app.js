var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//require mongoose mondule
const mongoose = require("mongoose")
//require cors module
const cors = require("cors")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//require posts router
const postsRouter = require('./routes/posts')

var app = express();
//make app use cors
app.use(cors({
  origin: ["http://localhost:3000", "https://mern-posts-app.onrender.com"]
}))

//connect to mongoDB 

const uri =
'mongodb+srv://wallinderjames:Wallinder17a@myfirstcluster.lyp9vrj.mongodb.net/TwitterCloneData'
mongoose.Promise = global.Promise;

mongoose.connect(uri,{
  dbname: 'TwitterCloneData'
})
//incase of error
mongoose.connection.on('error', () => {
  console.log('Could not connect to the database. Exiting now...')
  process.exit()
})

let PORT = 8080 || process.env.PORT;
//once successfully connected, listen on the specified port
mongoose.connection.once('open', () => {
  console.log('Successfully connected to the database')
  app.listen(PORT, () => {
    console.log("Application listening on port: " + PORT)
  })
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter)

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
