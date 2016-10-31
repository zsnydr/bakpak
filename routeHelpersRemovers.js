// require postgres models
var User = require('./schema').User;
var Trip = require('./schema').Trip;
var Hotel = require('./schema').Hotel;
var Place = require('./schema').Place;
var Event = require('./schema').Event;
var Flight = require('./schema').Flight;
var Restaurant = require('./schema').Restaurant;
var Destination = require('./schema').Destination;

// set up new postgres instance
var pg = require('pg');
var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bakpakattak', {
  dialect: 'postgres'
});

// Establishes the connection to the database
db.authenticate().then(function(err) {
  console.log('Connection established');
}).catch(function(err) {
  console.log('Unable to connect: ', err);
});


module.exports = {
  //Removes whole trip from user's profile
  removeTrip: function(req, res) {
    Trip.destroy({ where: { id: req.body.id }})
    .then(function(destroyedTrip) {
      console.log('Destroyed Trip: ', destroyedTrip);
      res.end('removed trip');
    });
  },

  //Removes destination from user's trip
  removeDestination: function(req, res) {
    Destination.destroy({ where: { id: req.body.id }})
    .then(function(destroyed) {
      console.log('Destroyed Destination: ', destroyed);
      req.session.destination_name = '';
      res.end('removed destination');
    });
  },

  //Removes flight from user's destination
  removeFlight: function(req, res) {
    Flight.destroy({ where: { id: req.body.id }})
    .then(function(destroyed) {
      console.log('Destroyed Flight: ', destroyed);
      res.end('removed flight');
    });
  },

  //Removes hotel from user's destination
  removeHotel: function(req, res) {
    Hotel.destroy({ where: { id: req.body.id }})
    .then(function(destroyed) {
      console.log('Destroyed Hotel: ', destroyed);
      res.end('removed hotel');
    });
  },

  //Removes restaurant from user's destination
  removeRestaurant: function(req, res) {
    Restaurant.destroy({ where: { id: req.body.id }})
    .then(function(destroyed) {
      console.log('Destroyed Restaurant: ', destroyed);
      res.end('removed restaurant');
    });
  },

  //Removes event from user's destination
  removeEvent: function(req, res) {
    Event.destroy({ where: { id: req.body.id }})
    .then(function(destroyed) {
      console.log('Destroyed Event: ', destroyed);
      res.end('removed event');
    });
  },

  //Removes place from user's destination
  removePlace: function(req, res) {
    Place.destroy({ where: { id: req.body.id }})
    .then(function(destroyed) {
      console.log('Destroyed Place: ', destroyed);
      res.end('removed place');
    });
  }

};
