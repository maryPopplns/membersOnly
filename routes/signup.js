const path = require('path');
const express = require('express');
const router = express.Router();
const { signup_get, signup_post } = require(path.join(
  __dirname,
  '../controllers/signup'
));

/* GET users listing. */
router.get('/', signup_get);
router.post('/', signup_post);

module.exports = router;
