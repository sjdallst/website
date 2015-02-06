

module.exports = function(cb) {
	// var db = require('mongoose').connect('mongodb://localhost:27017/ktpweb')
	var Committee = require(__dirname+'/../../model/committee')
	var committees = [
		{
			name: 'Development',
			description: 'Development Committee',
		},
		{
			name: 'Professional Development',
			description: 'Professional Development Committee'
		},
		{
			name: 'Membership',
			description: 'Membership Committee'
		},
		{
			name: 'Marketing',
			description: 'Marketing Committee'
		},
		{
			name: 'Engagement',
			description: 'Engagement Committee'
		},
		{
			name: 'Fundraising',
			description: 'Fundraising Committee'
		},
		{
			name: 'Historian',
			description: 'Historian Committee'
		}
	]

	var numCommittees = committees.length
	committees.forEach(function (committee) {
		var newCommittee = new Committee(committee)
		newCommittee.save(function (err) {
			if (err) throw err
			if (--numCommittees == 0) {
				if (cb) return cb()
			}
		})
	})
}