angular.module('bakpak.nav', [])
.controller('navController', ['$scope', 'Auth', function($scope, Auth){
  $scope.$watch(() => {
    return Auth.isSignedIn()
  }, () => {
    $scope.isSignedIn = Auth.isSignedIn();
  });
}]);
