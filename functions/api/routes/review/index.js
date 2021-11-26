const express = require('express');
const router = express.Router();

router.post('/like', require('./reviewLikePOST'));
router.get('/list', require('./reviewListGET'));

module.exports = router;