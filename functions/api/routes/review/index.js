const express = require('express');
const router = express.Router();

router.get('/like/:id', require('./reviewLikeGET'));
router.get('/list', require('./reviewListGET'));

module.exports = router;