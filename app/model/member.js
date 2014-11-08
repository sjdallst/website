var mongoose = require('mongoose');

var memberSchema = mongoose.Schema({

    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    name: {
        first: String,
        last: String,
        uniqname: String
    },
    service_hours: Number,
    pro_dev_events: Number,
    committees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }],
    main_committee: { type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }

});

// create the model for accounts and expose it to our app
var Member = mongoose.model('Member', memberSchema);
var newAccount = require(__dirname+'/../auth/account.js').newAccount

Member.addMember = function (uniqname,password,first_name,last_name,service_hours,pro_dev_events,cb) {
    var email = uniqname += '@umich.edu'
    var name = { first:first_name, last:last_name, uniqname:uniqname }
    newAccount(email,password,function (err,account) {
        if(err) throw err;
        var member = new Member({account:account._id,name:name,service_hours:service_hours,pro_dev_events:pro_dev_events});
        member.save(function (err) {
            if(err) throw err;
            account.id = member._id;
            account.type = 'member';
            account.save(function (err) { if(err) throw err; });
            if(cb) return cb(member);
        })
    })
}

module.exports = Member;