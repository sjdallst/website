var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String, furColor:String, legs:Number });

var kitty = new Cat({ name: 'blazer', furColor:'blue' });
kitty.legs = true

console.log(kitty)
kitty.save(function (err) {
    if (err) throw err
    console.log('meow')
})