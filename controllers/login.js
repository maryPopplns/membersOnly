const path = require('path');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { check } = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;
const User = require(path.join(__dirname, '../models/user'));
const debug = require('debug')('membersonly:loginController');

// [ DEFINE LOCAL STRATEGY ]
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  })
);

// [ SERIALIZE/DESERIALIZE USER ]
passport.serializeUser(function (user, done) {
  console.log('serialize');
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// [ LOGIN GET ROUTE ]
exports.login_get = function (req, res) {
  res.render('login');
};

// [ LOGIN POST ROUTE ]
exports.login_post = [
  check('username').trim().escape(),
  check('password').trim().escape(),
  function (req, res, next) {
    passport.authenticate('local', function (error, user, info) {
      if (error) {
        return next(error);
      } else if (!user) {
        return res.render('login', { message: info.message });
      } else {
        req.logIn(user, function (err) {
          if (error) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
    })(req, res, next);
  },
];
