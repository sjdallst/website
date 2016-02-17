/*
 * files.js
 *
 * Model for filesystem
 */

var fs = require('fs-extra');

/*
 * Delete any photos in /public/img/ with the specified filename
 *
 * cb called as cb(err)
 */
exports.deletePhoto = function(filename, cb) {
    fs.remove(__dirname + '/../public/img/' + filename, function(err) {
        cb(err);
    });
};