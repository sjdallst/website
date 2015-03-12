var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

var postSchema = mongoose.Schema({

	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
	title: String,
    type: String, // event or project 
    lastUpdated: Date,
    info: mongoose.Schema.Types.ObjectId

},{collection: 'posts'})

// be sure to logic renders based on type { event || project }
module.exports = restful.model('Post',postSchema).methods(['get','put','post','delete'])