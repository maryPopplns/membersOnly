const path = require('path');
const express = require('express');
const router = express.Router();
const { login_get, login_post } = require(path.join(
  __dirname,
  '../controllers/login'
));

/* GET users listing. */
router.get('/', login_get);
router.post('/', login_post);

module.exports = router;
