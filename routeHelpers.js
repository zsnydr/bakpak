var bodyParser = require('body-parser');
var request = require('request');
var query = require("./query.js");
var parseString = require('xml2js').parseString;

var QPXClient = require('qpx-client'); //for qpx
var util = require('util'); //for qpx

// require postgres models
var User = require('./schema').User;
var Trip = require('./schema').Trip;
var Destination = require('./schema').Destination;
var Flight = require('./schema').Flight;
var Hotel = require('./schema').Hotel;
var Place = require('./schema').Place;
var Restaurant = require('./schema').Restaurant;
var DestinationTrip = require('./schema').DestinationTrip;
var UserTrip = require('./schema').UserTrip;

// set up new postgres instance
var pg = require('pg')
var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bakpakattak', {
  dialect: 'postgres'
});
var bcrypt = require('bcrypt');

// Establishes the connection to the database
db.authenticate().then(function(err) {
  console.log('Connection established');
}).catch(function(err) {
  console.log('Unable to connect: ', err);
});

module.exports = {

  savePlaces: function(req, res) {
    //save places info in the DB Places table
  },

  saveEvents: function(req, res) {
    //save events info in the DB Events table
  },

  saveRestaurants: function(req, res) {
    //save restaurants info in the DB Restaurants table
  },

  saveHotels: function(req, res) {
    //save hotels info in the DB Hotels table
  },

  saveFlight: function(req, res) {
    //save flight info in the DB Flights table
  },

  getTrips: function(req, res) {
    //using userID from the session
    //find user in the Users table
    //send back user's trips data from DB Trips table
  },

  signIn: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    //console.log('signin function: ', username, password);
    //console.log('session: ', req.session);
    User.find({
      where: {
        username: username
      }
    }).then(function(user) {
      if (user) {
        bcrypt.compare(password, user.get('password'), function(err, match) {
          if (match) {
            req.session.user = user.get('username');
            console.log('session: ', req.session)
            console.log(req.session.user)
            console.log('matched')
            res.end('matched')
          } else {
            res.end('failed')

          }
        })
      } else {
        console.error(err);
        res.end('failed');
      }
    })
  },

  signUp: function(req, res) {
    var newName = req.body.username;
    var newPass = req.body.password;
    User.find({
      where: {
        username: newName
      }
    }).then(function(user) {
      if (user) {
        console.log('signup failed. user:', user)
        res.end('user exists');
      } else {
        bcrypt.hash(newPass, 5, function(err, hash) {
          console.log('HASH ', hash);
          User.create({
            username: newName,
            password: hash
          }).then(function(user) {
            req.session.user = user.get('username');
            console.log('session: ', req.session)
            console.log(req.session.user)
            console.log('redirecting')
            res.end('explore')
          })
        })
      }
    })
  },

  isLoggedIn: function(req, res){
    console.log('req.session: ', req.session)
    var session = req.session;
    if (session.user){
      console.log('session user')
      next();
    } else {
        console.log('no user')
        res.end('no user')
  }},

  postHotels: function(req, res) {

    //save destination city in the DB for current user

    query.city = req.body.city;
    var queryHotels = query.hotels + query.city + '&key=' + process.env.GOOGLE;
    request(queryHotels, function(error, resp, body) {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },
  postRestaurants: function(req, res) {
    query.city = req.body.city;
    var queryRestaurants = query.restaurants + query.city + '&key=' + process.env.GOOGLE;

    request(queryRestaurants, function(error, resp, body) {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },
  postArts: function(req, res) {
    query.city = req.body.city;
    var queryArts = query.museum + query.city + '&key=' + process.env.GOOGLE;

    request(queryArts, function(error, resp, body) {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },
  postWeather: function(req, res) {
    query.city = req.body.city;
    var queryWeather = query.weather + query.city + '&appid=' + process.env.WEATHER;

    request(queryWeather, function(error, resp, body) {
      if (error) {
        console.log(error);
      }
      res.end(body);
    })
  },
  postPromos: function(req, res) {
    query.city = req.body.city;
    var queryPromos = query.promos + process.env.SQOOT + '&location=' + query.city;
    request(queryPromos, function(error, resp, body) {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },
  postEvents: function(req, res) {
    query.city = req.body.city;
    var queryEvents = query.events + process.env.EVENTFUL + '&location=' + query.city + '&date=Future';
    request(queryEvents, function(error, resp, body) {
      if (error) {
        console.log(error);
      }

      parseString(resp.body, function(err, result) {
        // console.log(result);
        res.end(JSON.stringify(result));
      });

    })
  },
  postTranslate: function(req, res) {
    query.text = req.body.inputText
    query.country = 'en-' + req.body.country;
    var queryTranslate = query.translate + process.env.YANDEX + '&text=' + query.text + '&lang=' + query.country;

    request(queryTranslate, function(error, resp, body) {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },
  postFlights: function(req, res) {

    options = { //for qpx
      key: process.env.GOOGLE,
      timeout: 15000
    }

    qpxClient = new QPXClient(options);

    searchConfig = {
      body: {
        "request": {
          "passengers": {
            "adultCount": 1
          },
          "slice": [{
            "origin": req.body.origin,
            "destination": req.body.destination,
            "date": req.body.date
          }],
          "solutions": 10
        }
      }
    }
    qpxClient.search(searchConfig, function(err, data) {
      if (err) {
        console.log('ERROR' + err);
      } else {
        res.send(data);
      }
    })
  },
  postImages: function(req, res) {
    query.city = req.body.city;
    var options = {
      url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=' + query.city + '&mkt=en-us&size=wallpaper',
      headers: {
        'Ocp-Apim-Subscription-Key': '46f42b01258b4a46836eb4bcd886c7b1'
      }
    }
    request(options, function(error, resp, body) {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  }

};
