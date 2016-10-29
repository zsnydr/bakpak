angular.module('bakpak.trips', [])

.controller('tripsController', ['$scope', 'Trips', 'CityService', 'Auth', 'IdService', 'Remove', function($scope, Trips, CityService, Auth, IdService, Remove){

  $scope.city = '';
  $scope.tripTitle = '';
  $scope.showInfo = false;

  $scope.saveTrip = function() {
    Trips.saveTrip($scope.city, $scope.tripTitle)
      .then(function(tripData){
        $scope.tripData = tripData;


      });
  }

  $scope.setCity = function() {
    CityService.setCity($scope.city);
  }

  $scope.getTrips = function() {

    Trips.getTrips()
      .then(function(info){
         console.log('data', info.data)
        $scope.trips = info.data;
      })
  }

  $scope.showInfoFunc = function () {
    $scope.showInfo = !$scope.showInfo;
  }




  $scope.removeHotel = function (hotel) {
    Remove.removeHotel(hotel)
    .then(function (data) {
      console.log('REMOVE HOTEL SUCCESS', data)
      $scope.getTrips();
    })
  }

  $scope.removeRestaurant = function (restaurant) {
    console.log('rest', restaurant)
    Remove.removeRestaurant(restaurant)
      .then(function (res) {
        console.log('REMOVE RESTAURANT SUCCESS', res)
        $scope.getTrips();
      })
      .catch(function (err) {
        console.log('ERR', err)
      })
  }
  
  $scope.removePlace = function (Place) {
    Remove.removePlace(Place)
    .then(function () {
      console.log('REMOVE PLACE SUCCESS')
      $scope.getTrips();
    })
  }

  $scope.removeEvent = function (Event) {
    Remove.removeEvent(Event)
    .then(function () {
      console.log('REMOVE EVENT SUCCESS')
      $scope.getTrips();
    })
  }

  $scope.removeFlight = function (Flight) {
    Remove.removeFlight(Flight)
    .then(function () {
      console.log('REMOVE FLIGHT SUCCESS')
      $scope.getTrips();
    })
  }
  
  $scope.removeTrip = function (trip) {
    Remove.removeTrip(trip)
    .then(function () {
      console.log('REMOVE TRIP SUCCESS')
      $scope.getTrips();
    })
  }
  
  $scope.removeDestination = function (Destination) {
    Remove.removeDestination(Destination)
    .then(function () {
      console.log('REMOVE DEST SUCCESS')
      $scope.getTrips();
    })
  }
  


}])