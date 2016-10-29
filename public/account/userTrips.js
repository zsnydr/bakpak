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
    Remove.removeHotel(hotel);
  }

  $scope.removeRestaurant = function (restaurant) {
    Remove.removeRestaurant(restaurant);
  }
  
  $scope.removePlace = function (Place) {
    Remove.removePlace(Place);
  }

  $scope.removeEvent = function (Event) {
    Remove.removeEvent(Event);
  }

  $scope.removeFlight = function (Flight) {
    Remove.removeFlight(Flight);
  }
  


}])