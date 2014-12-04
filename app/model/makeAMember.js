require('node-restful').mongoose.connect('mongodb://localhost:27017/ktpweb') // connect to our database
var Member = require('./member.js')
Member.addMember('parisedj','dollabills','Dom','Parise',0,0,function(member) {
    console.log(member)
})