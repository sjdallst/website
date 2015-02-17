module.exports = function (cb) {
	var Member = require(__dirname+'/../../model/member.js')
	var PledgeMeeting = require(__dirname+'/../../model/pledgeMeeting.js')

	Member.find({}, function (err, members) {
		if (err) throw err

		var actives = [];
		var pledges = [];
		for (m in members) {
			if (members[m].membership_status == "Active" ||
				members[m].membership_status == "Eboard") {
				actives[actives.length] = members[m]
			} else if (members[m].membership_status == "Pledge") {
				pledges[pledges.length] = members[m]
			}
		}

		var meetingsWereCreated = function () {
			var i = members.length
			members.forEach(function (member) {
				member.save(function (err) {
					if (err) throw err
					if (--i == 0) {

						if (cb) return cb()
						else return
					}
				})
			})
		}

		var numMeetings = actives.length * pledges.length
		for (a in actives) {
			for (p in pledges) {
				actives[a].populate('meetings', function (err, active) {
					if (err) throw err
					pledges[p].populate('meetings', function (err, pledge) {
						if (err) throw err

						var pledgeMeeting = new PledgeMeeting({
							active: active._id,
							pledge: pledge._id,
							complete: false
						})

						pledgeMeeting.save(function (err) {
							if (err) throw err

							active.meetings.push(pledgeMeeting._id)
							pledge.meetings.push(pledgeMeeting._id)

							if (--numMeetings == 0) {
								meetingsWereCreated()
							}
						})
					})
				})
			}
		}		
	})
}