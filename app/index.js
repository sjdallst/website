var express = require('express')

module.exports = function (server) {
    require('node-restful').mongoose.connect('mongodb://localhost:27017/ktpweb') // connect to our database
    // web app
    var app = express() // instantiate the app
    app.set('views',__dirname+'/client') // use jade templating engine 
    app.set('view engine','jade') // we only template the authenticated section of the website
    require(__dirname+'/auth')(app) // set up the authentication
    require(__dirname+'/routes')(app)  // set up the routes of the app
    server.use('/app', app) // attach the app to our main server, at that route
    // web api
    var api = express() // instantiate a route handler for the api
    api.use(require('body-parser')()) // parse POST & PUT requests into api.body
    require(__dirname+'/routes/api')(api) // homemade token-based auth
    require(__dirname+'/model/member').register(api,'/members')                 // register our model to the api
    require(__dirname+'/model/pitch').register(api,'/pitches')                  // register our model to the api
    require(__dirname+'/model/pledgeMeeting').register(api,'/pledgeMeetings')   // register our model to the api
    require(__dirname+'/model/pledgeTask').register(api,'/pledgeTasks')         // register our model to the api
    require(__dirname+'/model/committee').register(api,'/committees')           // register our model to the api
    server.use('/api', api) // attach our api to the main server stack
    // dolla billz
}