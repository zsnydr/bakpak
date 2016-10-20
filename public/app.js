var app = angular.module('bakpak', [
  'ngRoute',
  'bakpak.explore'])

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
