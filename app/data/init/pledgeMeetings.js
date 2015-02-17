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

		var numMeetings = actives.length * pledges.length

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

		var createPledgeMeeting = function (active, pledge, complete) {
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
		}

		members.forEach(function (member) {

			if (member.membership_status != 'Active' &&
				member.membership_status != 'Pledge' &&
				member.membership_status != 'Eboard') {
				// member is neither pledge nor active/eboard, don't add
				return;
			}

			for (m in members) {
				if (members[m].membership_status == 'Pledge' && 
					(member.membership_status == 'Active' || 
					 member.membership_status == 'Eboard')) {
					// member is active, member[m] is pledge
					createPledgeMeeting(member, members[m], false)
				}
			}
		})	
	})
}