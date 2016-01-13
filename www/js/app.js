// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angular-skycons'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('weatherCtrl', function($http) {
  var weather = this;

  //This is the basic code to the API url without the .json 
  var apikey = "9bc44996fd23e038";
  var auto = 'autoip.json'
  var url = 'http://api.wunderground.com/api/'+ apikey +'/conditions/geolookup/forecast/q/';

  // This is a get call for the first temperature using the autoip.
  $http.get(url + auto).then(function (res) {
      console.log(res)
      weather.temp = parseInt(res.data.current_observation.temp_f);
  });

  navigator.geolocation.getCurrentPosition(function(geopos) {

    console.log(geopos)
    var lati = geopos.coords.latitude;
    var long = geopos.coords.longitude;
    var apikey = "9bc44996fd23e038";

    nwUrl = url + '/' + lati + ',' + long + '.json'
    $http.get(nwUrl).then(function (res) {
      console.log('secondtimearound',res)
      weather.city = res.data.location.city;
      weather.temp = parseInt(res.data.current_observation.temp_f);
    });

  });

  this.temp = '--';

  weather.search = function () {
    var reqSearch = url + weather.searchQuery + '.json';
    $http.get(reqSearch)
    .then(function (res) { 
      console.log("this is the one", res); 
      weather.city = res.data.location.city;
      weather.temp = parseInt(res.data.current_observation.temp_f);
      return res
    })
    .then(function (resp) {
      console.log(resp);
      var station = resp.data.current_observation;
      console.log(station);
      localStorage.setItem('searchHistory',
        resp.data.current_observation.station_id);
    });
  };
});

