angular.module('app-services', [])
.factory('Auth', ['$http', '$window', function($http, $window, username, password){

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
      $window.location = '/#/signin'
    })
  }

return {
  signin: signin,
  signup: signup,
  signout: signout
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

  return {
    saveTrip: saveTrip,
    getTripId: getTripId,
    tripId: tripId
  }

}])

.service('CityService', function () {
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
    getId: setId,
    getId: getId
  }

})

.factory('Save', ['$http', function ($http) {

  var savePlace = function (object) {
    $http({
      method: 'POST',
      url: '/savePlace'
      data: object
    })
    .then(function(data) {
      return data;
    })
  }

  var saveRestaurant = function (object) {
    $http({
      method: 'POST',
      url: '/saveRestaurant'
      data: object
    })
    .then(function(data) {
      return data;
    })
  }

  var saveEvent = function (object) {
    $http({
      method: 'POST',
      url: '/saveEvent'
      data: object
    })
    .then(function(data) {
      return data;
    })
  }



}])





























