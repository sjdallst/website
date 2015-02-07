if (process.env.NODE_ENV == 'dev') {

	require('mongoose').connect('mongodb://localhost:27017/ktpweb')
	
	var reset = require(__dirname+'/reset.js')
	var addMembers = require(__dirname+'/members.js')
	var addPledges = require(__dirname+'/pledges.js')
	var addCommittees = require(__dirname+'/committees.js')
	var addPledgeTasks = require(__dirname+'/pledgeTasks.js')

	reset(function () {
		console.log('db reset')
		addMembers(function () {
			console.log('members added')
			addPledges(function () {
				console.log('pledges added')
				addCommittees(function () {
					console.log('committees added')
					addPledgeTasks(function () {
						console.log('pledge tasks added')
						process.exit(0)
					})
				})
			})
		})
	})
}