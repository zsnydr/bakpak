angular.module('bakpak.trips', [])

.controller('tripsController', ['$scope', 'Trips', 'CityService', 'Auth', 'IdService', function($scope, Trips, CityService, Auth, IdService){

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
    CityService.setCity($scope.city, $scope.tripTitle);
    console.log('IN SAVE TRIP', $scope.city)
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
  


}])