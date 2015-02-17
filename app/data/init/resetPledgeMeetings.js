require('mongoose').connect('mongodb://localhost:27017/ktpweb')

require(__dirname+'/removeModel.js')('pledgeMeetings', function() {
	console.log('pledge meetings removed')
	var addPledgeMeetings = require(__dirname+'/pledgeMeetings.js')
	addPledgeMeetings(function() {
		console.log('pledge meetings added')
		process.exit(0)
	})
})