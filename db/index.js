var mysql       = require('mysql');
var config      = require('../config/db.js');
var db          = mysql.createConnection(config);

module.exports = db;