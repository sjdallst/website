/*
 * PledgeClass.js
 *
 * Model for a KTP Pledge Class
 */

var db = require('../db');


/*
 * Gets all Pledge Classes
 *
 * cb called as cb(err, pledge_classes)
 */
var cached_pledge_classes;  // cache of pledge classes to prevent repeated db queries
exports.getAll = function(cb) {
    if (cached_pledge_classes) {
        return cb(null, cached_pledge_classes);
    }

    db.query('SELECT id, name FROM PledgeClass ORDER BY id',
        function(err, pledge_classes) {
            if (!err) cached_pledge_classes = pledge_classes;
            cb(err, pledge_classes);
        }
    );
};