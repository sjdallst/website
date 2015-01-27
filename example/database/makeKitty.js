var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var Cat = require(__dirname+'/cat')

var kitty = new Cat({ name: 'Rex', furColor:'orange' })
kitty.legs = 12

console.log(kitty)
kitty.save(function (err) {
    if (err) throw err
    console.log('meow')
    process.exit(1)
})

// or just Cat.makeKitty('blazer','red')