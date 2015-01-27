var app = require('express')()

// var express = require('express')
// var app = express()

app.set('view engine','jade') // use jade templating engine 
app.set('views',__dirname) // tell jade where our views live

app.use(function (req,res,next) {
    console.log(req.ip)
    next()
})

app.use(function (req,res,next) {
    return res.render('index.jade', { theVariable:'yolo' })
})

app.listen(3000)