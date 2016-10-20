angular.module('bakpak.explore', [])

.controller('exploreController', function($scope, $http){
	$scope.city = "";
	$scope.results = [];
	$scope.weather;
	$scope.arts;
	$scope.restaurantsApi = function(){
		$http({
		  method: 'POST',
		  url: '/restaurants',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.results = data.data.results;
		})
	}
	$scope.weatherApi = function(){
		$http({
		  method: 'POST',
		  url: '/weather',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.weather = data.data;
		  $scope.weather.main.temp = Math.round($scope.weather.main.temp * (9 / 5) - 459.67) + '˚F';

		})
	}
	$scope.artsApi = function(){
		$http({
		  method: 'POST',
		  url: '/arts',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.arts = data.data.results;
		  console.log(data)

		})
	}
})

