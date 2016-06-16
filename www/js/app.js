// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var fb = null;
var geoFire = null; 
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'firebase', 'ngCordova'])

.run(function($ionicPlatform, $cordovaGeolocation, geoLocation) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    fb = new Firebase("http://orbital1202.firebaseio.com/"); 
    geoFire = new GeoFire(fb);

   var positionOptions = {timeout: 10000, maximumAge:0, enableHighAccuracy: true};
       $cordovaGeolocation
                .getCurrentPosition()
                .then(function (position) {
                    geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude); 
                }, function (err) {
                    //error 
                });

            // begin a watch
            var options = {
                frequency: 1000,
                timeout: 3000,
                enableHighAccuracy: true
            };

            var watch = $cordovaGeolocation.watchPosition(options);
            watch.then(function () { 
                    null,
                function (err) {
                  //error 
                }, 
                function (position) {
                    geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude)
            };
            watch.clearWatch();
         });

        });
})