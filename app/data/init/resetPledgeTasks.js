require('mongoose').connect('mongodb://localhost:27017/ktpweb')

require(__dirname+'/removeModel.js')('pledgeTasks', function() {
	console.log('pledge tasks removed')
	var addPledgeTasks = require(__dirname+'/pledgeTasks.js')
	addPledgeTasks(function() {
		console.log('pledge tasks added')
		process.exit(0)
	})
})