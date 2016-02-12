"use strict";
require('use-strict');

var express     = require('express');
var app         = express();
var dev_port    = 3000;

// Request logger
var morgan = require('morgan');
app.use(morgan('dev'));

// Parses request body and adds req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect to MySQL database
var db = require('./db');
db.connect();

// Register Handlebars template engine
var hbs = require('express-handlebars');
app.engine('.hbs', hbs({
        defaultLayout: 'base',
        extname: '.hbs',
        layoutsDir: './public/views/layouts',
        partialsDir: './public/views/partials'
    })
);
app.set('view engine', '.hbs');
app.set('views', __dirname + '/public/views');

// Setup express static
app.use('/static', express.static('public'));

// Setup express session
var session = require('express-session');
app.use(session({
    secret: '9a8b91c3743c7a7210ec511d7f838ddccf7aad7c1f401a74b006247d25e564ed',
    resave: false,
    saveUninitialized: false
}));

// Initialize authentication middleware
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./config/auth').init();

// Send authenticated user (if any) to res.locals (for use in templates)
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

// Register app routes
app.use(require('./app'));

// Start listening for requests
var port = process.env.NODE_ENV == 'production' ? 80 : dev_port;
app.listen(port);
console.log('Listening on port ' + port);