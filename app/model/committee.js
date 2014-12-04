var mongoose = require('mongoose');

var committeeSchema = mongoose.Schema({

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }]

})

// create the model for users and expose it to our app
module.exports = mongoose.model('Committee', committeeSchema)