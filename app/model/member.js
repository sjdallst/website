var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose
var fs = require('fs')

// create the model for accounts and expose it to our app & api
var memberSchema = mongoose.Schema({
    
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
    prof_pic_url: String,

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

    // pledge/active meetings
    meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PledgeMeeting' }]

})

// function to update preferences to profile
memberSchema.methods.updatePreferences = function (prefs, cb) {
    var user = this;
    for (var pref in prefs) {
        if (prefs[pref] == '') delete prefs[pref]
        else {
            user[pref] = prefs[pref]
        }
    }
    user.save(function (err) {
        if (err) throw err
        if (cb) return cb(user)
    })
}


memberSchema.statics.allMembers = function (cb) {
    var user = this;
    this.find({}, function (err, members) { 
        if (err) throw err
        if (members) {
            if (cb) return cb(members, user)
        }
    })
    
}


var Member = restful.model('Member', memberSchema).methods(['get','put','post','delete']) // expose all restful methods

var newAccount = require(__dirname+'/../auth/account.js').newAccount

// function to return all members


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

////////// API Layer /////////

// /members/:id/upload_pic
Member.route('upload_pic', ['post'], {
    detail: true,
    handler: function (req, res) {
        Member.findById(req.params.id, function(err, member) {
            if(err) res.send(400,err)
            var ctype = req.get('content-type')
            var ext = ctype.substr(ctype.indexOf('/')+1)
            var url = '/img/prof_pics/'+member.uniqname+'.'+ext
            var filePath = __dirname+'/../../public/'+url
            var writable = fs.createWriteStream(filePath)
            req.pipe(writable)
            req.on('end', function (){
                res.send(201,{'url':url})
            })               
            writable.on('error', function(err) {
                res.send(500, err)
            })
            member.prof_pic_url = url
            member.save(function (err) {
                if(err) throw err
            })
        })
    }
})



module.exports = Member