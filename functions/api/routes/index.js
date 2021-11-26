// 카테고리나 메인으로 연결해주는 파일

const express = require('express');
const router = express.Router();

router.use('/main', require('./main'));
router.use('/category', require('./category'));
router.use('/review', require('./review'));

module.exports = router;