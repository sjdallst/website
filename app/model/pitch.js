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

module.exports = Pitch