var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

// create the model for accounts and expose it to our app & api
var Member = restful.model('Member', mongoose.Schema({

    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    name: {
        first: String,
        last: String,
        uniqname: String
    },
    year: Number,
    major: String,
    pledge_class: String,
    gender: String,
    service_hours: { type: Number, default: 0 },
    pro_dev_events: { type: Number, default: 0 },
    committees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }],
    main_committee: { type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }

})).methods(['get', 'put']) // expose all restful methods (members can be loaded and updated)

var newAccount = require(__dirname+'/../auth/account.js').newAccount

Member.addMember = function (uniqname,password,first_name,last_name,year,major,pledge_class,gender,cb) {
    var email = uniqname + '@umich.edu'
    var name = { first:first_name, last:last_name, uniqname:uniqname }
    newAccount(email,password,function (err,account) {
        if(err) throw err
        var member = new Member({account:account._id,name:name,year:year,major:major,pledge_class:pledge_class,gender:gender})
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