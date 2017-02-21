// require postgres models
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

// set up new postgres instance
const pg = require('pg');
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bakpakattak', {
  dialect: 'postgres'
});

// Establishes the connection to the database
db.authenticate()
.then((err) => {
  console.log('Connection established');
}).catch((err) => {
  console.log('Unable to connect: ', err);
});


module.exports = {
  //Removes whole trip from user's profile
  removeTrip: (req, res) => {
    Trip.destroy({ where: { id: req.body.id }})
    .then((destroyedTrip) => {
      console.log('Destroyed Trip: ', destroyedTrip);
      res.end('removed trip');
    });
  },

  //Removes destination from user's trip
  removeDestination: (req, res) => {
    Destination.destroy({ where: { id: req.body.id }})
    .then((destroyed) => {
      console.log('Destroyed Destination: ', destroyed);
      req.session.destination_name = '';
      res.end('removed destination');
    });
  },

  //Removes flight from user's destination
  removeFlight: (req, res) => {
    Flight.destroy({ where: { id: req.body.id }})
    .then((destroyed) => {
      console.log('Destroyed Flight: ', destroyed);
      res.end('removed flight');
    });
  },

  //Removes hotel from user's destination
  removeHotel: (req, res) => {
    Hotel.destroy({ where: { id: req.body.id }})
    .then((destroyed) => {
      console.log('Destroyed Hotel: ', destroyed);
      res.end('removed hotel');
    });
  },

  //Removes restaurant from user's destination
  removeRestaurant: (req, res) => {
    Restaurant.destroy({ where: { id: req.body.id }})
    .then((destroyed) => {
      console.log('Destroyed Restaurant: ', destroyed);
      res.end('removed restaurant');
    });
  },

  //Removes event from user's destination
  removeEvent: (req, res) => {
    Event.destroy({ where: { id: req.body.id }})
    .then((destroyed) => {
      console.log('Destroyed Event: ', destroyed);
      res.end('removed event');
    });
  },

  //Removes place from user's destination
  removePlace: (req, res) => {
    Place.destroy({ where: { id: req.body.id }})
    .then((destroyed) =>{
      console.log('Destroyed Place: ', destroyed);
      res.end('removed place');
    });
  }
};
