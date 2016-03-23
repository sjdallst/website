/*
 * profile.js
 *
 * Router that handles all requests sent to '/[error code]'
 */

var express = require('express');
var router  = express.Router();
var redirect = require('./redirect');

var async = require('async');

var Member = require('../../models/Member');
var PledgeClass = require('../../models/PledgeClass');
var MemberStatus = require('../../models/MemberStatus');
var MemberRole = require('../../models/MemberRole');

var alerts = require('../values/alerts');

var files = require('../../config/files');

/*Namespace for functions specific to profile*/
var profileFuncs = function() {
    /*sends a json version of member to the user*/
    function sendMember(res, err, member) {
        if(err) {
            /*an error was raised when searching for member, log to console*/
            console.error(err); 
            return
        } 

        if(!member) {
            /*the member the user queried for does not exist*/
            res.send("Try again");
            return
        } 

        
        /*send the member to the user*/
        res.render('member-profile', member);
    }

    return {
        sendMember:sendMember
    }

}();

/*
 * Serves profile page
 */
router.get('/', function(req, res) {
    var sendMember = profileFuncs.sendMember.bind(null, res)

    if(req.query && req.query.user) {   
        Member.findFullById(req.query.user, sendMember);
        return;
    }

    if (!req.user) {
        return redirect.toLogin(res);
    }
    
    Member.findFullById(req.user.id, sendMember);
});

/*
 * Serves profile edit page
 */
router.get('/edit', function(req, res) {
    if (!req.user) {
        return redirect.toLogin(res);
    }

    async.parallel({
        pledge_classes: function(cb) {
            PledgeClass.getAll(cb);
        },
        member_statuses: function(cb) {
            MemberStatus.getAll(cb);
        },
        member_roles: function(cb) {
            MemberRole.getAll(cb);
        },
        user: function(cb) {
            Member.findFullById(req.user.id, cb);
        }
    },
    function(err, results) {
        if (err) {
            console.error(err);
            return res.redirect('/500');
        }

        switch (req.query.alert) {
            case 'error':
                results.alert_error = alerts.errorProfileEdit;
                break;
            case 'success':
                results.alert_success = alerts.successProfileEdit;
        }

        res.render('member-edit', results);
    });
});

/*
 * Saves updated member information with request body
 * Redirects to edit profile page
 */
router.post('/edit', function(req, res) {
    if (!req.user) {
        return redirect.toLogin(res);
    }

    req.body.id = req.user.id;
    Member.edit(req.body, function(err) {
        if (err) {
            console.error(err);
            return res.redirect('./edit?alert=error');
        }

        res.redirect('./edit?alert=success');
    });
});

router.post('/photo', files.uploadImg.single('photo'), function(req, res) {
    if (!req.user) {
        return redirect.toLogin(res);
    }

    if (!req.file) {
        res.redirect('./edit?alert=success');
    }

    Member.editPhoto(req.user.id, req.file.filename, function(err) {
        if (err) {
            console.error(err);
            return res.redirect('/500');
        }

        res.redirect('./edit?alert=success');
    });
});

/*
 * Serves change password page
 */
router.get('/password', function(req, res) {
    if (!req.user) {
        return redirect.toLogin(res);
    }

    var context = {};
    if (req.query.alertmsg) {
        context.alert_error = alerts[req.query.alertmsg];
    } else {
        switch (req.query.alert) {
            case 'error':
                context.alert_error = alerts.errorPasswordChange;
                break;
            case 'success':
                context.alert_success = alerts.successPasswordChange;
                break;
        }
    }

    res.render('member-password', context);
});

/*
 * Verifies and saves new password
 */
router.post('/password', function(req, res) {
    Member.authenticate(req.user.email, req.body.old_password, function(err, success) {
        if (err) {
            console.error(err);
            return res.redirect('./password?alert=error');
        }

        if (!success) {
            return res.redirect('./password?alert=error&alertmsg=errorPasswordChangeCredentials');
        }

        if (req.body.new_password !== req.body.confirm_password) {
            return res.redirect('./password?alert=error&alertmsg=errorPasswordChangeMatch');
        }

        Member.changePassword(req.user.id, req.body.new_password, function(err) {
            if (err) {
                console.error(err);
                return res.redirect('./password?alert=error');
            }

            res.redirect('./password?alert=success');
        });
    });
});

module.exports = router;
