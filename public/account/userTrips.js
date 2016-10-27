angular.module('bakpak.trips', [])

.controller('tripsController', ['$scope', 'Trips', 'CityService', 'Auth', function($scope, Trips, CityService, Auth){

  $scope.city = '';
  $scope.tripTitle = '';

  $scope.saveTrip = function() {
    Trips.saveTrip($scope.city, $scope.tripTitle)
      .then(function(tripData){
        $scope.tripData = tripData;
      });
  }

  $scope.setCity = function() {
    CityService.setCity($scope.city);
    console.log('IN SAVE TRIP', $scope.city)
  }

  $scope.getTrips = function() {
    Trips.getTrips()
      .then(function(data){
        console.log(data);
      })
  }



}])