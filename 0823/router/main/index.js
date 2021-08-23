const express = require('express');
const router = express.Router();
const mainConteroller = require('./main.controller');

router.get('/',mainConteroller.main);

module.exports = router;