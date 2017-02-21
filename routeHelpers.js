const bodyParser = require('body-parser');
const request = require('request');
const query = require("./query.js");
const parseString = require('xml2js').parseString;
const bcrypt = require('bcrypt');

const QPXClient = require('qpx-client'); //for qpx
const util = require('util'); //for qpx

//Require postgres models
const {
  User,
  Trip,
  Hotel,
  Place,
  Event,
  Flight,
  Restaurant,
  Destination
} = require('./schema');

//Set up new postgres instance
const pg = require('pg')
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bakpakattak', {
  dialect: 'postgres'
});

//Establishes the connection to the database
db.authenticate()
.then((err) => {
  console.log('Connection established');
})
.catch((err) => {
  console.log(`Unable to connect to Postgres DB: ${err}`);
});

//Retrieves or creates destination
const findOrCreateDest = (req, res) => {
  return new Promise((resolve, reject) => {
    req.session.trip_id = req.body.trip_id;
    if (req.body.city !== req.session.destination_name) {
      Destination.findOrCreate({ where: { name: req.body.city, trip_id: req.session.trip_id } })
      .spread((destination, created) => {
        req.session.destination_id = destination.get('id');
        req.session.destination_name = destination.get('name');
        resolve();
      });
    } else {
      resolve();
    }
  });
};


