const express = require('express');
const router = express.Router();

// [ HOMEPAGE ]
router.get('/', function (req, res, next) {
  console.log(res.locals.currentUser);
  res.render('homepage');
});

module.exports = router;
