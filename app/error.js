/*
 * error.js
 *
 * Router that handles all requests sent to '/[error code]'
 */

var express = require('express');
var router  = express.Router();

/*
 * Serves 404 error page
 */
router.get('/404', function(req, res) {
    res.status(404).render('404');
});

/*
 * Serves 500 error page
 */
router.get('/500', function(req, res) {
    res.status(500).render('500');
});

module.exports = router;