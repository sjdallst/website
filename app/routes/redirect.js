/*
 * redirect.js
 *
 * Common redirects in one module
 */

/*
 * Redirects to login
 */
module.exports.toLogin = function(res) {
    res.redirect('/login');
};