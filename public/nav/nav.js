angular.module('bakpak.nav', [])
  .controller('navController', ['$scope', 'Auth', function($scope, Auth){
    $scope.$watch(function(){
      console.log('inwatch')
      return Auth.isSignedIn()
    }, function(){
      console.log('in singed function')
      $scope.isSignedIn = Auth.isSignedIn();
    }
  )}])
