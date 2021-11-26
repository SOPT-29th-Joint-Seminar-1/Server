const express = require('express');
const router = express.Router();

router.post('/like', require('./reviewLikeGET'));
router.get('/list', require('./reviewListGET'));

module.exports = router;