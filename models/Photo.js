/*
 * Photo.js
 *
 * Model for a Photo
 */

var db = require('../db');
var hash = require('../utils/hash');

/*
 * Inserts a new photo into the database
 *
 * cb called as cb(err, photo_id)
 */
exports.add = function(filename, cb) {
    db.query('INSERT INTO Photo (filename) VALUES (?)', [filename], function(err, result) {
        cb(err, result.insertId);
    });
};