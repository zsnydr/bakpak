var app = angular.module('bakpak', [
  'ngRoute',
  'bakpak.explore'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/explore', {
      templateUrl: './public/explore.html',
    })
    .when('/reserve', {
      templateUrl: './public/reserve.html',
      controller : 'exploreController'
    })
    .otherwise({
      redirectTo: '/',
    })
})
