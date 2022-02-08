const path = require('path');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const User = require(path.join(__dirname, '../models/user'));
const debug = require('debug')('membersonly:signupController');

exports.signup_get = function (req, res) {
  res.render('signup');
};

exports.signup_post = [
  check('fullname').trim().escape(),
  check('username').trim().escape(),
  check('password').trim().escape(),
  function (req, res, next) {
    const { fullname, username, password } = req.body;
    bcrypt.genSalt(10, function (error, salt) {
      if (error) {
        return next(error);
      }
      bcrypt.hash(password, salt, function (error, hash) {
        if (error) {
          return next(error);
        }
        User.create(
          {
            fullname,
            username,
            password: hash,
            membership: 'member',
            admin: false,
          },
          function (error) {
            if (error) {
              return next(error);
            }
            res.redirect('/login');
          }
        );
      });
    });
  },
];
