var express  = require('express');
var app      = express();

// require('./auth/init')(app); // uncomment for login (mongodb dependency)

app.get('/constitution', function (req, res) {
    res.sendfile('public/constitution/index.html');
});

app.post('/interest', function (req, res) {
	var str = 'name: ' + req.body.name + ' email: ' + req.body.email + ' year: ' + req.body.year + '\n';
	require('fs').appendFile('data/interest.txt',str, function(err){
		res.send('Thanks!');
	});
});

app.get('/:section', serveIndex);
app.get('/', serveIndex);
function serveIndex (req,res) {
    res.sendfile('public/index.html');
}

// initialize twitter on start of server, rather than on each /fetch-tweets request
// authenticating twitter account
var twit = new require('twitter')({
    consumer_key: '3xxHwU4Aj3PLFf0SG2C77pfeD',
    consumer_secret: '5tp9lYTn7KdWNb9GNi1yqrzBYWnwuDeT331NZdUfGohmfHkR6P',
    access_token_key: '1213699087-BvXlfRn4ijklwKU5S7pdVKsCf58uUr29Glf0r3Q',
    access_token_secret: 'JO7OZbGA363nJ19EGoNL5jrXqrh0lLIiAsBXDVrMrKMuJ'
});

app.get('/api/fetch-tweets', function (req,res) {
	twit.get('/statuses/user_timeline.json?', { count: 5 }, function (tweets) {
		var arr = tweets.map(function (elt) { return elt.text; });
		res.send(arr)
	});
});


app.use(express.static(__dirname+'/public'));

app.listen(3000,function(){
	console.log('KTP web server listening on port 3000!');
});
