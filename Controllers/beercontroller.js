var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('6a9295f5652fd5ef1ed7bf0fd6bae84b');
var express  = require('express');
var router = express.Router();

router.get('/beerme')