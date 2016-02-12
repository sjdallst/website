/*
 * MemberRole.js
 *
 * Model for KTP Member Statuses
 */

var db = require('../db');

/*
 * Gets all Member Roles
 *
 * cb called as cb(err, member_roles)
 */
var cached_member_roles; // cache of member roles to prevent repeated db queries
exports.getAll = function(cb) {
    if (cached_member_roles) {
        return cb(null, cached_member_roles);
    }

    db.query(
        'SELECT id, name FROM MemberRole ORDER BY id ASC',
        function(err, member_roles) {
            if (!err) cached_member_roles = member_roles;
            cb(err, member_roles);
        }
    );
};