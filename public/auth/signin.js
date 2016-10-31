angular.module('bakpak.auth', [])

.controller('AuthController', ['Auth', '$scope', '$window', '$timeout', function(Auth, $scope, $window, $timeout){

  $scope.authUser = function(){
    if (!$scope.username || !$scope.password) {
      $scope.noData = true;
      $timeout(function() {
        $scope.noData = false;
      }, 3000);
    } else {
      Auth.signin($scope.username, $scope.password)
      .then(function(data) {
        if (data === 'wrong password') {
          $scope.wrongPassword = true;
          $scope.password = '';
          $timeout(function() {
            $scope.wrongPassword = false;
          }, 3000);
        } else if (data === 'user does not exist') {
          $scope.userDoesNotExist = true;
          $scope.username = '';
          $scope.password = '';
          $timeout(function() {
            $scope.userDoesNotExist = false;
          }, 3000);
        }
      });
    }
  };

  $scope.addUser = function(){
    if (!$scope.username || !$scope.password) {
      $scope.noData = true;
      $timeout(function() {
        $scope.noData = false;
      }, 3000);
    } else {
      Auth.signup($scope.username, $scope.password)
      .then(function(data) {
        if (data === 'user already exists'){
          $scope.userAlreadyExists = true;
          $scope.username = '';
          $scope.password = '';
          $timeout(function() {
            $scope.userAlreadyExists = false;
          }, 3000);
        }
      });
    }
  };

}]);
