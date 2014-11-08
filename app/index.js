module.exports = function (server) {
    var app = require('express')() // instantiate the app
    app.set('views',__dirname+'/client') // use jade templating engine 
    app.set('view engine','jade') // we only template the authenticated section of the website
    require(__dirname+'/auth')(app) // set up the authentication
    require(__dirname+'/routes')(app)  // set up the routes of the app
    server.use('/app', app) // attach the app to our main server, at that route
}