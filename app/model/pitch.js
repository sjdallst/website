var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

var Pitch = restful.model('Pitch', mongoose.Schema({

    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    title: String,
    description: String,
    votes: [{}]

})).methods(['get','post','put','delete']) // expose all restful methods (pitches can be loaded and updated)

// /pitches/:id/vote
// send request as {member, innovationScore, usefulnessScore, coolnessScore}
Pitch.route('vote',['put'], {
    detail: true,
    handler: function (req, res) {
        Pitch.findById(req.params.id, function(err, pitch) {
            if (err) throw err
            pitch.votes.push(req.body)
            pitch.markModified('votes')
            pitch.save( function(err) {
                if (err) throw err
                return res.send(pitch)
            })
        })
    }
})

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
