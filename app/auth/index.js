module.exports = function (app) { // async initialization
    var passport = require('passport'), // login strategies
        session = require('express-session'), // express sessions
        store = require('connect-mongo')(session) // persist sessions
    require(__dirname+'/passport')(passport) // declare handling login and serialization
    app.use(require('cookie-parser')()) // sessions are persisted with the help of cookies 
    app.use(require('body-parser')()) // post form requests are parsed into req.body
    app.use(session({ 
        secret: 'justinLikesTenticles', // salt the cookies
        store: new store({              // place on 2'x2' mongostore baking sheet
            db: 'ktpweb'                // bake on high for 30 minutes
        }) 
    }))
    app.use(passport.initialize()) // initialize passport
    app.use(passport.session()) // link passport with our sessions
    app.use(require('connect-flash')()); // flash message login errors
    require(__dirname+'/routes')(app,passport) // route handling for authentication routes
}