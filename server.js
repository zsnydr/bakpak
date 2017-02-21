const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const routes = require('./router.js');
const session = require('express-session');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 27000000 }
}));

routes.router(app);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Listing on port ${app.get('port')}`);
});
