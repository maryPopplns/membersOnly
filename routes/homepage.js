const express = require('express');
const router = express.Router();

// [ HOMEPAGE ]
router.get('/', function (req, res, next) {
  res.render('homepage');
});

module.exports = router;
