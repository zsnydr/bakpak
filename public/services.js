angular.module('app-services', ['app-services'])
.factory('Auth', ['$http', '$window', function($http, $window, username, password) {
  let isSignedIn;

  const signin = (username, password) => {
    return $http({
      method: 'POST',
      url: '/signin',
      data: {
        username: username,
        password: password
      }
    }).then((res) => {
      if(res.data === 'matched'){
        isSignedIn = true;
        $window.location = '/#/explore';
        return res.data;
      } else {
        return res.data;
      }
    });
  };

  const signup = (username, password) => {
    return $http({
      method: 'POST',
      url: '/signup',
      data: {
        username: username,
        password: password
      }
    }).then((res) => {
      if(res.data === 'user already exists' || res.data === 'no user'){
        return res.data;
      } else {
        $window.location = '/#/explore';
        isSignedIn = true;
        return res.data;
      }
    })
    .catch((err) => {
      console.error(err)
    });
  };

  const signout = () => {
    return $http({
      method: 'POST',
      url: '/signout',
      data: {}
    }).then((data) => {
      isSignedIn = false;
      $window.location = '/#/signin';
    });
  };

  const signedIn = () => {
    return isSignedIn;
  };

  return {
    signin,
    signup,
    signout,
    isSignedIn
  };
}])

.factory('Trips', ['$http', '$location', '$timeout', function($http, $location, $timeout){
  let tripId;

  const isLoggedIn = () => {
    return $http({
      method: 'GET',
      url: '/validateLogIn'
    })
    .then((data) => {
      if (data.data === 'no user') {
        $location.path('/signin');
      }
      return data;
    });
  };

  const saveTrip = (city, tripTitle) => {
    return $http({
      method: 'POST',
      url: '/newTrip',
      data: {city: city, title: tripTitle}
    })
    .then((tripData) => {
      tripId = tripData.data.trip_id;
      $location.path('/explore');
      return tripData;
    });
  };

  const setTripId = (data) => {
    tripId = data;
  };

  const getTripId = () => {
    return tripId;
  };

  const getTrips = () => {
    return $http({
      method: 'GET',
      url: '/trips'
    })
    .then((trips) => {
      if (trips.data === 'no user') {
        $window.location = '/#/signin';
      }
      return trips;
    });
  };

  return {
    isLoggedIn,
    saveTrip,
    getTripId,
    tripId,
    getTrips,
    setTripId
  };
}])

.factory('CityService', function() {
  let city = '';

  const setCity = (data) => {
    city = data;
  };

  const getCity = () => {
    return city;
  };

  return {
    setCity,
    getCity
  };
})

.factory('Save', ['$http', function($http) {

  const savePlace = (object) => {
    $http({
      method: 'POST',
      url: '/savePlace',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const saveRestaurant = (object) => {
    $http({
      method: 'POST',
      url: '/saveRestaurant',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const saveEvent = (object) => {
    $http({
      method: 'POST',
      url: '/saveEvent',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const saveHotel = (object) => {
    $http({
      method: 'POST',
      url: '/saveHotel',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const saveFlight = (object) => {
    $http({
      method: 'POST',
      url: '/saveFlight',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  return {
    savePlace,
    saveRestaurant,
    saveEvent,
    saveHotel,
    saveFlight
  };
}])

.factory('Remove', ['$http', function($http) {

  const removePlace = (object) => {
    return $http({
      method: 'PUT',
      url: '/removePlace',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const removeRestaurant = (object) => {
    return $http({
      method: 'PUT',
      url: '/removeRestaurant',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const removeEvent = (object) => {
    return $http({
      method: 'PUT',
      url: '/removeEvent',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const removeHotel = (object) => {
    return $http({
      method: 'PUT',
      url: '/removeHotel',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const removeFlight = (object) => {
    return $http({
      method: 'PUT',
      url: '/removeFlight',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const removeTrip = (object) => {
    return $http({
      method: 'PUT',
      url: '/removeTrip',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  const removeDestination = (object) => {
    return $http({
      method: 'PUT',
      url: '/removeDestination',
      data: object
    })
    .then((data) => {
      return data;
    });
  };

  return {
    removePlace,
    removeRestaurant,
    removeEvent,
    removeHotel,
    removeFlight,
    removeTrip,
    removeDestination
  };
}]);
