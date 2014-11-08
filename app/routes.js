module.exports = function (app) {

    // kappathetapi.com/app/
    app.get('/', auth, function (req, res) {
        res.render('app',{member:req.user})
    })

}

function auth(req, res, next) { 
    if (req.isAuthenticated()) return next(); // if user is authenticated in the session, carry on
    else return res.redirect('/app/login'); // if they aren't redirect them to the home page
}