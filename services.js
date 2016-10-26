angular.module('app-services', [])
.factory('Auth', ['$http', function($http, username, password){

  var signin = function(username, password){
    console.log('correct');
    return $http({
      method: 'POST',
      url: '/signin',
      data: {
        username: username,
        password: password
        }
    })
  }

  var signup = function(username, password){
    return $http({
      method: 'POST',
      url: '/signup',
      data: {
        username: username,
        password: password
        }
    })
  }

return ( {
  signin: signin,
  signup: signup
})

}])
