/*
 * files.js
 *
 * Configuration for file uploads
 */

var multer = require('multer');
var hash = require('../utils/hash');

exports.uploadImg = multer({
    storage: multer.diskStorage({
        destination: __dirname + '/../public/img',
        filename: function(req, file, cb) {
            cb(null, hash.filename() + '.' + file.extension);
        }
    }),

    // Filter out invalid file types while determining extension
    fileFilter: function(req, file, cb) {
        cb(null, (file.extension = getExtension(file)) !== null);
    }
});

function getExtension(file) {
    switch (file.mimetype) {
        case 'image/jpeg':  return 'jpg';
        case 'image/png':   return 'png';
        case 'image/gif':   return 'gif';
        case 'image/bmp':   return 'bmp';
        default: return null;
    }
}