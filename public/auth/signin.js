angular.module('bakpak.auth', [])
  .controller('AuthController', ['Auth', '$scope', function(Auth, $scope){
    $scope.authUser = function(){
      Auth.signin($scope.username, $scope.password);
    }


    $scope.addUser = function(){
      Auth.signup($scope.username, $scope.password);
    }


  }])
