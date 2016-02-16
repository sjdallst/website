/*
 * members.js
 *
 * Router that handles all requests sent to '/members'
 */

var express = require('express');
var router  = express.Router();

var async = require('async');

var Member = require('../../models/Member');
var PledgeClass = require('../../models/PledgeClass');
var MemberStatus = require('../../models/MemberStatus');
var MemberRole = require('../../models/MemberRole');

/*
 * Serves create member page
 */
router.get('/create', function(req, res) {
    async.parallel({
        pledge_classes: function(cb) {
            PledgeClass.getAll(cb);
        },
        member_statuses: function(cb) {
            MemberStatus.getAll(cb);
        },
        member_roles: function(cb) {
            MemberRole.getAll(cb);
        }
    },
    function(err, results) {
        if (err) {
            console.error(err);
            res.redirect('/500');
        }

        switch (req.query.alert) {
            case 'error':
                results.alert_error = errorMemberCreate;
                break;
        }

        res.render('member-create', results);
    });
});

/*
 * Creates new member with request body
 * Redirects to create member confirmation page on success
 * Redirects to create member page on failure
 */
router.post('/create', function(req, res) {
    Member.create(req.body, function(err) {
        if (err) {
            console.error(err);
            return res.redirect('./create?alert=error');
        }

        res.render('member-create-confirm', req.body);
    });
});

module.exports = router;