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
var Event = require('./schema').Event;
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

  newTrip: function(req, res) {
    console.log('new trip');
    Trip.findOrCreate({ where: { title: req.body.title, owner_id: req.session.user_id } })
    .spread(function(trip, created) {
      if (created) {
        console.log('created')
        console.log('trip:', trip)
        req.session.trip_id = trip.get('id');
        Destination.create({ where: { name: req.body.city, trip_id: req.session.trip_id } })
        .then(function(destination) {
          console.log("YAY we are in destination")
          req.session.destination_id = destination.get('id');
          req.session.destination_name = destination.get('name');
          // DestinationTrip.create({ trip_id: trip.get('id'), destination_id: destination.get('id') })
          // .then(function(desttrip) {
            res.json({
              trip_id: trip.get('id'),
              dest_id: destination.get('id'),
              dest_name: destination.get('name')
            });
          });
        // });
      } else {
        res.json({trip_id: trip.get('id')});
      }
    });
  },

  savePlace: function(req, res) {
    //save places info in the DB Places table
    new Promise(function(resolve, reject) {
      if (req.body.city !== req.session.destination_name) {
        Destination.findOrCreate({ where: { name: req.body.city, trip_id: req.session.trip_id } })
        .spread(function(destination, created) {
          req.session.destination_id = destination.get('id');
          req.session.destination_name = destination.get('name');
          resolve();
        })
      } else {
        resolve();
      }
    }).then(function() {
      Place.findOrCreate({
        where: {
          name: req.body.name,
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread(function(place, created) {
        res.end({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name
        });
      });
    });
  },

  saveEvent: function(req, res) {
    //save events info in the DB Events table
    new Promise(function(resolve, reject) {
      if (req.body.city !== req.session.destination_name) {
        Destination.findOrCreate({ where: { name: req.body.city, trip_id: req.session.trip_id } })
        .spread(function(destination, created) {
          req.session.destination_id = destination.get('id');
          req.session.destination_name = destination.get('name');
          resolve();
        })
      } else {
        resolve();
      }
    }).then(function() {
      Event.findOrCreate({
        where: {
          name: req.body.name,
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread(function(event, created) {
        res.end({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name
        });
      });
    });
  },

  saveRestaurant: function(req, res) {
    //save restaurants info in the DB Restaurants table
    new Promise(function(resolve, reject) {
      if (req.body.city !== req.session.destination_name) {
        Destination.findOrCreate({ where: { name: req.body.city, trip_id: req.session.trip_id } })
        .spread(function(destination, created) {
          req.session.destination_id = destination.get('id');
          req.session.destination_name = destination.get('name');
          resolve();
        })
      } else {
        resolve();
      }
    }).then(function() {
      Restaurant.findOrCreate({
        where: {
          name: req.body.name,
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread(function(restaurant, created) {
        res.end({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name
        });
      });
    });
  },

  saveHotel: function(req, res) {
    //save hotels info in the DB Hotels table
    new Promise(function(resolve, reject) {
      if (req.body.city !== req.session.destination_name) {
        Destination.findOrCreate({ where: { name: req.body.city, trip_id: req.session.trip_id } })
        .spread(function(destination, created) {
          req.session.destination_id = destination.get('id');
          req.session.destination_name = destination.get('name');
          resolve();
        })
      } else {
        resolve();
      }
    }).then(function() {
      Hotel.findOrCreate({
        where: {
          name: req.body.name,
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread(function(hotel, created) {
        res.end({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name
        });
      });
    });
  },

  saveFlight: function(req, res) {
    //save flight info in the DB Flights table
    new Promise(function(resolve, reject) {
      if (req.body.city !== req.session.destination_name) {
        Destination.findOrCreate({ where: { name: req.body.city, trip_id: req.session.trip_id } })
        .spread(function(destination, created) {
          req.session.destination_id = destination.get('id');
          req.session.destination_name = destination.get('name');
          resolve();
        })
      } else {
        resolve();
      }
    }).then(function() {
      Flight.findOrCreate({
        where: {
          origin: req.body.origin,
          flightNo: req.body.flightNo,
          departure: req.body.departure,
          arrival: req.body.arrival,
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread(function(flight, created) {
        res.end({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name
        });
      });
    });
  },

  getTrips: function(req, res) {
    Trip.findAll({
      where: { owner_id: req.session.user_id },
      include: [/*DestinationTrip,*/ Destination, Flight, Hotel, Event, Place, Restaurant]
    })
    .then(function(trips) {
      console.log('TRIPS ', trips);
      res.json(trips);
    });
  },

  signIn: function(req, res) {
    User.find({ where: { username: req.body.username } })
    .then(function(user) {
      if (user) {
        bcrypt.compare(req.body.password, user.get('password'), function(err, match) {
          if (match) {
            req.session.user_id = user.get('id');
            req.session.user = user.get('username');
            res.end('matched')
          } else {
            console.error(err);
            res.end('failed')
          }
        })
      } else {
        res.end('failed');
      }
    });
  },

  signUp: function(req, res) {
    User.find({ where: { username: req.body.username } })
    .then(function(user) {
      if (user) {
        res.end('user exists');
      } else {
        bcrypt.hash(req.body.password, 5, function(err, hash) {
          User.create({ username: req.body.username, password: hash })
          .then(function(user) {
            req.session.user_id = user.get('id');
            req.session.user = user.get('username');
            res.end('explore')
          });
        });
      }
    });
  },

  signOut: function(req, res) {
    delete req.session.user;
    delete req.session.user_id;
    delete req.session.trip_id;
    delete req.session.destination_id;
    delete req.session.destination_name;
    res.end('terminated');
  },

  isLoggedIn: function(req, res){
    console.log('req.session: ', req.session)
    if (req.session.user){
      console.log('session user')
      next();
    } else {
      console.log('no user')
      res.end('no user')
    }
  },

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
