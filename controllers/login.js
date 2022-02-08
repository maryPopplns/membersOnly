const path = require('path');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const User = require(path.join(__dirname, '../models/user'));
const debug = require('debug')('membersonly:loginController');

exports.login_get = function (req, res) {
  res.render('login');
};

exports.login_post = [
  check('username').trim().escape(),
  check('password').trim().escape(),
  function (req, res) {
    const { username, password } = req.body;
    debug(username);
    debug(password);
    res.end('login post');
  },
];
