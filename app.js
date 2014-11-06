var express = require('express');
var app = express();

//swag

app.use(require('body-parser').urlencoded({extended:true}));
// require('./app/main')(app); // uncomment for login (mongodb dependency)

app.get('/constitution', function (req, res) {
    res.sendfile('public/constitution/index.html');
})

app.post('/interest', function (req, res) {
    var data = req.body
    var str = ''
    for (var field in data) {
        str += field + ': ' + data[field] + '\t'
    }
    str += '\n'
	require('fs').appendFile('data/interest.txt', str, function(err){
		res.send('Thanks!');
	});
});

//////// application stuff //////////

var formidable = require('formidable'),
    fs = require('fs')

app.get('/application', function (req,res) {
    var end = new Date(2014, 8, 20)
    if(Date.now() > end.getTime()) res.send('Application closed'); 
    else res.sendfile('public/application.html');
});

app.post('/application', function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        fs.mkdir('./data/'+fields.uniqname, function (err) {
            if(err && err.code !== 'EEXIST') throw err;
            var application = ''
            for(var field in fields) {
                application += field + ':\r\n'
                application += fields[field] + '\r\n'
            }
            fs.writeFile('./data/'+fields.uniqname+'/application.txt', application, function (err) {
                if(err) throw err;
            })
            for(var file in files) {                
                fs.rename(files[file].path,'./data/'+fields.uniqname+'/'+files[file].name, function (err) {
                    if(err) throw err;
                })
            }
        })
    })
    res.send('<html><body><center><br><h1>Thank you!</h1></center></body></html>');
});

////////// main page routing ////////////
app.use(express.static(__dirname+'/public'));

app.get('/:section', serveIndex); // note, this is bugged, s.t. its confising to add normal routes
app.get('/', serveIndex);
function serveIndex (req,res) {
    res.sendfile('public/index.html');
}

// // initialize twitter on start of server, rather than on each /fetch-tweets request
// // authenticating twitter account
// var twit = new require('twitter')({
//     consumer_key: '3xxHwU4Aj3PLFf0SG2C77pfeD',
//     consumer_secret: '5tp9lYTn7KdWNb9GNi1yqrzBYWnwuDeT331NZdUfGohmfHkR6P',
//     access_token_key: '1213699087-BvXlfRn4ijklwKU5S7pdVKsCf58uUr29Glf0r3Q',
//     access_token_secret: 'JO7OZbGA363nJ19EGoNL5jrXqrh0lLIiAsBXDVrMrKMuJ'
// });

// app.get('/api/fetch-tweets', function (req,res) {
// 	twit.get('/statuses/user_timeline.json?', { count: 5 }, function (tweets) {
// 		var arr = tweets.map(function (elt) { return elt.text; });
// 		res.send(arr)
// 	});
// });


if (process.env.NODE_ENV !== 'serv') {
    app.listen(3000)
} else {
    console.log('LIVE')
    app.listen(80)
    process.on('uncaughtException', function (err) {
        console.dir(err)
        console.trace(err)
    })
}
