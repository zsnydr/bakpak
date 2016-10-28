var app = angular.module('bakpak', [
  'ngRoute', 'bakpak.explore', 'app-services', 'bakpak.auth', 'bakpak.trips', 'bakpak.nav'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/explore', {
      templateUrl: './public/explore/explore.html',
      controller: 'exploreController'
    })
    .when('/reserve', {
      templateUrl: './public/explore/reserve.html',
      controller: 'exploreController'
    })
    .when('/trips', {
      templateUrl: './public/account/trips.html',
      controller: 'tripsController'
    })
    .when('/signin', {
      templateUrl:'./public/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: './public/auth/signup.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/explore',
    })
})
