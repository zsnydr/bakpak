var pg = require('pg')
var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bakpakattack', {
  dialect: 'postgres'
});

//Establishes the connection to the database
db
  .authenticate()
  .then(function (err) {
    console.log('Connection established');
  })
  .catch(function (err) {
    console.log('Unable to connect: ', err);
  });


//Creates table of users
var User = db.define('user', {
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

//creates table of trips
var Trip = db.define('trip', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  //id of the user who made the trip
  owner_id: Sequelize.INTEGER,
  title: Sequelize.TEXT
});

var Destination = db.define('destination', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.TEXT,
    unique: true
  }
});

var Flight = db.define('flight', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  origin: Sequelize.TEXT,
  flightNo: Sequelize.INTEGER,
  departure: Sequelize.DATE,
  arrival: Sequelize.DATE,
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Trip',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Destination',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var Hotel = db.define('hotel', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Trip',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Destination',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var Place = db.define('place', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Trip',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Destination',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var Restaurant = db.define('restaurant', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT,
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Trip',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Destination',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var TripDestination = db.define('trips_destination', {
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Trip',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  destination_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Destination',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

var UserTrip = db.define('users_trip', {
  trip_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Trip',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'User',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

//Defines relationships between tables
User.hasMany(Trip);
Trip.belongsTo(User);

User.hasMany(Claim);
Claim.belongsTo(User);

Ticket.hasOne(Claim);
Claim.belongsTo(Ticket);

//Create Tables
db
  .sync({force: true})
  .then(function() {
    console.log('Tables created');
 });

module.exports = {
  User: User,
  Trip: Trip,
  Destination: Destination,
  Flight: Flight,
  Hotel: Hotel,
  Place: Place,
  Restaurant: Restaurant,
  TripDestination: TripDestination,
  UserTrip: UserTrip
};
