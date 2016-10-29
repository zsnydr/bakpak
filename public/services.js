angular.module('app-services', ['app-services'])
.factory('Auth', ['$http', '$window', function($http, $window, username, password){
  var isSignedIn;

  var signin = function(username, password){
    console.log('correct');
    console.log('user: ', username, 'pass: ', password)
    return $http({
      method: 'POST',
      url: '/signin',
      data: {
        username: username,
        password: password
        }
    }).then(function(res){
      if(res.data === 'matched'){
        isSignedIn = true;
        $window.location = '/#/explore'
      } else {
        $window.location = '/#/signin'
      }
    })
  }

  var signup = function(username, password){
    return $http({
      method: 'POST',
      url: '/signup',
      data: {
        username: username,
        password: password
        }
    }).then(function(res){
      console.log('resdata', res.data)
      if(res.data === 'user exists' || res.data === 'no user'){
        $window.location = '/#/signup'
      } else {
          $window.location = '/#/explore'
          isSignedIn = true;
      }
    })
    .catch(function(err){
      console.error(err)
    })
  }

  var signout = function () {
    return $http({
      method: 'POST',
      url: '/signout',
      data: {}
    }).then(function(data){
      console.log('SIGNOUT SUCCESS', data);
      isSignedIn = false;
      $window.location = '/#/signin'
    })
  }

  var signedIn = function(){
    return isSignedIn;
  }
return {
  signin: signin,
  signup: signup,
  signout: signout,
  isSignedIn: signedIn
}

}])

.factory('Trips', ['$http', '$location', '$timeout', function($http, $location, $timeout){

  var tripId;

  var saveTrip = function(city, tripTitle) {
    return $http({
      method: 'POST',
      url: '/newTrip',
      data: {city: city, title: tripTitle}
    })
    .then(function(tripData){
      console.log('TRIP DATA', tripData)
      tripId = tripData.data.trip_id;
      console.log('TRIP id in factory', tripId)


      $location.path('/explore')
      return tripData;
    })
  }

  // var getTripId = function() {
  //   return tripId;
  // }

  var getTripId = function() {
    return tripId;
  }

  var getTrips = function() {
    return $http({
      method: 'GET',
      url: '/trips'
    })
    .then(function(trips){
      return trips;
    })
  }

  return {
    saveTrip: saveTrip,
    getTripId: getTripId,
    tripId: tripId,
    getTrips: getTrips
  }

}])

.factory('CityService', function () {
  var city = '';

  var setCity = function(data) {
    console.log('IN SET CITY', data)
    city = data;
  }

  var getCity = function() {
    return city;
  }

  return {
    setCity: setCity,
    getCity: getCity
  }
})

  .service('IdService', function () {
  var id = '';

  var setId = function(data) {
    console.log('IN SET ID', data)
    id = data;
  }

  var getId = function() {
    return id;
  }

  return {
    setId: setId,
    getId: getId
  }

})

.factory('Save', ['$http', function ($http) {

  var savePlace = function (object) {
    $http({
      method: 'POST',
      url: '/savePlace',
      data: object
    })
    .then(function(data) {
      console.log('savePlace SUCCESS', data)
      return data;
    })
  }

  var saveRestaurant = function (object) {
    $http({
      method: 'POST',
      url: '/saveRestaurant',
      data: object
    })
    .then(function(data) {
       console.log('saveRestaurant SUCCESS', data)
      return data;
    })
  }

  var saveEvent = function (object) {
    $http({
      method: 'POST',
      url: '/saveEvent',
      data: object
    })
    .then(function(data) {
      console.log('saveEvent SUCCESS', data)
      return data;
    })
  }

   var saveHotel = function (object) {
    $http({
      method: 'POST',
      url: '/saveHotel',
      data: object
    })
    .then(function(data) {
      console.log('saveEvent SUCCESS', data)
      return data;
    })
  }

   var saveFlight = function (object) {
    $http({
      method: 'POST',
      url: '/saveFlight',
      data: object
    })
    .then(function(data) {
      console.log('saveEvent SUCCESS', data)
      return data;
    })
  }


  return {
    savePlace: savePlace,
    saveRestaurant: saveRestaurant,
    saveEvent: saveEvent,
    saveHotel: saveHotel,
    saveFlight: saveFlight
  }



}])


.factory('remove', ['$http', function ($http) {

  var removePlace = function (object) {
    $http({
      method: 'POST',
      url: '/removePlace',
      data: object
    })
    .then(function(data) {
      console.log('removePlace SUCCESS', data)
      return data;
    })
  }

  var removeRestaurant = function (object) {
    $http({
      method: 'POST',
      url: '/removeRestaurant',
      data: object
    })
    .then(function(data) {
       console.log('removeRestaurant SUCCESS', data)
      return data;
    })
  }

  var removeEvent = function (object) {
    $http({
      method: 'POST',
      url: '/removeEvent',
      data: object
    })
    .then(function(data) {
      console.log('removeEvent SUCCESS', data)
      return data;
    })
  }

   var removeHotel = function (object) {
    $http({
      method: 'POST',
      url: '/removeHotel',
      data: object
    })
    .then(function(data) {
      console.log('removeEvent SUCCESS', data)
      return data;
    })
  }

   var removeFlight = function (object) {
    $http({
      method: 'POST',
      url: '/removeFlight',
      data: object
    })
    .then(function(data) {
      console.log('removeEvent SUCCESS', data)
      return data;
    })
  }


  return {
    removePlace: removePlace,
    removeRestaurant: removeRestaurant,
    removeEvent: removeEvent,
    removeHotel: removeHotel,
    removeFlight: removeFlight
  }



}])
