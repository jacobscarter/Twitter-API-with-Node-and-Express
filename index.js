module.exports = require('./node_modules/twitter-js-client/lib/Twitter');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var config = {
    "consumerKey": "XXXXXXXXXX",
    "consumerSecret": "XXXXXXXXXX",
    "accessToken": "XXXXXXXXXX",
    "accessTokenSecret": "XXXXXXXXXX"
};

var twitter = new module.exports.Twitter(config);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*
 * To connect to a front end app (i.e. AngularJS) store all your files you will *
 * statically store in declared below (i.e. ./public) *
*/

//app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Welcome to Twitter API with Node and Express!');
});

//post to retrieve user data
app.post('/twitter/user', function (req, res) {
	var username = req.body.username;
	var data = twitter.getUser({ screen_name: username}, function(error, response, body){
		res.send({
			"error" : error
		});
	}, function(data){
		res.send({
			result : {
				"userData" : data
			}
		});
	});
});

//get to retrieve auth token
app.get('/twitter/auth/request', function (req, res) {
	var username = req.body.username;
	var data = twitter.getOAuthRequestToken(function(data){
		res.send({
			result : {
				"authToken" : data
			}
		});
	});
});



var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;
});