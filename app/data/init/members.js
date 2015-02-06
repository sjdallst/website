var Member = require(__dirname+'/../../model/member')
var memberLines = require('fs').readFileSync(__dirname+'/members.csv',{encoding:'ascii'}).split('\n')

module.exports = function (cb) {
    var numLines = memberLines.length
    memberLines.forEach(function (memberLine) {
        var memberArray = memberLine.split(',')
        var member = {
            first_name: memberArray[0],
            last_name: memberArray[1],
            uniqname: memberArray[2],
            year: memberArray[3],
            major: memberArray[4],
            pledge_class: memberArray[5],
            membership_status: memberArray[6],
            role: memberArray[7],
            gender: memberArray[8]
        }
        Member.addMember(member, function (member) {
            if (--numLines == 0) {
                if (cb) return cb()
            }
        })
    })
}