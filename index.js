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
    "consumerKey": "b7zg7k8fcPvK27sHIOYOwMSqG",
    "consumerSecret": "orhgMLC0DVxkkELhAYaMw14685FWWmYzhrzxrKtAtT6nlaI9M8",
    "accessToken": "855355436-Q4bbLZflQuoHP3I5PtQjtXrMDaSQ0WXnM5DXa3TG",
    "accessTokenSecret": "cYFg5epLwcmDnBzLqImEt45Wg60qUDaZUc6nxDgXz6s3P"
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

app.use(express.static('public'));

//post to retrieve user data
app.post('/twitter/user', function (req, res) {
	var username = req.body.username;
	var data = twitter.getUser({ screen_name: username}, function(error, response, body){
		res.status(404).send({
			"error" : "User Not Found"
		});
	}, function(data){
		res.send({
			result : {
				"userData" : data
			}
		});
	});
});


var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;
});