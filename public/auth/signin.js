angular.module('bakpak.auth', [])
  .controller('signInController', ['Auth', '$scope', '$http', function( Auth, $scope, $http){
    $scope.authUser = function(){
      Auth.signin($scope.username, $scope.password);
    }
  }])

  .controller('signUpController', ['Auth', '$scope', '$http', function( Auth, $scope, $http){
    $scope.addUser = function(){
      Auth.signup($scope.username, $scope.password);
    }
  }])
