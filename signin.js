angular.module('bakpak.auth', [])
  .controller('signInController', ['Auth', '$scope', '$http', function( Auth, $scope, $http){
    $scope.authUser = function(username, password){
      Auth.signin(username, password);
    }
  }])

  .controller('signUpController', ['Auth', '$scope', '$http', function( Auth, $scope, $http){
    $scope.addUser = function(username, password){
      Auth.signup(username, password);
    }
  }])
