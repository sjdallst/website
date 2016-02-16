/*
 * logout.js
 *
 * Router that handles all requests sent to '/logout'
 */

var express = require('express');
var router = express.Router();

/*
 * Logs user out and serves logout page
 */
router.all('/', function(req, res) {
    req.logout();
    res.locals.user = null; // clear user object from locals since this was set before the logout
    res.render('logout');
});

module.exports = router;