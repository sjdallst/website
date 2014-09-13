var express = require('express');
var app = express();

app.use('/data',express.directory('data'))
app.use('/data',express.static('data'))

app.listen(6969,function(){
    console.log('KTP web server listening on port 6969!')
})