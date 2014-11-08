module.exports = function (app) { // async
    var passport = require('passport'), // login strategies
        session = require('express-session'), // express sessions
        store = require('connect-mongo')(session); // persist sessions
    require('mongoose').connect('mongodb://localhost:27017/ktpweb'); // connect to our database
    require(__dirname+'/passport.js')(passport); // declare handling login and serialization
    app.use(require('cookie-parser')()); // sessions are persisted with the help of cookies 
    app.use(session({ 
        secret: 'justinLikesTenticles', // salt the cookies
        store: new store({              // place on 2'x2' mongostore baking sheet
            db: 'ktpweb'                // bake on high for 30 minutes
        }) 
    }));
    app.use(passport.initialize()); // initialize passport
    app.use(passport.session()); // link passport with our sessions
    app.use(require('connect-flash')()); // flash message login errors
    require(__dirname+'/routes.js')(app,passport); // route handling for authenticated portion of website
}