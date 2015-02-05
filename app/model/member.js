var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

// create the model for accounts and expose it to our app & api
var Member = restful.model('Member', mongoose.Schema({

    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    
    // personal info
    first_name: String,
    last_name: String,
    uniqname: String,
    year: Number,
    major: String,
    gender: String,
    hometown: String,
    biography: String,

    // contact info
    email: String,
    phone_number: String,

    // sites and links
    twitter: String,
    facebook: String,
    linkedin: String,
    personal_site: String,

    // fraternal info
    pledge_class: String, // {alpha,beta,gamma,delta,zeta,eta}
    membership_status: String, // {active,probation,alumni,inactive,eboard,pledge}
    role: String, // e.g. Treasurer
    main_committee: { type: mongoose.Schema.Types.ObjectId, ref: 'Committee' },
    committees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }],

    // membership requirements
    service_hours: { type: Number, default: 0 },
    pro_dev_events: { type: Number, default: 0 },

    // empty for actives
    meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PledgeMeeting' }]

})).methods(['get','put']) // expose all restful methods (members can be loaded and updated)

var newAccount = require(__dirname+'/../auth/account.js').newAccount

Member.addMember = function (uniqname,password,first_name,last_name,year,major,pledge_class,gender,cb) {
    var email = uniqname + '@umich.edu'
    newAccount(email,password,function (err,account) {
        if(err) throw err
        var member = new Member({account:account._id,first_name:first_name,last_name:last_name,uniqname:uniqname,email:email,year:year,major:major,pledge_class:pledge_class,gender:gender})
        member.save(function (err) {
            if(err) throw err
            account.ref = member._id
            account.type = 'member'
            account.save(function (err) { if(err) throw err; })
            if(cb) return cb(member)
        })
    })
}

module.exports = Member