module.exports = {
  //Creates new trip
  newTrip: (req, res) => {
    console.log('new trip');
    Trip.findOrCreate({ where: { title: req.body.title, owner_id: req.session.user_id } })
    .spread((trip, created) => {
      if (created) {
        req.session.trip_id = trip.get('id');
        Destination.create({ name: req.body.city, trip_id: req.session.trip_id})
        .then((destination) => {
          req.session.destination_id = destination.get('id');
          req.session.destination_name = destination.get('name');
          res.json({
            trip_id: trip.get('id'),
            dest_id: destination.get('id'),
            dest_name: destination.get('name')
          });
        });
      } else {
        res.json({trip_id: trip.get('id')});
      }
    });
  },

  //Saves places info in the DB Places table
  savePlace: (req, res) => {
    findOrCreateDest(req, res)
    .then(() => {
      Place.findOrCreate({
        where: {
          name: req.body.place.name,
          address: req.body.place.formatted_address,
          type: req.body.place.types[0],
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread((place, created) => {
        res.json({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name,
          created: created
        });
      });
    });
  },

  //Saves events info in the DB Events table
  saveEvent: (req, res) => {
    findOrCreateDest(req, res)
    .then(() => {
      Event.findOrCreate({
        where: {
          name: req.body.event.title[0],
          venue: req.body.event.venue_name[0],
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread((event, created) => {
        res.json({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name,
          created: created
        });
      });
    });
  },

  //Saves restaurants info in the DB Restaurants table
  saveRestaurant: (req, res) => {
    findOrCreateDest(req, res)
    .then(() => {
      Restaurant.findOrCreate({
        where: {
          name: req.body.restaurant.name,
          address: req.body.restaurant.formatted_address,
          rating: req.body.restaurant.rating,
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread((restaurant, created) => {
        res.json({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name,
          created: created
        });
      });
    });
  },

  //Saves hotels info in the DB Hotels table
  saveHotel: (req, res) => {
    findOrCreateDest(req, res)
    .then(() => {
      Hotel.findOrCreate({
        where: {
          name: req.body.hotel.name,
          address: req.body.hotel.formatted_address,
          rating: req.body.hotel.rating,
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread((hotel, created) => {
        res.json({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name,
          created: created
        });
      });
    });
  },

  //Saves flight info in the DB Flights table
  saveFlight: (req, res) => {
    findOrCreateDest(req, res)
    .then(() => {
      Flight.findOrCreate({
        where: {
          origin: req.body.flight.slice[0].segment[0].leg[0].origin,
          destination: req.body.flight.slice[0].segment[0].leg[0].destination,
          duration: req.body.flight.slice[0].segment[0].leg[0].duration,
          departure: req.body.flight.slice[0].segment[0].leg[0].departureTime,
          arrival: req.body.flight.slice[0].segment[0].leg[0].arrivalTime,
          carrier: req.body.flight.slice[0].segment[0].flight.carrier,
          seat: req.body.flight.slice[0].segment[0].cabin,
          price: req.body.flight.saleTotal,
          trip_id: req.session.trip_id,
          destination_id: req.session.destination_id
        }
      })
      .spread((flight, created) => {
        res.json({
          trip_id: req.session.trip_id,
          dest_id: req.session.destination_id,
          dest_name: req.session.destination_name,
          created: created
        });
      });
    });
  },

  //Retrieves all trips for user from the DB
  getTrips: (req, res) => {
    Trip.findAll({
      where: { owner_id: req.session.user_id },
      include: [/*DestinationTrip,*/ Destination, Flight, Hotel, Event, Place, Restaurant]
    })
    .then((trips) => {
      res.json(trips);
    });
  },

  //Compares user's info to info in the DB User table
  signIn: (req, res) => {
    User.find({ where: { username: req.body.username } })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.get('password'), (err, match) => {
          if (match) {
            req.session.user_id = user.get('id');
            req.session.user = user.get('username');
            res.end('matched');
          } else {
            console.error(err);
            res.end('wrong password');
          }
        });
      } else {
        res.end('user does not exist');
      }
    });
  },

  //Creates new user in the DB User table
  signUp: (req, res) => {
    User.find({ where: { username: req.body.username } })
    .then((user) => {
      if (user) {
        res.end('user already exists');
      } else {
        bcrypt.hash(req.body.password, 5, (err, hash) => {
          User.create({ username: req.body.username, password: hash })
          .then((user) => {
            req.session.user_id = user.get('id');
            req.session.user = user.get('username');
            res.end('explore');
          });
        });
      }
    });
  },

  //Deletes current session on log out event
  signOut: (req, res) => {
    delete req.session.user;
    delete req.session.user_id;
    delete req.session.trip_id;
    delete req.session.destination_id;
    delete req.session.destination_name;
    res.end('terminated');
  },

  //Checks if user is currently logged in
  isLoggedIn: (req, res, next) => {
    if (req.session.user){
      next();
    } else {
      res.end('no user');
    }
  },

  //Retrieves hotel info using API
  postHotels: (req, res) => {
   if(req.body.city !== ''){
      query.city = req.body.city;
      const queryHotels = query.hotels + query.city + '&key=' + process.env.GOOGLE;
      request(queryHotels, (error, resp, body) => {
        if (error) {
          console.log(error);
        }
        res.end(resp.body);
      })
    }
  },

  //Retrieves restaurants info using API
  postRestaurants: (req, res) => {
    query.city = req.body.city;
    const queryRestaurants = query.restaurants + query.city + '&key=' + process.env.GOOGLE;
    request(queryRestaurants, (error, resp, body) => {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },

  //Retrieves places info using API
  postArts: (req, res) => {
    query.city = req.body.city;
    const queryArts = query.museum + query.city + '&key=' + process.env.GOOGLE;
    request(queryArts, (error, resp, body) => {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },

  //Retrieves weather info using API
  postWeather: (req, res) => {
    query.city = req.body.city;
    const queryWeather = query.weather + query.city + '&appid=' + process.env.WEATHER;
    request(queryWeather, (error, resp, body) => {
      if (error) {
        console.log(error);
      }
      res.end(body);
    })
  },

  //Retrieves deals info using API
  postPromos: (req, res) => {
    query.city = req.body.city;
    const queryPromos = query.promos + process.env.SQOOT + '&location=' + query.city;
    request(queryPromos, (error, resp, body) => {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },

  //Retrieves events info using API
  postEvents: (req, res) => {
    query.city = req.body.city;
    const queryEvents = query.events + process.env.EVENTFUL + '&location=' + query.city + '&date=Future';
    request(queryEvents, (error, resp, body) => {
      if (error) {
        console.log(error);
      }
      parseString(resp.body, (err, result) => {
        res.end(JSON.stringify(result));
      });
    })
  },

  //Retrieves flights info using API
  postFlights: (req, res) => {
    const options = { //for qpx
      key: process.env.GOOGLE,
      timeout: 15000
    };

    const qpxClient = new QPXClient(options);

    const searchConfig = {
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
    };
    qpxClient.search(searchConfig, (err, data) => {
      if (err) {
        console.log('ERROR' + err);
      } else {
        res.send(data);
      }
    })
  },

  //Retrieves images using API
  postImages: (req, res) => {
    query.city = req.body.city;
    const options = {
      url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=' + query.city + '&mkt=en-us&size=wallpaper',
      headers: { 'Ocp-Apim-Subscription-Key': '46f42b01258b4a46836eb4bcd886c7b1' }
    };
    request(options, (error, resp, body) => {
      if (error) {
        console.log(error);
      }
      res.end(resp.body);
    });
  }
};
