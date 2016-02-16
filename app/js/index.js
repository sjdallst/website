var express = require('express');
var router  = express.Router();

router.use('/', require('./base'));
router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/members', require('./members'));
router.use('/profile', require('./profile'));

router.use('/', require('./error'));

/*
 * Redirect all unhandled requests to 404
 * This should be the last route listed
 */
router.get('*', function(req, res) {
    res.redirect('/404');
});

module.exports = router;