require('dotenv').config();
const path = require('path');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const createError = require('http-errors');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const debug = require('debug')('membersonly:app');

const loginRouter = require(path.join(__dirname, 'routes/login'));
const logoutRouter = require(path.join(__dirname, 'routes/logout'));
const homeRouter = require(path.join(__dirname, 'routes/homepage'));
const signupRouter = require(path.join(__dirname, 'routes/signup'));

const app = express();

// [ MONGO CONNECTION ]
mongoose.connect(process.env.MONGO_STRING_LOCAL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongo connection error'));

// [ SESSION STORAGE ]
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_STRING_LOCAL,
});

// [ VIEW ENGINE ]
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// [ SESSION ]
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: oneDay },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// [ SET USER TO LOCAL ]
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// [ ROUTES ]
app.use('/', homeRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

// [ ERROR HANDLER ]
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
