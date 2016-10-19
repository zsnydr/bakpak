var app = angular.module('beerme', [
  'beers',
  'ngRoute'
])

app.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/explore', {
      templateUrl: 'public/explore.html',
    })
    .when('/reserve', {
      templateUrl: 'public/reserve.html'
    })
    .otherwise({
      redirectTo: '/',
    })
})
