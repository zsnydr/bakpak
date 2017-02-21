const pg = require('pg');
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
  console.log('Unable to connect: ', err);
});


//Creates table of users
const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.TEXT,
    unique: true
  },
  password: Sequelize.TEXT,
});

//Creates table of trips
const Trip = db.define('trip', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  //id of the user who made the trip
  owner_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  title: Sequelize.TEXT
});

//Creates table of destinations
const Destination = db.define('destination', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT
});

//Creates table of flights
const Flight = db.define('flight', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  origin: Sequelize.TEXT,
  destination: Sequelize.TEXT,
  duration: Sequelize.INTEGER,
  // flightNo: Sequelize.INTEGER,
  departure: Sequelize.DATE,
  arrival: Sequelize.DATE,
  carrier: Sequelize.TEXT,
  seat: Sequelize.TEXT,
  price: Sequelize.TEXT,
});

//Creates table of hotels
const Hotel = db.define('hotel', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  address: Sequelize.TEXT,
  rating: Sequelize.DECIMAL(10,1),
});

//Creates table of places
const Place = db.define('place', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  address: Sequelize.TEXT,
  type: Sequelize.TEXT,
});

//Creates table of restaurants
const Restaurant = db.define('restaurant', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  address: Sequelize.TEXT,
  rating: Sequelize.DECIMAL(10,1),
});

//Creates table of events
const Event = db.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  venue: Sequelize.TEXT,
});

//Creates table of users/trips
const UserTrip = db.define('users_trip', {
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Trip,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

//Defines relationships between tables

Trip.hasMany(Destination, { foreignKey: 'trip_id'});

Trip.hasMany(Flight, { foreignKey: 'trip_id' });
Destination.hasMany(Flight, { foreignKey: 'destination_id' });

Trip.hasMany(Hotel, { foreignKey: 'trip_id' });
Destination.hasMany(Hotel, { foreignKey: 'destination_id' });

Trip.hasMany(Place, { foreignKey: 'trip_id' });
Destination.hasMany(Place, { foreignKey: 'destination_id' });

Trip.hasMany(Event, { foreignKey: 'trip_id' });
Destination.hasMany(Event, { foreignKey: 'destination_id' });

Trip.hasMany(Restaurant, { foreignKey: 'trip_id' });
Destination.hasMany(Restaurant, { foreignKey: 'destination_id' });


//Create Tables
db.sync({force: false})
.then(() => {
  console.log('Tables synced');
})
.catch((err) => {
  console.log('Error syncing tables');
});

module.exports = {
  User,
  Trip,
  Destination,
  Flight,
  Hotel,
  Place,
  Event,
  Restaurant
};
