angular.module('bakpak.explore', [])

.controller('exploreController', function($scope, $http){
	$scope.city = "";
	$scope.results = [];
	$scope.weather;
	$scope.arts;
	$scope.promos;
	$scope.flights;
	$scope.translate;

	$scope.hotelsApi = function(){
		$http({
		  method: 'POST',
		  url: '/hotels',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.hotels = data.data.results;
		  console.log(data.data.results);
		})
	}

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


		})
	}
	$scope.promosApi = function(){
		$http({
		  method: 'POST',
		  url: '/promos',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.promos = data.data.deals;


		})
	}	
	$scope.eventsApi = function(){
		$http({
		  method: 'POST',
		  url: '/events',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.events = data.data.search.events[0].event;
		  console.log(data);
		  console.log('events:', $scope.events)


		})
	}

	$scope.flightsApi = function(){
		$http({
			method: 'POST',
			url: '/flights',
			data:{origin: $scope.origin, destination: $scope.destination, date: $scope.date}
		})
		.then(function(data){
			$scope.flights = data.data.trips.tripOption;
			// console.log("line 79", data.data.trips.tripOption[0].slice[0].segment[0]);
		})
	};	

	$scope.translateApi = function(){
		console.log('client', $scope.translate);
		$http({
		  method: 'POST',
		  url: '/translate',
		  data: {inputText: $scope.translate}
		})
		.then(function(data){
		  $scope.translate = data.data.text[0];
		})


	}
})

