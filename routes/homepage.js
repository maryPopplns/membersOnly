const path = require('path');
const express = require('express');
const router = express.Router();
const { homepage_get, homepage_post } = require(path.join(
  __dirname,
  '../controllers/homepage'
));

// [ HOMEPAGE ]
router.get('/', homepage_get);
router.post('/', homepage_post);

module.exports = router;
