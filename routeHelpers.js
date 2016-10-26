var bodyParser = require('body-parser');
var request = require('request');
var query  = require("./query.js");
var parseString = require('xml2js').parseString;

var QPXClient = require('qpx-client');//for qpx
var util = require('util');//for qpx

module.exports = {

  postHotels: function(req,res){

    query.city = req.body.city;
    var queryHotels = query.hotels + query.city + '&key=' + process.env.GOOGLE;
    request(queryHotels, function(error, resp, body){
      if(error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },

  postRestaurants: function(req,res){
    query.city = req.body.city;
    var queryRestaurants = query.restaurants + query.city + '&key=' + process.env.GOOGLE;

    request(queryRestaurants, function(error, resp, body){
      if(error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },

  postArts: function(req,res){
    query.city = req.body.city;
    var queryArts = query.museum + query.city + '&key=' + process.env.GOOGLE;


    request(queryArts, function(error, resp, body){
      if(error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },

  postWeather: function(req,res){
    query.city = req.body.city;
    var queryWeather = query.weather + query.city + '&appid=' + process.env.WEATHER;

    request(queryWeather, function(error, resp, body){
      if(error) {
        console.log(error);
      }
      res.end(body);
    })
  },

  postPromos: function(req,res){
    query.city = req.body.city;
    var queryPromos = query.promos + process.env.SQOOT + '&location=' + query.city;
    request(queryPromos, function(error, resp, body){
      if(error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },

  postEvents: function(req,res){
    query.city = req.body.city;
    var queryEvents = query.events + process.env.EVENTFUL + '&location=' + query.city + '&date=Future';
    request(queryEvents, function(error, resp, body){
      if(error) {
        console.log(error);
      }

      parseString(resp.body, function(err, result){
        // console.log(result);
        res.end(JSON.stringify(result));
      });

    })
  },

  postTranslate: function(req,res){
    query.text=req.body.inputText
    query.country = 'en-' + req.body.country;
    var queryTranslate = query.translate + process.env.YANDEX + '&text=' + query.text + '&lang=' + query.country;

    request(queryTranslate, function(error, resp, body){
      if(error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  },

  postFlights: function(req,res){
    
    options = { //for qpx
      key: process.env.GOOGLE,
      timeout: 15000
    }

    qpxClient = new QPXClient(options);

    searchConfig = {
      body: {
        "request":{
         "passengers":{
            "adultCount": 1
          },
          "slice": [
            {
              "origin": req.body.origin,
              "destination": req.body.destination,
              "date": req.body.date
            }
          ],
          "solutions": 10
          }
        }
      }
      qpxClient.search(searchConfig, function(err,data){
        if(err){
          console.log('ERROR' + err);
        }else{
          res.send(data);
        }
      })
  },

  postImages: function(req,res) {
    query.city = req.body.city;
    var options = {
      url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q='+query.city+'&mkt=en-us&size=wallpaper',
      headers: {
        'Ocp-Apim-Subscription-Key': '46f42b01258b4a46836eb4bcd886c7b1'
      },
    }
    request(options, function(error, resp, body){
      if(error) {
        console.log(error);
      }
      res.end(resp.body);
    })
  }

};