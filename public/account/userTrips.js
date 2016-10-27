angular.module('bakpak.trips', [])

.controller('tripsController', ['$scope', 'Trips', 'CityService', 'Auth', 'IdService', function($scope, Trips, CityService, Auth, IdService){

  $scope.city = '';
  $scope.tripTitle = '';

  $scope.saveTrip = function() {
    Trips.saveTrip($scope.city, $scope.tripTitle)
      .then(function(tripData){
        $scope.tripData = tripData;

        IdService.setId(tripData.data.trip_id);
      });
  }

  $scope.setCity = function() {
    CityService.setCity($scope.city, $scope.tripTitle);
    console.log('IN SAVE TRIP', $scope.city)
  }

  $scope.getTrips = function() {
    console.log('triggered')
    Trips.getTrips()
      .then(function(data){
        console.log(data);
      })
  }



}])