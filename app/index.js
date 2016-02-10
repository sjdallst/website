var express = require('express');
var router  = express.Router();

router.use('/', require('./base'));
router.use('/login', require('./login'));
router.use('/members', require('./members'));

module.exports = router;