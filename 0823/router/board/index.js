const express = require('express');
const router = express.Router();
const boardRouter = require('./board.controller.js')
//게시판, 읽기, 쓰기, 수정하기
console.log('board들어옴')

router.get('/write',boardRouter.write);
router.post('/write',boardRouter.writePost);
router.get('/read/:id',boardRouter.read);
router.get('/modify/:id',boardRouter.modify);
router.post('/modify/:id',boardRouter.modifyPost);
router.get('/delete/:id',boardRouter.deletefn);
router.get('/',boardRouter.list);
module.exports = router;