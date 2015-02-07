var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

var PledgeTask = restful.model('PledgeTask', mongoose.Schema({

	title: String,			// e.g. Serenade GSI Vidal
	description: String,	// e.g. Serenade must be 3 minutes long.
	proof: String, 			// e.g. Video
	points: Number,
	points_earned: Number,
	minimum_pledges: Number,
	repeatable: Boolean,
	pledges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pledge' }]	// pledges involved

}, {collection: 'pledgeTasks'})).methods(['get','put','post','delete'])

// /pledgeTasks/:id/addPledge
// send request as {pledge: member_id}
PledgeTask.route('addPledge', ['put'], {
	detail: true,
	handler: function (req, res) {
		PledgeTask.findById(req.params.id, function (err, pledgeTask) {
			if (err) throw err
			pledgeTask.pledges.push(req.body.pledge)
			pledgeTask.save(function (err) {
				if (err) throw err
				return res.send(pledgeTask)
			})
		})
	}
})

module.exports = PledgeTask