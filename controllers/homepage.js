const path = require('path');
const { check } = require('express-validator');
const Message = require(path.join(__dirname, '../models/message'));
const debug = require('debug')('membersonly:homepageController');

// [ HOMEPAGE GET ]
exports.homepage_get = function (req, res, next) {
  // TODO query messages
  Message.find()
    .then((results) => {
      console.log(results);
      res.render('homepage');
    })
    .catch((error) => next(error));
};

// [ HOMEPAGE POST ]
exports.homepage_post = [
  check('title').trim().escape(),
  check('message').trim().escape(),
  function (req, res, next) {
    const { title, message } = req.body;

    Message.create(
      {
        title,
        message,
        date: new Date(),
        author: req.user.id,
      },
      function (error, user) {
        if (error) {
          return next(error);
        }
        next();
      }
    );
  },
  function (req, res, next) {
    console.log('hola');
    res.render('homepage');
    // TODO copy from above
  },
];
