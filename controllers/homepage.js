const path = require('path');
const { check } = require('express-validator');
const Message = require(path.join(__dirname, '../models/message'));
const debug = require('debug')('membersonly:homepageController');

// [ HOMEPAGE GET ]
exports.homepage_get = function (req, res, next) {
  Message.find()
    .then((messages) => {
      res.render('homepage', { messages });
    })
    .catch((error) => next(error));
  // TODO query messages
};

// [
//   {
//     _id: new ObjectId("62044be3ec0db23bc764f4aa"),
//     title: 'title of the message',
//     message: 'message body',
//     date: 2022-02-09T23:18:59.954Z,
//     author: new ObjectId("6203fbe8b749982172b761d6"),
//     __v: 0
//   },
//   {
//     _id: new ObjectId("62045023eb35c7a48e74e2bb"),
//     title: 'numba 2',
//     message: 'the message',
//     date: 2022-02-09T23:37:07.616Z,
//     author: new ObjectId("6203fbe8b749982172b761d6"),
//     __v: 0
//   },
//   {
//     _id: new ObjectId("620451048daae694fd803a54"),
//     title: 'adsfa',
//     message: 'sadfs',
//     date: 2022-02-09T23:40:52.994Z,
//     author: new ObjectId("6203fbe8b749982172b761d6"),
//     __v: 0
//   }
// ]

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
    Message.find()
      .then((messages) => {
        res.render('homepage', { messages });
      })
      .catch((error) => next(error));
  },
];
