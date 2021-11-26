const express = require('express');
const router = express.Router();

router.get('/:categoryId', require('./categoryGET'));
router.get('/', require('./allCategoryGET'));

module.exports = router;