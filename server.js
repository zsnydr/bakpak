var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var routes = require('./router.js');
var session = require('express-session');

require('dotenv').config();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));
app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 300*300*300}
}));
routes.router(app);

app.listen(process.env.PORT || 3000);
