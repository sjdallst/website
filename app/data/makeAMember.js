// need a csv from ang
require('node-restful').mongoose.connect('mongodb://localhost:27017/ktpweb') // connect to our database
var Member = require(__dirname+'/../model/member')
Member.addMember('parisedj','dollabills','Dom','Parise',2015,'Computer Science Engineering','Gamma','M',function(member) {
    console.log(member)
    process.exit(1)
})