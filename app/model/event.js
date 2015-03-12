var restful = require('node-restful') // https://github.com/baugarten/node-restful
var mongoose = restful.mongoose

var eventSchema = mongoose.Schema({

    organization: String,
    type: String, // {tech,non-tech}
    dateTime: String,
    cost: String,
    location: String,
    description: String,
    url: String

},{collection: 'events'})

module.exports = restful.model('Event', eventSchema).methods(['get','put','post','delete'])