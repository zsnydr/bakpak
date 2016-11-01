angular.module('bakpak.nav', [])
  .controller('navController', ['$scope', 'Auth', function($scope, Auth){
    $scope.$watch(function(){
      return Auth.isSignedIn()
    }, function(){
      $scope.isSignedIn = Auth.isSignedIn();
    }
  )}])
