const express = require('express');
const router = express.Router();
const mainRouter = require('./main');
const boardRouter= require('./board');

console.log('router들어옴');
router.use('/board',boardRouter);
router.use('/',mainRouter);
module.exports = router;