var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

var PledgeTask = restful.model('PledgeTask', mongoose.Schema({

	title: String,			// e.g. Serenade GSI Vidal
	description: String,	// e.g. Serenade must be 3 minutes long. Video proof needed.
	points: Number,
	points_earned: Number,
	minimum_pledges: Number,
	repeatable: Boolean,
	pledges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pledge' }]	// pledges involved

})).methods(['get','put','post','delete'])

module.exports = PledgeTask