var remove = require(__dirname+'/removeModel.js')

module.exports = function (cb) {
    remove('sessions', function () {
        remove('accounts', function () {
            remove('members', function () {
                remove('eboards', function () {
                    remove('committees', function () {
                        remove('pledges', function () {
                            remove('pledgeTasks', function () {
                                remove('pledgeMeetings', function() {
                                    if(cb) return cb();
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}