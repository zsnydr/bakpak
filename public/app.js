var app = angular.module('bakpak', [
  'ngRoute', 'bakpak.explore', 'app-services', 'bakpak.auth'])

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
    .when('/signin', {
      templateUrl:'./public/auth/signin.html',
      controller: 'signInController'
    })
    .when('/signup', {
      templateUrl: './public/auth/signup.html',
      controller: 'signUpController'
    })
    .otherwise({
      redirectTo: '/',
    })
})
