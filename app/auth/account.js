var mongoose = require('node-restful').mongoose
var bcrypt = require('bcrypt-nodejs')

var accountSchema = mongoose.Schema({

    email: String,
    password: String,
    type: String,
    ref: mongoose.Schema.Types.ObjectId

})

// hash the password so our admin can't read them
accountSchema.methods.generateHash = function (password, next){
    return bcrypt.hash(password, bcrypt.genSaltSync(8), null, next);
}

// this allows us to validate a password in ciphertext
accountSchema.methods.validPassword = function(password, next) {
    return bcrypt.compare(password, this.password, next);
}

// create the model for accounts and expose it to our app
var Account = mongoose.model('Account', accountSchema);

Account.newAccount = function (email,password,cb) {
    accountSchema.methods.generateHash(password, function(err, hash) {
        if (err) throw err;
        var newAccount = new Account({email:email,password:hash});
        newAccount.save(function(err) {
            return cb(err, newAccount);
        })
    })
}

module.exports = Account;