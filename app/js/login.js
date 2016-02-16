/*
 * login.js
 *
 * Router that handles all requests sent to '/login'
 */

var express = require('express');
var router = express.Router();

var passport = require('passport');

var alerts = require('../values/alerts');

/*
 * Serves login page
 */
router.get('/', function(req, res) {
    if (!req.user) {
        res.render('member-login');
    } else {
        res.redirect('/');
    }
});

/*
 * Logs in user with request body credentials
 * Redirects to home page on success
 * Redirects to login page on failure
 */
router.post('/', function(req, res) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            return res.render('member-login', {
                alert_error: alerts.errorLoginCredentials
            });
        }

        req.login(user, function(err) {
            if (err) {
                return res.render('member-login', {
                    alert_error: alerts.errorLogin
                });
            }

            return res.redirect('/');
        });
    })(req, res);
});

module.exports = router;