var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

var PledgeMeeting = restful.model('PledgeMeeting', mongoose.Schema({

		pledge: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
		active: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
		complete: Boolean

})).methods(['get','put','post','delete'])

module.exports = PledgeMeeting