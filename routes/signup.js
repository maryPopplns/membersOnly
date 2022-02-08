const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  // create user model
  // create form to be submitted
  // install mongoose
  // connect to mongo
  res.send('signup');
});

module.exports = router;
