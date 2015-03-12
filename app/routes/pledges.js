var pledgeTask = require(__dirname+'/../model/pledgeTask')
// var mongoose = require('mongoose')
module.exports = function (app) { 

    app.get('/pledgeTasks', function (req, res) {
        pledgeTask.allTasks( function(tasks) {
            return res.render('pledges/pledgeTasks', {tasks:tasks,member:req.user})
        })
    })


}