angular.module('bakpak.explore', [])
.controller('exploreController', ['$scope', '$http', 'Trips', 'CityService', '$timeout', 'Auth', 'Save', function($scope, $http, Trips, CityService, $timeout, Auth, Save){
  $scope.results = [];
  $scope.weather;
  $scope.arts;
  $scope.images;
  $scope.promos;
  $scope.flights;
  $scope.selectedCountry;

  $scope.city = CityService.getCity();

  $scope.clearCity = () => {
    CityService.setCity('');
  };

	$scope.hotelsApi = () => {
    if($scope.city !== '') {
  		$http({
  		  method: 'POST',
  		  url: '/hotels',
  		  data: {city: $scope.city}
  		})
  		.then((data) => {
  		  $scope.hotels = data.data.results;
  		})
      .catch((err) => {
        console.log(`Error in hotelsApi in explore Controller: ${err}`);
      });
    }
  };

	$scope.restaurantsApi = () => {
		$http({
		  method: 'POST',
		  url: '/restaurants',
		  data: {city: $scope.city}
		})
		.then((data) => {
		  $scope.results = data.data.results;
		})
    .catch((err) => {
      console.log(`Error in restaurantsApi in explore Controller: ${err}`);
    });
	};

	$scope.weatherApi = () => {
		$http({
		  method: 'POST',
		  url: '/weather',
		  data: {city: $scope.city}
		})
		.then((data) => {
		  $scope.weather = data.data;
		  $scope.weather.main.temp = Math.round($scope.weather.main.temp * (9 / 5) - 459.67) + '˚F';
		})
    .catch((err) => {
      console.log(`Error in weatherApi in explore Controller: ${err}`);
    });
	};

	$scope.artsApi = () => {
		$http({
		  method: 'POST',
		  url: '/arts',
		  data: {city: $scope.city}
		})
		.then((data) => {
		  $scope.arts = data.data.results;
		})
    .catch((err) => {
      console.log(`Error in artsApi in explore Controller: ${err}`);
    });
	};

	$scope.promosApi = () => {
		$http({
		  method: 'POST',
		  url: '/promos',
		  data: {city: $scope.city}
		})
		.then((data) => {
		  $scope.promos = data.data.deals;
		})
    .catch((err) => {
      console.log(`Error in promosApi in explore Controller: ${err}`);
    });
	};

	$scope.eventsApi = () => {
		$http({
		  method: 'POST',
		  url: '/events',
		  data: {city: $scope.city}
		})
		.then((data) => {
		  $scope.events = data.data.search.events[0].event;
		})
    .catch((err) => {
      console.log(`Error in eventsApi in explore Controller: ${err}`);
    });
	};

	$scope.imagesApi = () => {
		$http({
		  method: 'POST',
		  url: '/images',
		  data: {city: $scope.city}
		})
		.then((data) => {
		  $scope.images = data.data.value;
		})
    .catch((err) => {
      console.log(`Error in imagesApi in explore Controller: ${err}`);
    });
	};

	$scope.flightsApi = () => {
		$http({
			method: 'POST',
			url: '/flights',
			data:{origin: $scope.origin, destination: $scope.destination, date: $scope.date}
		})
		.then((data) => {
			$scope.flights = data.data.trips.tripOption;
		})
    .catch((err) => {
      console.log(`Error in flightsApi in explore Controller: ${err}`);
    });
	};

  $scope.signout = () => {
    Auth.signout();
    CityService.setCity('');
  };

  $scope.savePlace = (place) => {
    Save.savePlace({place: place, city: $scope.city, trip_id: $scope.tripId});
  };

  $scope.saveRestaurant = (restaurant) => {
    Save.saveRestaurant({restaurant: restaurant, city: $scope.city, trip_id: $scope.tripId});
  };

  $scope.saveEvent = (event) => {
    Save.saveEvent({event: event, city: $scope.city, trip_id: $scope.tripId});
  };

  $scope.saveHotel = (hotel) => {
    Save.saveHotel({hotel: hotel, city: $scope.city, trip_id: $scope.tripId});
  };

  $scope.saveFlight = (flight) => {
    Save.saveFlight({flight: flight, city: $scope.city, trip_id: $scope.tripId});
  };

  const triggerClick = () => {
    $timeout(() => {
      angular.element(document.querySelector('#explorebtn')).triggerHandler('click');
    });
  };

  //TRIP MODE
  $scope.setCity = () => {
    CityService.setCity($scope.city);
  };

  let newTripTriggered = false;

  $scope.$watch(() => {
     return Trips.getTripId();
  }, () => {
    $scope.tripId = Trips.getTripId();
    if(!newTripTriggered && $scope.tripId !== undefined) {
      $scope.city = CityService.getCity();
      if($scope.city !== '') {
        triggerClick();
      }
      newTripTriggered = true;
    }
  });
}]);
