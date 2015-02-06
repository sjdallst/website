module.exports = function (cb) {
	// var db = require('mongoose')
	// db.connect('mongodb://localhost:27017/ktpweb')
	var Member = require(__dirname+'/../../model/member')
	var memberLines = require('fs').readFileSync(__dirname+'/pledges.csv',{encoding:'ascii'}).split('\n')

	var numLines = memberLines.length
	memberLines.forEach(function (memberLine) {
		var memberArray = memberLine.split(',')
		var member = {
			first_name: memberArray[0],
			last_name: memberArray[1],
			uniqname: memberArray[2],
			year: memberArray[3],
			major: memberArray[4],
			gender: memberArray[5],
			pledge_class: 'Eta',
			membership_status: 'Pledge',
			role: 'Pledge'
		}
		Member.addMember(member, function (member) {
			if (--numLines == 0) {
				// db.disconnect(function () {
					// if (err) throw err
					if (cb) return cb()
				// })
				// return cb()
			}
		})
	})
}