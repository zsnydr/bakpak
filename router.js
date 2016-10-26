var helpers = require('./routeHelpers.js');


module.exports.router = function (app) {

  app.get('/', function(req,res){
      res.send(200).end();
  });

  app.post('/hotels', helpers.postHotels);

  app.post('/restaurants', helpers.postRestaurants);

  app.post('/arts', helpers.postArts);

  app.post('/weather', helpers.postWeather);

  app.post('/promos', helpers.postPromos);

  app.post('/events', helpers.postEvents);

  app.post('/translate', helpers.postTranslate);

  app.post('/flights', helpers.postFlights);

  app.post('/images', helpers.postImages);

};