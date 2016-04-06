var crypto = require('crypto');

function uniqueHash() {
    return crypto.createHash('sha256').update(Date.now().toString()).digest('hex');
}

/*
 * Returns a hash of the given password and salt (64 characters)
 */
module.exports = function(password, salt) {
    return crypto.createHash('sha256').update(password).update(salt).digest('hex');
};

/*
 * Returns a password hash salt, a function of the current time (64 characters)
 */
module.exports.salt = function() {
    return uniqueHash();
};

/*
 * Returns a unique filename
 */
module.exports.filename = function() {
    return Date.now().toString();
};