const path = require('path');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const User = require(path.join(__dirname, '../models/user'));
const debug = require('debug')('membersonly:signupController');

exports.login_get = function (req, res) {
  res.render('login');
};

exports.login_post = function (req, res) {
  res.end('login post');
};
