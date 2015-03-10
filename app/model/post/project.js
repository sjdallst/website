var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

var projectSchema = restful.model('Project', mongoose.Schema({

    sponsor: String,
    topic: String,
    timeline: String,
    description: String,
    contact_info: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }

}, {collection: 'projects'})


module.exports = restful.model('Project', projectSchema).methods(['get','put','post','delete'])