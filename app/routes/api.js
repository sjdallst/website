var Account = require(__dirname+'/../auth/account')
var token = '5af9a24515589a73d0fa687e69cbaaa15918f833' // sha1 of $dollabillz$
module.exports = function (api) {

    api.use(function (req, res, next) {
        if (req.headers['x-access-token'] == token) return next()
        else return res.status(401).send('Unauthorized token')
    })

    api.post('/login',function (req, res, next) { // send request body as {account, password}
        Account.findById(req.body.account, function (err, account) {
            if (err) throw err
            else if (!account) return res.send('account not found')
            else account.validPassword(req.body.password, function (err, valid) {
                if (err) throw err
                else if (!valid) return res.send('invalid password')
                else return res.send('success')
            })
        })
    })

}