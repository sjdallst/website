module.exports = function (cb) {
	var PledgeTask = require(__dirname+'/../../model/pledgeTask.js')
	var pledgeTaskLines = require('fs').readFileSync(__dirname+'/pledgeTasks.csv',{encoding:'utf8'}).split('\n')

	var numLines = pledgeTaskLines.length
	pledgeTaskLines.forEach(function (pledgeTaskLine) {
		var pledgeTaskArray = pledgeTaskLine.split(',')
		var pledgeTask = {
			title: pledgeTaskArray[0],
			description: pledgeTaskArray[0],
			proof: pledgeTaskArray[4],
			points: (pledgeTaskArray[2] == '') ? 0 : pledgeTaskArray[2],
			points_earned: (pledgeTaskArray[3] == '') ? 0 : pledgeTaskArray[3],
			minimum_pledges: (pledgeTaskArray[1] == '') ? 0 : pledgeTaskArray[1],
			repeatable: true
		}

		var newPledgeTask = new PledgeTask(pledgeTask)
		newPledgeTask.save(function (err) {
			if (err) throw err
			if (--numLines == 0) {
				if (cb) return cb()
			}
		})
	})
}