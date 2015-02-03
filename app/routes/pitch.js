var Pitch = require(__dirname+'/../model/pitch')
module.exports = function (app) { 

    app.get('/pitch', function (req, res) {
        return res.redirect('https://docs.google.com/a/umich.edu/document/d/11SaehysI5rf6Xmx6Z0OdD1lkhkLkByjvSE3WZP3MxHY')
    })

    app.get('/pitch/new', function (req, res) {
        return res.render('pitch/new',{member:req.user})
    })

    app.post('/pitch/new', function (req, res) {
        var pitch = new Pitch(req.body)
        pitch.save(function (err) {
            return res.render('pitch/view',{member:req.user,pitch:pitch})
        })
    })

    app.get('/pitch/:id/vote', function (req, res) {
        Pitch.findOne(req.params.id,function (err, pitch) {
            return res.render('pitch/vote',{member:req.user,pitch:pitch})
        })
    })

    app.post('/pitch/:id/vote', function (req, res) {
        Pitch.findOne(req.params.id,function (err, pitch) {
            pitch.populate('votes', function (err, pitch) {
                for (var i in votes) {
                    if (votes[i].member == req.user._id) return res.send('You already voted');
                }
                pitch.votes.push(req.body)
                return res.render('pitch/view',{member:req.user,pitch:pitch})
            })
        })
    })

    app.get('/pitch/:id', function (req, res) {
        Pitch.findOne(req.params.id,function (err, pitch) {
            pitch.populate('votes', function (err, pitch) {
                var votes = this.votes.reduce(function (prev,cur) {
                    prev.innovation += cur.innovationScore
                    prev.usefulness += cur.usefulnessScore
                    prev.coolness += cur.coolnessScore
                    return prev
                },{innovation:0,usefulness:0,coolness:0})
                return res.render('pitch/view',{member:req.user,pitch:pitch,votes:votes})
            })
        })
    })

}