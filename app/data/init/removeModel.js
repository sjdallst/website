module.exports = function (model,cb) {
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

