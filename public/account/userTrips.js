angular.module('bakpak.trips', [])

.controller('tripsController', ['$scope', 'Trips', function($scope, Trips){

  $scope.city = '';
  $scope.tripTitle = '';

  $scope.saveTrip = function() {
    Trips.saveTrip($scope.city, $scope.tripTitle)
      .then(function(tripData){
        $scope.tripData = tripData;
      });
  }

  $scope.setCity = function() {
    Trips.setCity($scope.city);
    console.log('IN SAVE TRIP', $scope.city)
  }

}])