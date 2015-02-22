var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

var Announcement = restful.model('Announcement', mongoose.Schema({

	title: String,
	body: String,
	visibility: String	// {Fraternity, Eboard, Development, Membership, ...}

}, {collection: 'announcements'})).methods(['get','put','post','delete'])

module.exports = Announcement