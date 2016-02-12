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
    // res.send('Please login');
    res.render('member-login');
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
                alert_error: 'Invalid email/password'
            });
        }

        req.login(user, function(err) {
            if (err) {
                return res.render('member-login', {
                    alert_error: 'There was a problem logging you in. Please try again later'
                })
            }

            return res.redirect('/');
        });
    })(req, res);
});

// router.post('/', passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '../login'
//     })
// );

module.exports = router;