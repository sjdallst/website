var express = require('express');
var app = express();
var pwd = process.argv[2]

app.use(express.directory('data'))
app.use(function (req, res, next) {
    req.opts = require('querystring').parse(req.url.substring(req.url.indexOf('?')+1))
    if (req.opts.pwd != pwd) res.send('incorrect password') 
    else express.static('data')(req,res,next)
})

app.listen(6969,function(){
    console.log('KTP web server listening on port 6969!')
})