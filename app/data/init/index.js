if (process.env.NODE_ENV == 'dev') {

	require('mongoose').connect('mongodb://localhost:27017/ktpweb')
	
	var reset = require(__dirname+'/reset')
	var addMembers = require(__dirname+'/members')
	var addPledges = require(__dirname+'/pledges')
	var addCommittees = require(__dirname+'/committees')

	reset(function () {
		console.log('db reset')
		addMembers(function () {
			console.log('members added')
			addPledges(function () {
				console.log('pledges added')
				addCommittees(function () {
					console.log('committees added')
					process.exit(0)
				})
				
			})
		})
	})
}