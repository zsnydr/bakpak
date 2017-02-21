angular.module('bakpak.auth', [])
.controller('AuthController', ['Auth', '$scope', '$window', '$timeout', function(Auth, $scope, $window, $timeout){
  $scope.authUser = () => {
    if (!$scope.username || !$scope.password) {
      $scope.noData = true;
      $timeout(() => {
        $scope.noData = false;
      }, 3000);
    } else {
      Auth.signin($scope.username, $scope.password)
      .then((data) => {
        if (data === 'wrong password') {
          $scope.wrongPassword = true;
          $scope.password = '';
          $timeout(() => {
            $scope.wrongPassword = false;
          }, 3000);
        } else if (data === 'user does not exist') {
          $scope.userDoesNotExist = true;
          $scope.username = '';
          $scope.password = '';
          $timeout(() => {
            $scope.userDoesNotExist = false;
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(`Error signing in in Auth Controller: ${err}`);
      });
    }
  };

  $scope.addUser = () => {
    if (!$scope.username || !$scope.password) {
      $scope.noData = true;
      $timeout(() => {
        $scope.noData = false;
      }, 3000);
    } else {
      Auth.signup($scope.username, $scope.password)
      .then((data) => {
        if (data === 'user already exists'){
          $scope.userAlreadyExists = true;
          $scope.username = '';
          $scope.password = '';
          $timeout(() => {
            $scope.userAlreadyExists = false;
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(`Error signing up in Auth Controller: ${err}`);
      });
    }
  };
}]);
