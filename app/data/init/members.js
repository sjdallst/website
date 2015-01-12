require('mongoose').connect('mongodb://localhost:27017/ktpweb')
var Member = require(__dirname+'/../../model/member')
var members = require('fs').readFileSync(__dirname+'/members.csv',{encoding:'ascii'}).split('\n')

module.exports = function (cb) {

    // First,Last,Uniqname,Year,Major,Class,Status,Gender
    var todo = members.length
    members.forEach(function (mbrStr) {
        // (uniqname,password,first_name,last_name,year,major,class,gender,cb)
        var mbr = mbrStr.split(',')
        Member.addMember(mbr[2],'dollabillz',mbr[0],mbr[1],mbr[3],mbr[4],mbr[5],mbr[7], function (member) {
            todo--
            if (!todo) return cb()
        })
    })

}