var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var Cat = require(__dirname+'/cat')

Cat.find({}, function (err, kitties) {
    if(err) throw err
    console.log(kitties)
    console.log('meow')
    process.exit(1)
})

// or just Cat.getKitties(function (kitties) { console.log(kitties) })