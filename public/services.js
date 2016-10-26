angular.module('app-services', [])
.factory('Auth', ['$http', '$window', function($http, $window, username, password){

  var signin = function(username, password){
    console.log('correct');
    console.log('user: ', username, 'pass: ', password)
    return $http({
      method: 'POST',
      url: '/signin',
      data: {
        username: username,
        password: password
        }
    }).then(function(res){
      if(res.data === 'matched'){
        $window.location = '/#/explore'
      } else {
        $window.location = '/#/signin'
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
    }).then(function(res){
      console.log('resdata', res.data)
      if(res.data === 'user exists' || res.data === 'no user'){
        $window.location = '/#/signup'
      } else {
          $window.location = '/#/explore'
      }
    })
    .catch(function(err){
      console.error(err)
    })
  }

return {
  signin: signin,
  signup: signup
}

}])

.factory('Trips', ['$http', '$location', function($http, $location){

  var saveDestination = function(city) {
    return $http({
      method: 'POST',
      url: '/destinations',
      data: {city: city}
    })
    .then(function(){
      $location.path('/explore')
    })
  }

  var city;
  var setCity = function(city) {
    city = city;
  }

  var getCity = function() {
    return city;
  }

  return {
    saveDestination: saveDestination,

  }

}])


