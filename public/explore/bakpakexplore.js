angular.module('bakpak.explore', [])


.controller('exploreController', ['$scope', '$http', 'Trips', 'CityService', '$timeout', 'Auth', 'IdService', 'Save', function($scope, $http, Trips, CityService, $timeout, Auth, IdService, Save){


  $scope.city = CityService.getCity();




	$scope.results = [];
	$scope.weather;
	$scope.arts;
	$scope.images;
	$scope.promos;
	$scope.flights;
	$scope.selectedCountry;

	$scope.hotelsApi = function(){

    if($scope.city !== '') {
  		$http({
  		  method: 'POST',
  		  url: '/hotels',
  		  data: {city: $scope.city}
  		})
  		.then(function(data){
  		  $scope.hotels = data.data.results;
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

		   console.log('here', data.data.results);
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
		})
	}

	$scope.imagesApi = function(){
		$http({
		  method: 'POST',
		  url: '/images',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  console.log('images', data.data.value)
		  $scope.images = data.data.value;
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



    $scope.signout = function () {
      Auth.signout();
      CityService.setCity('');
    }

    $scope.savePlace = function (place) {

      Save.savePlace({place: place, city: $scope.city, trip_id: $scope.tripId})
    }

    $scope.saveRestaurant = function (restaurant) {

      Save.saveRestaurant({restaurant: restaurant, city: $scope.city, trip_id: $scope.tripId})
    }

    $scope.saveEvent = function (event) {

      Save.saveEvent({event: event, city: $scope.city, trip_id: $scope.tripId})
    }
    $scope.saveHotel = function (hotel) {

      Save.saveHotel({hotel: hotel, city: $scope.city, trip_id: $scope.tripId})
    }
    $scope.saveFlight = function (flight) {

      Save.saveFlight({flight: flight, city: $scope.city, trip_id: $scope.tripId})
    }

    var triggerClick = function () {
      $timeout(function () {
        angular.element(document.querySelector('#explorebtn')).triggerHandler('click');
      })
    }



  //TRIP MODE


  $scope.setCity = function() {
    CityService.setCity($scope.city);
  }

  var newTripTriggered = false;

      $scope.$watch(function () {
         return Trips.getTripId();
      }, function () {

        $scope.tripId = Trips.getTripId();

        if(!newTripTriggered && $scope.tripId !== undefined) {
          $scope.city = CityService.getCity();
          if($scope.city !== '') {
            triggerClick();
          }
          newTripTriggered = true;
        }

    });


}])
