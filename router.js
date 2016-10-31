var helpers = require('./routeHelpers');
var removers = require('./routeHelpersRemovers');


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
  app.get('/validateLogIn', helpers.isLoggedIn, function(req, res) { res.end(); });

  app.post('/signin', helpers.signIn);

  app.post('/signup', helpers.signUp);

  app.post('/signout', helpers.signOut);

  //Add info to personal trip
  app.post('/newTrip', helpers.newTrip);

  app.get('/trips', helpers.getTrips);

  app.post('/saveFlight', helpers.saveFlight);

  app.post('/saveHotel', helpers.saveHotel);

  app.post('/saveRestaurant', helpers.saveRestaurant);

  app.post('/saveEvent', helpers.saveEvent);

  app.post('/savePlace', helpers.savePlace);

  //Remove items from trip
  app.put('/removeTrip', removers.removeTrip);

  app.put('/removeFlight', removers.removeFlight);

  app.put('/removeHotel', removers.removeHotel);

  app.put('/removeRestaurant', removers.removeRestaurant);

  app.put('/removeEvent', removers.removeEvent);

  app.put('/removePlace', removers.removePlace);

  app.put('/removeDestination', removers.removeDestination);

};
