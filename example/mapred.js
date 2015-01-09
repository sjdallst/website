var arr = [1,4,5,6,3]

var x = arr.map(function (elt) {
    return elt*-1;
})

console.log(arr)
console.log(x)

var y = arr.reduce(function (prev, cur) {
    return prev + cur;
},0)

console.log(y)
