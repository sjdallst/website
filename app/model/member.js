var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

// create the model for accounts and expose it to our app & api
var Member = restful.model('Member', mongoose.Schema({

    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    
    // personal info
    first_name: String,
    last_name: String,
    uniqname: String,
    year: Number,           // graduation year
    major: String,
    gender: String,         // {M,F}
    hometown: String,
    biography: String,

    // contact info
    email: String,          // default is umich email
    phone_number: String,

    // sites and links
    twitter: String,        // username
    facebook: String,       // username
    linkedin: String,       // username
    personal_site: String,  // full link

    // fraternity info
    pledge_class: String,       // {Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta}
    membership_status: String,  // {Active,Probation,Inactive,Eboard,Pledge}
    role: String,               // {Member,Pledge,President,Secretary,Director of Membership, ...}
    committees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }],

    // membership requirements
    service_hours: { type: Number, default: 0 },
    pro_dev_events: { type: Number, default: 0 },

    // pledge/active meetings, empty for actives
    meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PledgeMeeting' }]

})).methods(['get','put']) // expose all restful methods (members can be loaded and updated)

var newAccount = require(__dirname+'/../auth/account.js').newAccount

// member is an object in which at least a uniqname must be provided
Member.addMember = function (member, cb) {
    if (!member.uniqname) throw Error('The member must have a uniqname')

    Member.findOne({uniqname:member.uniqname}, function (err, found) {
        if (err) throw err
        if (found) {
            if (cb) return cb(found) 
            return
        }

        var email = member.uniqname + '@umich.edu'
        newAccount(email, 'dollabillz', function (err, account) {
            if (err) throw err
            member.account = account._id
            member.email = email
            var newMember = new Member(member)
            newMember.save(function (err) {
                if (err) throw err
                account.ref = newMember._id
                account.type = 'member'
                account.save(function (err) {
                    if (err) throw err
                })
                if (cb) return cb(member)
            })
        })
    })
}

module.exports = Member