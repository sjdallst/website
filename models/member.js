/*
 * Member.js
 *
 * Model for a KTP Member
 */

var db = require('../db');
var hash = require('../utils/hash');

var async = require('async');

var Photo = require('./Photo');
var files = require('./files');


/*
 * Returns the member object associated with the given member id
 * Includes Status and Role information
 *
 * cb called as cb(err, member)
 */
exports.findById = function(id, cb) {
    db.query(
        'SELECT Member.*, MemberStatus.name AS status, MemberRole.name AS role ' +
        'FROM Member ' +
        'LEFT JOIN MemberStatus ON Member.member_status_id = MemberStatus.id ' +
        'LEFT JOIN MemberRole ON Member.member_role_id = MemberRole.id ' +
        'WHERE Member.id = ?',
        [id],
        function(err, members) {
            if (err) console.error(err);
            cb(err, members[0]);
        }
    );
};

/*
 * Returns the member object associated with the given member id
 * Includes Pledge Class, Status, Role, Profile, Photo
 *
 * cb called as cb(err, member)
 */
exports.findFullById = function(id, cb) {
    db.query(
        'SELECT Member.*, MemberProfile.*, ' +
               'PledgeClass.name AS pledge_class, ' +
               'MemberStatus.name AS status, ' +
               'MemberRole.name AS role, ' +
               'Photo.filename AS photo_filename ' +
        'FROM Member ' +
        'LEFT JOIN MemberProfile ON Member.id = MemberProfile.member_id ' +
        'LEFT JOIN PledgeClass ON Member.pledge_class_id = PledgeClass.id ' +
        'LEFT JOIN MemberStatus ON Member.member_status_id = MemberStatus.id ' +
        'LEFT JOIN MemberRole ON Member.member_role_id = MemberRole.id ' +
        'LEFT JOIN Photo ON Member.photo_id = Photo.id ' +
        'WHERE Member.id = ?',
        [id],
        function(err, members) {
            if (err) console.error(err);
            cb(err, members[0]);
        }
    );
};

/*
 * Creates a new member with the given member object
 *
 * member is an object with the following structure:
 * {
 *      first_name: string,
 *      last_name:  string,
 *      email: string,
 *      grad_year: int,
 *      pledge_class_id: int,
 *      member_status_id: int,
 *      member_role_id: int
 * }
 *
 * cb called as cb(err)
 */
exports.create = function(member, cb) {
    // add check for eboard status
    var salt = hash.salt();
    var password = 'ktp' + member.last_name.replace(/\s+/g, '').toLowerCase();

    try {
        db.query(
            'INSERT INTO Member ' +
            '(first_name, last_name, email, pwd_hash, pwd_salt, grad_year, pledge_class_id, member_status_id, member_role_id) ' +
            'VALUES (?,?,?,?,?,?,?,?,?)',
            [
                member.first_name,
                member.last_name,
                member.email,
                hash(password, salt),
                salt,
                member.grad_year,
                member.pledge_class_id,
                member.member_status_id,
                member.member_role_id
            ],
            function(err) {
                cb(err);
            }
        );
    } catch (err) {
        cb(err);
    }
};

/*
 * Edits an existing member's information
 *
 * member is an object with the following structure:
 * {
 *      id: int,
 *      first_name: string,
 *      last_name: string,
 *      email: string,
 *      grad_year: int,
 *      pledge_class_id: int,
 *      member_status_id: int,
 *      member_role_id: int
 * }
 */
exports.edit = function(member, cb) {
    // add check for eboard status to edit fraternity info
    try {
        async.parallel({
            member: function(cb) {
                db.query(
                    'UPDATE Member ' +
                    'SET first_name = ?, last_name = ?, email = ?, grad_year = ?, pledge_class_id = ?, member_status_id = ?, member_role_id = ? ' +
                    'WHERE id = ?',
                    [
                        member.first_name,
                        member.last_name,
                        member.email,
                        member.grad_year,
                        member.pledge_class_id,
                        member.member_status_id,
                        member.member_role_id,
                        member.id
                    ],
                    function(err) {
                        cb(err);
                    }
                );
            },
            profile: function(cb) {
                db.query(
                    'UPDATE MemberProfile ' +
                    'SET bio = ?, linkedin = ?, facebook = ?, twitter = ?, website = ?' +
                    'WHERE member_id = ?',
                    [
                        member.bio,
                        member.linkedin,
                        member.facebook,
                        member.twitter,
                        member.website,
                        member.id
                    ],
                    function(err) {
                        cb(err);
                    }
                );
            }
        },
        function(err) {
            cb(err);
        });
    } catch (err) {
        cb(err);
    }
};

/*
 * Edits an existing member's profile photo
 *
 * cb called as cb(err)
 */
exports.editPhoto = function(id, filename, cb) {
    Photo.add(filename, function(err, photo_id) {
        db.query(
            'SELECT Photo.* FROM Member ' +
            'JOIN Photo ON Member.photo_id = Photo.id ' +
            'WHERE Member.id = ?;' +

            'DELETE Photo FROM Photo ' +
            'JOIN Member ON Member.photo_id = Photo.id ' +
            'WHERE Photo.id = Member.photo_id AND Member.id = ?;' +

            'UPDATE Member SET photo_id = ? WHERE Member.id = ?',
            [id, id, photo_id, id],
            function(err, results) {
                if (err) return cb(err);

                console.log(results);
                if (results[0].length) {
                    files.deletePhoto(results[0][0].filename, function(err) {
                        cb(err);
                    });
                } else {
                    cb(null);
                }
            }
        );
    });
};

/*
 * Changes an existing member's password
 *
 * cb called as cb(err)
 */
exports.changePassword = function(id, password, cb) {
    var salt = hash.salt();
    try {
        db.query(
            'UPDATE Member ' +
            'SET pwd_hash = ?, pwd_salt = ?' +
            'WHERE id = ?',
            [
                hash(password, salt),
                salt,
                id
            ],
            function(err) {
                cb(err);
            }
        );
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
 * Returns all members who are currently active (including e-board)
 * Includes role information
 *
 * cb called as cb(err, members) returning array of Members
 */
exports.findActives = function(cb) {
    // Select all Members properties of Members whose status_id is Active
    db.query(
        'SELECT Member.*, MemberStatus.name AS status, MemberRole.name AS role ' +
        'FROM Member ' +
        'LEFT JOIN MemberStatus ON Member.member_status_id = MemberStatus.id ' +
        'LEFT JOIN MemberRole ON Member.member_role_id = MemberRole.id ' +
        'WHERE MemberStatus.name = "Active" OR MemberStatus.name = "Eboard" ' + 
        'ORDER BY first_name ASC',
        function(err, members) {
            if(err) console.error(err);
            cb(err, members);
        }
    );
};

/*
 * Returns all members who are Alumni
 * Includes role information
 *
 * cb called as cb(err, members) returning array of Members
*/
exports.findAlumni = function(cb) {
    // Select all Members properties of Members whose status_id is Active
    db.query(
        'SELECT Member.*, MemberStatus.name AS status, MemberRole.name AS role ' + 
        'FROM Member ' + 
        'LEFT JOIN MemberStatus ON Member.member_status_id = MemberStatus.id ' +
        'LEFT JOIN MemberRole ON Member.member_role_id = MemberRole.id ' +
        'WHERE MemberStatus.name = "Alumnus" ' +
        'ORDER BY first_name ASC',
        function(err, members) {
            if(err) console.error(err);
            cb(err, members);
        }
    );
};