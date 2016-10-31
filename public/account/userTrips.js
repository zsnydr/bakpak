angular.module('bakpak.trips', [])

.controller('tripsController', ['$scope', 'Trips', 'CityService', 'Auth', 'Remove', function($scope, Trips, CityService, Auth, Remove){

  $scope.city = '';
  $scope.tripTitle = '';
  $scope.showInfo = false;

  $scope.isLoggedIn = function() {
    Trips.isLoggedIn()
    .then(function() {});
  };

  $scope.saveTrip = function() {
    Trips.saveTrip($scope.city, $scope.tripTitle)
    .then(function(tripData){
      $scope.tripData = tripData;
    });
  };

  $scope.setCity = function() {
    CityService.setCity($scope.city);
  };

  $scope.getTrips = function() {
    Trips.getTrips()
    .then(function(info){
      $scope.trips = info.data;
    });
  };

  $scope.showInfoFunc = function () {
    $scope.showInfo = !$scope.showInfo;
  };

  $scope.setTripId = function (data) {
    Trips.setTripId(data);
  };

  $scope.removeHotel = function (hotel) {
    Remove.removeHotel(hotel)
    .then(function (data) {
      $scope.getTrips();
    });
  }

  $scope.removeRestaurant = function (restaurant) {
    Remove.removeRestaurant(restaurant)
    .then(function (res) {
      $scope.getTrips();
    })
    .catch(function (err) {
      console.log('ERR', err);
    });
  };

  $scope.removePlace = function (Place) {
    Remove.removePlace(Place)
    .then(function () {
      $scope.getTrips();
    });
  };

  $scope.removeEvent = function (Event) {
    Remove.removeEvent(Event)
    .then(function () {
      $scope.getTrips();
    });
  };

  $scope.removeFlight = function (Flight) {
    Remove.removeFlight(Flight)
    .then(function () {
      $scope.getTrips();
    });
  };

  $scope.removeTrip = function (trip) {
    Remove.removeTrip(trip)
    .then(function () {
      $scope.getTrips();
    });
  };

  $scope.removeDestination = function (Destination) {
    Remove.removeDestination({id: Destination})
    .then(function () {
      $scope.getTrips();
    });
  };

$scope.isLoggedIn();

}]);
