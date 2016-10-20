var app = angular.module('bakpak', [
<<<<<<< HEAD
  'ngRoute',
  'bakpak.explore'])
=======
  'ngRoute'
])
>>>>>>> master

app.config(function ($routeProvider) {
  $routeProvider
    .when('/explore', {
      templateUrl: './public/explore.html',
      controller: 'exploreController'
    })
    .when('/reserve', {
      templateUrl: './public/reserve.html'
    })
    .otherwise({
      redirectTo: '/',
    })
})
