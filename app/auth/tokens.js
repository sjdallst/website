var token = '5af9a24515589a73d0fa687e69cbaaa15918f833' // sha1 of $dollabillz$
module.exports = function (req, res, next) {
    if (req.query.t !== token) return res.status(401).send('Unauthorized token')
    else return next()
}