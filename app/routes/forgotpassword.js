var Account = require(__dirname+'/../auth/account')

module.exports = function (app) {

    app.get('/forgotpassword', function (req, res) {
        res.render('forgotpassword')
    })

    app.post('/forgotpassword', function (req, res) {
        if (req.body.passcode === 'dollabillz') {
            Account.findOne({email:req.body.email}, function (err, account) {
                if (err) res.send(err)
                account.generateHash('dollabillz', function (err, hash) {
                    if (err) res.send(err)
                    account.password = hash
                    account.save(function (err) {
                        if (err) res.send(err)
                        else return res.send(200)
                    })
                })
            })
        } else {
            res.send(403)
        }
    })

}