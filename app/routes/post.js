var post = require(__dirname+'/../model/post')
module.exports = function (app) { 

    app.get('/post', function (req, res) {
        return res.render('post/posts', {member:req.user})
    })

    app.get('/post/:postid', function (req, res) {
        return res.render('post/post', {member:req.user})
    })

    app.get('/post/:postid/edit', function (req, res) {
        return res.render('post/edit', {member:req.user})
    })

    app.post('/post/new', function (req, res) {
        post.newPost(req.user, req.body, function (post) {
            return res.render('post/post', {member:req.user, post:post})
        })
    })

    app.post('/post/:postid/update', function (req, res) {
        post.updatePost(req.body, function (post) {
            return res.render('post/post', {member:req.user, post:post})
        })
    })

}