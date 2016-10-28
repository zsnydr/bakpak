var helpers = require('./routeHelpers.js');


module.exports.router = function (app) {

  app.get('/', function(req,res){
      res.send(200).end();
  });

  //API calls
  app.post('/hotels', helpers.postHotels);

  app.post('/restaurants', helpers.postRestaurants);

  app.post('/arts', helpers.postArts);

  app.post('/weather', helpers.postWeather);

  app.post('/promos', helpers.postPromos);

  app.post('/events', helpers.postEvents);
  
  app.post('/flights', helpers.postFlights);

  app.post('/images', helpers.postImages);

  //Authentication
  app.post('/signin', helpers.signIn);

  app.post('/signup', helpers.signUp);

  app.post('/signout', helpers.signOut);

  //User's trips
  app.post('/newTrip', helpers.newTrip);

  app.get('/trips', helpers.getTrips);

  app.post('/saveFlight', helpers.saveFlight);

  app.post('/saveHotel', helpers.saveHotel);

  app.post('/saveRestaurant', helpers.saveRestaurant);

  app.post('/saveEvent', helpers.saveEvent);

  app.post('/savePlace', helpers.savePlace);

};
