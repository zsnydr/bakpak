var express = require('express');
var app = express();
var path = require('path');

//next is a function that you call in middleware to tell express to pass along to next function
//The role of mount path 
app.use('/public', function(req, res, next) {
	console.log(req.url, req.method);
	next();
}, express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/beerme', function(req, res){
	console.log('hello!');
})

app.all("/api/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// export our app for testing and flexibility, required by index.js
module.exports = app;
