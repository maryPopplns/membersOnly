const path = require('path');
const express = require('express');
const router = express.Router();
const { logout_get } = require(path.join(__dirname, '../controllers/logout'));

router.get('/', logout_get);

module.exports = router;
