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
        $window.location = '/#/explore';
        return res.data;
      } else {
        return res.data;
      }
    });
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
      if(res.data === 'user already exists' || res.data === 'no user'){
        return res.data;
      } else {
        $window.location = '/#/explore';
        isSignedIn = true;
        return res.data;
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

  var setTripId = function(data) {
    tripId = data;
  }

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
    getTrips: getTrips,
    setTripId: setTripId
  }

}])

.factory('CityService', function () {
  var city = '';

  var setCity = function(data) {
    if(data === '') {
      console.log(true);
    }
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


.factory('Remove', ['$http', function ($http) {

  var removePlace = function (object) {
    return $http({
      method: 'PUT',
      url: '/removePlace',
      data: object
    })
    .then(function(data) {
      console.log('removePlace SUCCESS', data)
      return data;
    })
  }

  var removeRestaurant = function (object) {
    return $http({
      method: 'PUT',
      url: '/removeRestaurant',
      data: object
    })
    .then(function (data) {
       console.log('removeRestaurant SUCCESS', data)
      return data;
    })
  }

  var removeEvent = function (object) {
    return $http({
      method: 'PUT',
      url: '/removeEvent',
      data: object
    })
    .then(function(data) {
      console.log('removeEvent SUCCESS', data)
      return data;
    })
  }

   var removeHotel = function (object) {
    return $http({
      method: 'PUT',
      url: '/removeHotel',
      data: object
    })
    .then(function(data) {
      console.log('removehotel SUCCESS', data)
      return data;
    })
  }

   var removeFlight = function (object) {
    return $http({
      method: 'PUT',
      url: '/removeFlight',
      data: object
    })
    .then(function(data) {
      console.log('removeflight SUCCESS', data)
      return data;
    })
  }

  var removeTrip = function (object) {
    return $http({
      method: 'PUT',
      url: '/removeTrip',
      data: object
    })
    .then(function(data) {
      console.log('removetrip SUCCESS', data)
      return data;
    })
  }

  var removeDestination = function (object) {
    console.log("REMOVE DEST OBJ", object)
    return $http({
      method: 'PUT',
      url: '/removeDestination',
      data: object
    })
    .then(function(data) {
      console.log('removedestination SUCCESS', data)
      return data;
    })
  }


  return {
    removePlace: removePlace,
    removeRestaurant: removeRestaurant,
    removeEvent: removeEvent,
    removeHotel: removeHotel,
    removeFlight: removeFlight,
    removeTrip: removeTrip,
    removeDestination: removeDestination
  }



}])
