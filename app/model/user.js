var mongoose = require('mongoose');

// clear goal info : db.users.update({},{$set:{'goals':{}}})
var userSchema = mongoose.Schema({

    name: String,
    email: String,

    auth: {
        local: {
            email: String,
            password: String,
        },
        facebook: {
            id: String,
            token: String,
            email: String,
            name: String
        }
    }
});

// create the model for users and expose it to our app
var User = mongoose.model('User', userSchema)

module.exports = User;