var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

// create the model for accounts and expose it to our app & api
var Committee = restful.model('Committee', mongoose.Schema({

	name: String,
	description: String,
	chair: { type: mongoose.Schema.Types.ObjectId, ref: 'Member'},	// leader of committee

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }]
})).methods(['get','put'])

var Member = require(__dirname+'/member')

// /committees/:id/addMember
// send request as {member : member_id}
Committee.route('addMember', ['put'], {
	detail: true,
	handler: function (req, res, next) {
		Committee.findById(req.params.id, function (err, committee) {
			if (err) throw err

			for (var i = 0; i < committee.members.length; ++i) {
				if (committee.members[i] == req.body.member) return res.send(committee)
			}
			
			committee.members.push(req.body.member)
			committee.save(function (err) {
				if (err) throw err
				return res.send(committee)
			})
		})
	}
})

// /committees/:id/removeMember
// send request as {member : member_id}
Committee.route('removeMember', ['put'], {
	detail: true,
	handler: function (req, res, next) {
		Committee.findById(req.params.id, function (err, committee) {
			if (err) throw err

			committee.members.pull(req.body.member)
			committee.save(function (err) {
				if (err) throw err
				return res.send(committee)
			})

		})
	}
})

module.exports = Committee