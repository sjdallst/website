var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String, furColor:String, legs:Number });

var kitty = new Cat({ name: 'Blake', furColor:'blue' });
kitty.legs = 4;

kitty.save(function (err) {
  if (err) throw err;
  console.log('meow');
});