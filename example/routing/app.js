var app = require('express')()

app.use( function (req, res, next) {
    console.log(req.ip)
    next()
})

app.get('/', function (req, res) {
    console.log('handling /')
    res.send('hello\n')
})

app.get('/yolo', function (req, res) {
    console.log('handling /yolo')
    res.send('yolo\n')
})


app.listen(3000)