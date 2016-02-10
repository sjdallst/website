/*
 * login.js
 *
 * Router that handles all requests sent to '/login'
 */

var express = require('express');
var router = express.Router();

var passport = require('passport');

/*
 * Serves login page
 */
router.get('/', function(req, res) {
    res.send('Please login');
});

/*
 * Logs in user with request body credentials
 * Redirects to home page on success
 * Redirects to login page on failure
 */
router.post('/', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: './',
        failureFlash: true
    })
);

module.exports = router;