const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  // install mongoose
  // connect to mongo
  res.render('signup');
});

module.exports = router;
