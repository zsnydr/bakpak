var app = angular.module('bakpak', [
  'ngRoute', 'bakpak.explore', 'app-services', 'bakpak.auth'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/explore', {
      templateUrl: './public/explore.html'
    })
    .when('/reserve', {
      templateUrl: './public/reserve.html'
    })
    .when('/signin', {
      templateUrl:'./public/signin.html',
      controller: 'signInController'
    })
    .when('/signup', {
      templateUrl: './public/signup.html',
      controller: 'signUpController'
    })
    .otherwise({
      redirectTo: '/',
    })
})
