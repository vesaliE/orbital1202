// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var fb = null;
var locationRef = null; 
var geoFire = null; 
var locationRef2 = null; 
var bizCanteen= null;
var locationRef3 = null; 
var fassCanteen= null;
var locationRef4 = null 
var flavoursUTown = null; 
var locationRef5 = null,
locationRef6 = null,
locationRef7 = null, 
locationRef8 = null, 
locationRef9 = null
locationRef10 = null, 
locationRef11 = null, 
locationRef12 = null, 
locationRef13 = null, 
locationRef14 = null, 
locationRef15 = null, 
locationRef16 = null, 
locationRef17 = null, 
locationRef18 = null, 
locationRef19 = null, 
locationRef20 = null, 
locationRef21 = null, 
locationRef22 = null, 
locationRef23 = null, 
locationRef24 = null, 
locationRef25 = null, 
locationRef26 = null;
var foeCanteen =null; 


angular.module('app', ['ionic','ionic.service.core', 'ionic.service.push', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'firebase', 'ngCordova'])
.run(function($ionicPlatform, $cordovaGeolocation, geoLocation, $firebase, $state, $cordovaCamera) {
  $ionicPlatform.ready(function() {

    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log(notification, payload);
      },
      "onRegister": function(data) {
        console.log(data.token);
      }
      
    });
    var user = Ionic.User.current();
    var callback = function(pushToken) {
      console.log('Registered token:', pushToken.token);
      user.addPushToken(pushToken);
      user.save(); // you NEED to call a save after you add the token
    }

    push.register(callback);

    push.register(function(token) {
      // Log out your device token (Save this!)
      console.log("Got Token:",token.token);
    });
     navigator.splashscreen.hide(); 
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
    fb = new Firebase("http://orbital--1202.firebaseio.com/"); 
    locationRef = new Firebase("http://orbital--1202.firebaseio.com/location/zUsers"); 
    geoFire = new GeoFire(locationRef);
    locationRef2 = new Firebase("http://orbital--1202.firebaseio.com/location/BIZCanteen"); 
    bizCanteen = new GeoFire(locationRef2);
    locationRef3 = new Firebase("http://orbital--1202.firebaseio.com/location/FASSCanteen"); 
    fassCanteen = new GeoFire(locationRef3);
    locationRef4 = new Firebase("http://orbital--1202.firebaseio.com/location/FlavoursUTown"); 
    flavoursUTown = new GeoFire(locationRef4);
    locationRef5 = new Firebase("http://orbital--1202.firebaseio.com/location/FoeCanteen"); 
    foeCanteen = new GeoFire(locationRef5);
    locationRef6 = new Firebase("http://orbital--1202.firebaseio.com/location/KoufuFoodcourt"); 
    koufu = new GeoFire(locationRef6);
    locationRef7 = new Firebase("http://orbital--1202.firebaseio.com/location/ScienceCanteen"); 
    scienceCanteen = new GeoFire(locationRef7);
    locationRef8 = new Firebase("http://orbital--1202.firebaseio.com/location/FoodJunctionYIH"); 
    foodJunctionYIH= new GeoFire(locationRef8);
    locationRef9 = new Firebase("http://orbital--1202.firebaseio.com/location/AlcoveAsianRestaurantBar"); 
    alcoveAsian = new GeoFire(locationRef9);
    locationRef10 = new Firebase("http://orbital--1202.firebaseio.com/location/ButterMyBun"); 
    butterMyBun= new GeoFire(locationRef10);
    locationRef11 = new Firebase("http://orbital--1202.firebaseio.com/location/HumbleOrigins"); 
    humbleOrigins= new GeoFire(locationRef11);
    locationRef12 = new Firebase("http://orbital--1202.firebaseio.com/location/HwangRestaurant"); 
    hwangKorean = new GeoFire(locationRef12);
    locationRef13 = new Firebase("http://orbital--1202.firebaseio.com/location/TheRoyalsBistroCafé"); 
    royalsBistro = new GeoFire(locationRef13);
    locationRef14 = new Firebase("http://orbital--1202.firebaseio.com/location/PlatypusFoodBar"); 
    platypusFood = new GeoFire(locationRef14);
    locationRef15 = new Firebase("http://orbital--1202.firebaseio.com/location/ReedzCafé"); 
    reedzCafe = new GeoFire(locationRef15);
    locationRef16 = new Firebase("http://orbital--1202.firebaseio.com/location/SaporeItaliano"); 
    sapore = new GeoFire(locationRef16);
    locationRef17 = new Firebase("http://orbital--1202.firebaseio.com/location/Spinelli"); 
    spinelli = new GeoFire(locationRef17);
    locationRef18 = new Firebase("http://orbital--1202.firebaseio.com/location/SpiceTablebyPines"); 
    spiceTable = new GeoFire(locationRef18);
    locationRef19 = new Firebase("http://orbital--1202.firebaseio.com/location/StarbucksMD11"); 
    starbucksMD11= new GeoFire(locationRef19);
    locationRef20 = new Firebase("http://orbital--1202.firebaseio.com/location/StarbucksYIH"); 
    starbucksYIH= new GeoFire(locationRef20);
    locationRef21 = new Firebase("http://orbital--1202.firebaseio.com/location/UniversityClub"); 
    universityClub = new GeoFire(locationRef21); 
    locationRef22 = new Firebase("http://orbital--1202.firebaseio.com/location/WaaCow"); 
    waaCow= new GeoFire(locationRef22);
    locationRef23 = new Firebase("http://orbital--1202.firebaseio.com/location/McDonald"); 
    mcDonald = new GeoFire(locationRef23);
    locationRef24 = new Firebase("http://orbital--1202.firebaseio.com/location/SubwayYIH "); 
    subwayYIH  = new GeoFire(locationRef24);
    locationRef25 = new Firebase("http://orbital--1202.firebaseio.com/location/SubwayUtown "); 
    subwayUtown  = new GeoFire(locationRef25);
    locationRef26 = new Firebase("http://orbital--1202.firebaseio.com/location/StarbucksUtown"); 
    starbucksUtown = new GeoFire(locationRef26);

    var positionOptions = {timeout: 10000, maximumAge:0, enableHighAccuracy: true};
    $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
      geoLocation.setGeolocation(position.coords.latitude , position.coords.longitude); 
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








