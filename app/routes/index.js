module.exports = function (app) {

    app.use(function auth (req, res, next) {
        if (req.isAuthenticated()) return next(); // if user is authenticated in the session, carry on
        else return res.redirect('/app/login'); // if they aren't redirect them to the home page
    }) // ensure that all app requests are authenticated

    app.get('/data',require('serve-index')(__dirname+'/data'))

    // kappathetapi.com/app/
    app.get('/', function (req, res) {
        return res.render('app',{member:req.user})
    })

}