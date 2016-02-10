/*
 * members.js
 *
 * Router that handles all requests sent to '/members'
 */

var express = require('express');
var router  = express.Router();

var Member = require('../models/member');

/*
 * Serves create member page
 */
router.get('/create', function(req, res) {
    res.send('Create a member!');
});

/*
 * Creates new member with request body
 * Redirects to create member confirmation page on success
 * Redirects to create member page on failure
 */
router.post('/create', function(req, res) {
    Member.create(req.body, function(err) {
        if (err) console.error(err);

        res.redirect('./create');
    });
});

module.exports = router;