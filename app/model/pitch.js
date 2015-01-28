var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

var Pitch = restful.model('Pitch', mongoose.Schema({

    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    title: String,
    description: String,
    votes: [{
        member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
        innovationScore: Number,
        usefulnessScore: Number,
        coolnessScore: Number
    }]

})).methods(['get','post','put','delete']) // expose all restful methods (members can be loaded and updated)

// /pitches/:id/result
// returns set of avg scores {innovation,usefulness,coolness}
Pitch.route('result', {
    detail: true,
    handler: function (req, res, next) {
        var votes = this.votes.reduce(function (prev,cur) {
            prev.innovation += cur.innovationScore
            prev.usefulness += cur.usefulnessScore
            prev.coolness += cur.coolnessScore
            return prev
        },{innovation:0,usefulness:0,coolness:0})
        votes.innovation /= votes.length
        votes.usefulness /= votes.length
        votes.coolness /= votes.length
        return res.send(votes)
    }
})

module.exports = Pitch