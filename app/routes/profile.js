// var Pitch = require(__dirname+'/../model/pitch')
// var mongoose = require('mongoose')
module.exports = function (app) { 

    app.get('/profile', function (req, res) {
        return res.render('profile/profile', {member:req.user})
    })

    app.get('/profile/edit', function (req, res) {
        return res.render('profile/edit', {member:req.user})
    })

    app.post('/profile/update', function (req, res) {
    	console.log("making post")
        req.user.updatePreferences(req.body, function () {
            return res.send({});
        })
    })



}