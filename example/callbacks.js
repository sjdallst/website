
function takeACallback (cb) {
    var a = 'yolo'
    return cb(a)
}

takeACallback( function (a) {
    console.log(a)
})


// function beACallback (a) {
//     console.log(a)
// }

// takeACallback(beACallback)