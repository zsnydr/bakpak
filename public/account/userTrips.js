angular.module('bakpak.trips', [])

.controller('tripsController', ['$scope', 'Trips', function($scope, Trips){

  $scope.city = '';

  $scope.saveDestination = function() {
    Trips.saveDestination($scope.city);
  }


}])