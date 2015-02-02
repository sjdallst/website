var Account = require(__dirname+'/../auth/account')
var token = '5af9a24515589a73d0fa687e69cbaaa15918f833' // sha1 of $dollabillz$
module.exports = function (api) {

    api.use(function (req, res, next) {
        if (req.query.t == token || req.headers['x-access-token'] == token) return next()
        else return res.status(401).send('Unauthorized token')
    })

    // authenticating the user to the app
    api.post('/login',function (req, res, next) { // send request body as {account, password}
        Account.findById(req.body.account, function (err, account) {
            if (err) throw err
            else if (!account) return res.send('account not found\n')
            else account.validPassword(req.body.password, function (err, valid) {
                if (err) throw err
                else if (!valid) return res.send('invalid password\n')
                else return res.send('success\n')
            })
        })
    })

    // authenticating the user and changing their password
    api.post('/changePassword',function (req, res, next) { 
        // send request body as {account, oldPassword, newPassword, confirmPassword}
        Account.findById(req.body.account, function (err, account) {
            if (err) throw err
            else if (!account) return res.send('account not found\n')
            else if (req.body.newPassword != req.body.confirmPassword) return res.send('passwords dont match\n')
            else account.validPassword(req.body.oldPassword, function (err, valid) {
                if (err) throw err
                else if (!valid) return res.send('invalid password\n')
                else account.generateHash(req.body.newPassword, function (err, hash) {
                    if (err) throw err
                    account.password = hash
                    account.save(function (err) {
                        if (err) throw err
                        else return res.send('password changed\n')
                    })
                })
            })
        })
    })

}
/*
// testing:
curl -i -X POST -H 'Content-Type: application/json' -H 'x-access-token:5af9a24515589a73d0fa687e69cbaaa15918f833' -d '{"account":"54c7315aea4ea80000d81dd7","password":"dollabills"}' http://localhost:3000/api/login
'invalid password'
curl -i -X POST -H 'Content-Type: application/json' -H 'x-access-token:5af9a24515589a73d0fa687e69cbaaa15918f833' -d '{"account":"54c7315aea4ea80000d81dd7","password":"dollabillz"}' http://localhost:3000/api/login
'success'
curl -i -X POST -H 'Content-Type: application/json' -H 'x-access-token:5af9a24515589a73d0fa687e69cbaaa15918f833' -d '{"account":"54c7315aea4ea80000d81dd7","oldPassword":"dollabillz","newPassword":"yolo","confirmPassword":"yolo"}' http://localhost:3000/api/changePassword
'password changed'
curl -i -X POST -H 'Content-Type: application/json' -H 'x-access-token:5af9a24515589a73d0fa687e69cbaaa15918f833' -d '{"account":"54c7315aea4ea80000d81dd7","password":"yolo"}' http://localhost:3000/api/login
'success'
*/