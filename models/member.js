/*
 * member.js
 *
 * Model for a KTP Member
 */

var db = require('../db');
var hash = require('../utils/hash');

/*
 * Creates a new member with the given member object
 *
 * member is an object with the following structure:
 * {
 *      first_name: string,
 *      last_name:  string,
 *      email: string,
 *      password: string,
 *      grad_year: int,
 *      pledge_class_id: int,
 *      member_status_id: int,
 *      member_role_id: int
 * }
 *
 * cb called as cb(err)
 */
exports.create = function(member, cb) {
    var salt = hash.salt();

    try {
        db.query(
            'INSERT INTO Member ' +
            '(first_name, last_name, email, pwd_hash, pwd_salt, grad_year, pledge_class_id, member_status_id, member_role_id) ' +
            'VALUES (?,?,?,?,?,?,?,?,?)',
            [
                member.first_name,
                member.last_name,
                member.email,
                hash(member.password, salt),
                salt,
                member.grad_year,
                member.pledge_class_id,
                member.member_status_id,
                member.member_role_id
            ],
            function(err, result) {
                cb(err);
        });
    } catch (err) {
        cb(err);
    }
};

/*
 * Authenticates an email/password pair
 *
 * cb called according to PassportJS docs (http://passportjs.org/docs)
 */
exports.authenticate = function(email, password, cb) {
    db.query('SELECT * FROM Member WHERE email = ?', [email], function(err, members) {
        if (err) return cb(err);

        // Invalid email
        if (!members.length) return cb(null, false, {message: 'Incorrect email'});

        var member = members[0];
        var pwd_hash = hash(password, member.pwd_salt);

        // Successful authentication
        if (pwd_hash == member.pwd_hash) {
            return cb(null, member);
        }

        // Unsuccessful authentication
        return cb(null, false, {message: 'Incorrect password'});
    });
};

/*
 * Returns the member object associated with the given member id
 * Includes Status and Role information
 *
 * cb called as cb(err, member)
 */
exports.findById = function(id, cb) {
    console.log('find by id: ' + id);
    db.query(
        'SELECT Member.*, MemberStatus.name AS status, MemberRole.name AS role FROM Member ' +
        'JOIN MemberStatus ON Member.member_status_id = MemberStatus.id ' +
        'JOIN MemberRole ON Member.member_role_id = MemberRole.id ' +
        'WHERE Member.id = ?',
        [id],
        function(err, members) {
            if (err) console.error(err);
            cb(err, members[0]);
        }
    );
}

