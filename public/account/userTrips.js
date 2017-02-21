angular.module('bakpak.trips', [])
.controller('tripsController', ['$scope', 'Trips', 'CityService', 'Auth', 'Remove', function($scope, Trips, CityService, Auth, Remove){
  $scope.city = '';
  $scope.tripTitle = '';
  $scope.showInfo = false;

  $scope.isLoggedIn = () => {
    Trips.isLoggedIn()
    .then(() => {})
    .catch((err) => {
      console.log(`Error logging in in trips Contoller: ${err}`);
    });
  };

  $scope.saveTrip = () => {
    Trips.saveTrip($scope.city, $scope.tripTitle)
    .then((tripData) => {
      $scope.tripData = tripData;
    })
    .catch((err) => {
      console.log(`Error saving trip in trips Contoller: ${err}`);
    });
  };

  $scope.setCity = () => {
    CityService.setCity($scope.city);
  };

  $scope.getTrips = () => {
    Trips.getTrips()
    .then((info) => {
      $scope.trips = info.data;
    })
    .catch((err) => {
      console.log(`Error getting trips in trips Contoller: ${err}`);
    });
  };

  $scope.showInfoFunc = () => {
    $scope.showInfo = !$scope.showInfo;
  };

  $scope.setTripId = (data) => {
    Trips.setTripId(data);
  };

  $scope.removeHotel = (hotel) => {
    Remove.removeHotel(hotel)
    .then((data) => {
      $scope.getTrips();
    })
    .catch((err) => {
      console.log(`Error removing hotel in trips Contoller: ${err}`);
    });
  }

  $scope.removeRestaurant = (restaurant) => {
    Remove.removeRestaurant(restaurant)
    .then((res) => {
      $scope.getTrips();
    })
    .catch((err) => {
      console.log(`Error removing restaurant in trips Contoller: ${err}`);
    });
  };

  $scope.removePlace = (Place) => {
    Remove.removePlace(Place)
    .then(() => {
      $scope.getTrips();
    })
    .catch((err) => {
      console.log(`Error removing place in trips Contoller: ${err}`);
    });
  };

  $scope.removeEvent = (Event) => {
    Remove.removeEvent(Event)
    .then(() => {
      $scope.getTrips();
    })
    .catch((err) => {
      console.log(`Error removing event in trips Contoller: ${err}`);
    });
  };

  $scope.removeFlight = (Flight) => {
    Remove.removeFlight(Flight)
    .then(() => {
      $scope.getTrips();
    })
    .catch((err) => {
      console.log(`Error removing flight in trips Contoller: ${err}`);
    });
  };

  $scope.removeTrip = (trip) => {
    Remove.removeTrip(trip)
    .then(() => {
      $scope.getTrips();
    })
    .catch((err) => {
      console.log(`Error removing trip in trips Contoller: ${err}`);
    });
  };

  $scope.removeDestination = (Destination) => {
    Remove.removeDestination({id: Destination})
    .then(() => {
      $scope.getTrips();
    })
    .catch((err) => {
      console.log(`Error removing destination in trips Contoller: ${err}`);
    });
  };

$scope.isLoggedIn();
}]);
