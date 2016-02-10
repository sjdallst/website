/*
 * auth.js
 *
 * Configuration options for authentication with
 * PassportJS (http://passportjs.org)
 */

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var Member = require('../models/member');

/*
 * Initializes passport with authentication,
 * serialization and deserialization functions
 *
 * This function must be called before any authentication requests are received
 */
exports.init = function() {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        Member.authenticate
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(Member.findById);
}