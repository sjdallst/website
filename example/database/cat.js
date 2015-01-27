var mongoose = require('mongoose')

var catSchema = { 
    name: String, 
    furColor: String, 
    legs: Number 
}

// catSchema.statics.makeKitty = function (name,furColor,cb) {
//     var kitty = new this({ name:name, furColor:blue })
//     kitty.save(function (err, kitty) {
//         if (err) throw err
//         if (cb) return cb(kitty)
//     })
// }

// catSchema.statics.getKittys = function (cb) {
//     this.find({}, function (err, kitties) {
//         if (err) throw err
//         if (cb) return cb(kitties)
//     })
// }

module.exports = mongoose.model('Cat', catSchema)