/*
 * MemberStatus.js
 *
 * Model for KTP Member Statuses
 */

var db = require('../db');

/*
 * Gets all Member Statuses
 *
 * cb called as cb(err, member_statuses)
 */
var cached_member_statuses; // cache of member statuses to prevent repeated db queries
exports.getAll = function(cb) {
    if (cached_member_statuses) {
        return cb(null, cached_member_statuses);
    }

    db.query(
        'SELECT id, name FROM MemberStatus ORDER BY id ASC',
        function(err, member_statuses) {
            if (!err) cached_member_statuses = member_statuses;
            cb(err, member_statuses);
        }
    );
};