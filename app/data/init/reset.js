var remove = function (model,cb) {

    require('mongodb').MongoClient.connect('mongodb://localhost:27017/ktpweb', function (err, db) {

        db.collection(model).remove({}, function (err) {
            if (err) throw err
            else {
                db.close()
                if (cb) return cb()
            }
        })

    })

}

module.exports = function (cb) {
    remove('sessions', function () {
        remove('accounts', function () {
            remove('members', function () {
                remove('eboards', function () {
                    remove('committees', function () {
                        remove('pledges', function () {
                            if(cb) return cb();
                        })
                    })
                })
            })
        })
    })
}

exports.remove = remove;