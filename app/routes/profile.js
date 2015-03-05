var member = require(__dirname+'/../model/member')
// var mongoose = require('mongoose')
module.exports = function (app) { 

    app.get('/profile', function (req, res) {
        return res.render('profile/profile', {member:req.user})
    })

    app.get('/profile/edit', function (req, res) {
        return res.render('profile/edit', {member:req.user})
    })

    app.post('/profile/update', function (req, res) {
        req.user.updatePreferences(req.body, function (user) {
            return res.render('profile/profile', {member:user})
        })
    })

    // should be in member route? , for now its here

    app.get('/members', function (req, res) {
        member.allMembers(function (members) {
            return res.render('members/members', {members:members, member:req.user})
        })
    })


}