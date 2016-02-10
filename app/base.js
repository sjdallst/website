/*
 * base.js
 *
 * Router that handles all requests sent to '/'
 */

var express = require('express');
var router = express.Router();

/*
 * Serves home page
 */
router.get('/', function(req, res) {
    res.send('Hello from KTP!');
});

module.exports = router;