angular.module('app.controllers', ['ionic','ionic.service.core', 'ionic.service.push','firebase', 'app.services','greatCircles'])

.controller('yumNUSCtrl', function($scope, $rootScope, foodFactory, geoLocation, GreatCircle, $firebase, $ionicPush) {
  $ionicPush.init({
    "debug": true,
    "onNotification": function(notification) {
      var payload = notification.payload;
      console.log(notification, payload);
    },
    "onRegister": function(data) {
      console.log(data.token);
    }
  });

  $ionicPush.register();

  var color0 = 'balanced'; 
  var color1 = 'orange'; 
  var color2 = 'assertive'; 
  
  "use strict";
      $scope.restaurantList = foodFactory.getRestaurants(); //call to restaurantfactory
      var restaurants = foodFactory.getRestaurants();
      $scope.position = geoLocation.getGeolocation();
      
         //console.log($scope.position.lat); //for checking purposes
        //console.log($scope.position.lng);
        $scope.numLimit = 3;
        for(var i=0; i<restaurants.length; i++){
        //console.log(restaurants[i]["lat"]);
        var distance = GreatCircle.distance(restaurants[i]["lat"],restaurants[i]["long"], $scope.position.lat, $scope.position.lng);
        restaurants[i]["distance"] = distance;
      }

      /*
      $scope.distanceTo = function(restaurant){
        var distance = GreatCircle.distance(restaurant.lat,restaurant.long, $scope.position.lat, $scope.position.lng);
        restaurant.distance = distance;
        distance = distance.toFixed(2);
        //console.log(distance);
        return distance;
      };*/
      
      $scope.colourCode = function(restaurant){
        var fbName = restaurant.fbName; 
        var locationURL = "http://orbital--1202.firebaseio.com/location/" + fbName; 
        //console.log(locationURL);
        var newref = new Firebase(locationURL);
        newref.once("value", function(snapshot) {
          var num = snapshot.numChildren();
          var maxCap = restaurant.capacity;
          var percentage = num / maxCap;
          if (num <= 1) {
                  //color = 'balanced'; 
                  restaurant.color = color0;
                  restaurant.src = "images/10.png";
                  restaurant.level = "EMPTY";
              restaurant.percent = num; //percentage; 
              console.log(restaurant.color); 


            } else if (num <= 2) {
              //color = 'energized'; 
              restaurant.color = color0;
              restaurant.src = "images/20.png";
              restaurant.level = "EMPTY    ";
              restaurant.percent = num; //percentage; 
              console.log(restaurant.color); 
              
            } else if (num <= 3){
              //color = 'assertive'; 
              restaurant.color = color0;                   
              restaurant.src = "images/30.png";
              restaurant.level = "EMPTY";
              restaurant.percent = num; //percentage; 
              console.log(restaurant.color);

            } else if (num <= 4) {
              restaurant.color = color1;
              restaurant.src = "images/40.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 5) {
              restaurant.color = color1;
              restaurant.src = "images/50.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 6) {
              restaurant.color = color1;
              restaurant.src = "images/60.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 7) {
              restaurant.color = color2;
              restaurant.src = "images/70.png";
              restaurant.level = "PACKED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 8) {
              restaurant.color = color2;
              restaurant.src = "images/80.png";
              restaurant.level = "PACKED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 9) {
              restaurant.color = color2;
              restaurant.src = "images/90.png";
              restaurant.level = "PACKED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 10) {
              restaurant.color = color2;
              restaurant.src = "images/100.png";
              restaurant.level = "PACKED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color)
            }
          });
        
        //Variables for current time in milliseconds
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
      }
      $scope.getColor = function(restaurant){
        console.log(restaurant);
        console.log(restaurant.color); 
        return restaurant.color; 
      }
      


    })

.controller('chooseCafeCtrl', function($scope) {
  $scope.colorAlcove = null;
  $scope.colorButter = null;
  $scope.colorHumble = null;
  $scope.colorHwang = null;
  $scope.colorBistro = null;
  $scope.colorPlatypus = null;
  $scope.colorReedz = null;
  $scope.colorSapore = null;
  $scope.colorSpinelli = null;
  $scope.colorSpice = null;
  $scope.colorStarbucksMD11 = null;
  $scope.colorStarbucksYIH = null;
  $scope.colorStarbucksUTown = null;
  $scope.colorUniversity = null;
  $scope.colorWaaCow = null;

  var linkAlcove = new Firebase("https://orbital--1202.firebaseio.com/location/AlcoveAsianRestaurantBar");
  var linkButter = new Firebase("https://orbital--1202.firebaseio.com/location/ButterMyBun");
  var linkHumble = new Firebase("https://orbital--1202.firebaseio.com/location/HumbleOrigins");
  var linkHwang = new Firebase("https://orbital--1202.firebaseio.com/location/HwangRestaurant");
  var linkBistro = new Firebase("https://orbital--1202.firebaseio.com/location/TheRoyalsBistroCafe");
  var linkPlatypus = new Firebase("https://orbital--1202.firebaseio.com/location/PlatypusFoodBar");
  var linkReedz = new Firebase("https://orbital--1202.firebaseio.com/location/ReedzCafé");
  var linkSapore = new Firebase("https://orbital--1202.firebaseio.com/location/SaporeItaliano");
  var linkSpinelli = new Firebase("https://orbital--1202.firebaseio.com/location/Spinelli");
  var linkSpice = new Firebase("https://orbital--1202.firebaseio.com/location/SpiceTablebyPines");
  var linkStarbucksMD11 = new Firebase("https://orbital--1202.firebaseio.com/location/StarbucksMD11");
  var linkStarbucksYIH = new Firebase("https://orbital--1202.firebaseio.com/location/StarbucksYIH");
  var linkUniversity = new Firebase("https://orbital--1202.firebaseio.com/location/UniversityClub");
  var linkWaaCow = new Firebase("https://orbital--1202.firebaseio.com/location/WaaCow");



})

.controller('checkFastfoodsCtrl', function($scope) {
  $scope.colorMac = null;
  $scope.colorSubwayYIH = null;
  $scope.colorSubwayUTown = null;

  var linkMac =  new Firebase("https://orbital--1202.firebaseio.com/location/Macdonalds");
  var linkSubwayYIH =  new Firebase("https://orbital--1202.firebaseio.com/location/SubwayYIH");
  var linkSubwayUTown =  new Firebase("https://orbital--1202.firebaseio.com/location/SubwayUTown");

})


.controller('chooseCanteenCtrl', function($scope, $firebase) {
  var colourBizCanteen = new Firebase("https://orbital--1202.firebaseio.com/location/BIZCanteen");
  var colourFASSCanteen = new Firebase("https://orbital--1202.firebaseio.com/location/FASSCanteen");
  var colourFlavoursCanteen = new Firebase("https://orbital--1202.firebaseio.com/location/FlavoursUTown");
  var colourFOECanteen = new Firebase("https://orbital--1202.firebaseio.com/location/FoeCanteen");
  var colourKoufuFoodcourt = new Firebase("https://orbital--1202.firebaseio.com/location/KoufuFoodcourt");
  var colourScienceCanteen = new Firebase("https://orbital--1202.firebaseio.com/location/ScienceCanteen");
  var colourFoodJunctionYIH = new Firebase("https://orbital--1202.firebaseio.com/location/FoodJunctionYIH");
  $scope.red = 'button button-assertive  button-block';
  $scope.orange = 'button button-energized  button-block';
  $scope.colorBiz = null;
  $scope.colorFass = null;
  $scope.colorFlavours = null;
  $scope.colorFoe = null;
  $scope.colorKoufu = null;
  $scope.colorSci = null;
  $scope.FoodJunction = null;

  $scope.getColorBiz = function() {

    var count = 0;
    colourBizCanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        console.log(timestamp);
        count++;
      })
      if (count <= 5) {
        console.log(count);
        console.log("here at 1!");
        return $scope.colorBiz = "images/greenhumantrans.png"
        
      } else if (count <= 10) {
        console.log("here at else!");
        return $scope.colorBiz = "images/orangehumantrans.png";
        
      } else {
        return $scope.colorBiz = "images/redhumantrans.png";
      }
    })
  }

  $scope.getColorFass = function() {

    var count = 0;
    colourFASSCanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        console.log(timestamp);
        count++;
      })
      if (count <= 5) {
        console.log(count);
        console.log("here at 1!");
        return $scope.colorFass = "images/greenhumantrans.png"
        
      } else if (count <= 10) {
        console.log("here at else!");
        return $scope.colorFass = "images/orangehumantrans.png";
        
      } else {
        return $scope.colorFass = "images/redhumantrans.png";
      }
    })
  }

  $scope.getColorFlavours = function() {

    var count = 0;
    colourFlavoursCanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        console.log(timestamp);
        count++;
      })
      if (count <= 5) {
        console.log(count);
        console.log("here at 1!");
        return $scope.colorFlavours = "images/greenhumantrans.png"
        
      } else if (count <= 10) {
        console.log("here at else!");
        return $scope.colorFlavours = "images/orangehumantrans.png";
        
      } else {
        return $scope.colorFlavours = "images/redhumantrans.png";
      }
    })
  }

  $scope.getColorFoe = function() {

    var count = 0;
    colourFOECanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        console.log(timestamp);
        count++;
      })
      if (count <= 5) {
        console.log(count);
        console.log("FOEhere at 1!");
        return $scope.colorFoe = "images/greenhumantrans.png"
        
      } else if (count <= 10) {
        console.log("FOEhere at else!");
        return $scope.colorFoe = "images/orangehumantrans.png";
        
      } else {
        return $scope.colorFoe = "images/redhumantrans.png";
      }
    })
  }

  $scope.getColorKoufu = function() {

    var count = 0;
    colourKoufuFoodcourt.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        console.log(timestamp);
        count++;
      })
      if (count <= 5) {
        console.log(count);
        console.log("here at 1!");
        return $scope.colorKoufu = "images/greenhumantrans.png"
        
      } else if (count <= 10) {
        console.log("here at else!");
        return $scope.colorKoufu = "images/orangehumantrans.png";
        
      } else {
        return $scope.colorKoufu = "images/redhumantrans.png";
      }
    })
  }

  $scope.getColorSci = function() {

    var count = 0;
    colourScienceCanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        console.log(timestamp);
        count++;
      })
      if (count <= 5) {
        console.log(count);
        console.log("here at 1!");
        return $scope.colorSci = "images/greenhumantrans.png"
        
      } else if (count <= 10) {
        console.log("here at else!");
        return $scope.colorSci = "images/orangehumantrans.png";
        
      } else {
        return $scope.colorSci = "images/redhumantrans.png";
      }
    })
  }

  $scope.getColorFoodJunction = function() {

    var count = 0;
    colourFoodJunctionYIH.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        console.log(timestamp);
        count++;
      })
      if (count <= 5) {
        console.log(count);
        console.log("here at 1!");
        return $scope.FoodJunction = "images/greenhumantrans.png"
        
      } else if (count <= 10) {
        console.log("here at else!");
        return $scope.FoodJunction = "images/orangehumantrans.png";
        
      } else {
        return $scope.FoodJunction = "images/redhumantrans.png";
      }
    })
  }

})

.controller('bizCanteenCtrl', function($scope) {

})

.controller('bizCanteenStallsCtrl', function($scope) {

})


.controller('bizCanteen_contributeCtrl', function($scope, $state, $firebaseAuth, $ionicPopup, $firebaseObject, $firebase, geoLocation) {


  $scope.login = function(username, password){
    var fbAuth = $firebaseAuth(fb);
    return fbAuth.$authWithPassword({
      email: username,
      password: password
    }).then(function(authData) {
      $scope.authData = authData;
      var glocation = geoLocation.getGeolocation();
      var user = authData.uid; 
      var FBtime = Firebase.ServerValue.TIMESTAMP;

            //Adding users into zUsers
            geoFire.set(user, [glocation.lat, glocation.lng]);
            locationRef.child(user).child("time").set({
              time: FBtime
            });
            var currenttime = new Date();
            console.log(currenttime.getTime());
            
            
            locationRef.once("value", function(snapshot) {
              var value = snapshot.child(user).child("time/time").val();
              console.log("time " + value);              
              var test = value - 3600000;
              var date = new Date(value);
              var month = date.getMonth();
              var hour = date.getHours();
              console.log("test " + test);
              console.log("date " + date);
              console.log("month " + month);
              console.log("hour " + hour);            
            })

            
            var geoQueryBizCanteen = geoFire.query({
              center: [1.2956205 , 103.7741585],
              radius: 0.05    
            });
            var location = glocation; 
            var distance = geoQueryBizCanteen.radius(); 

            var onKeyEnteredRegistration1 = geoQueryBizCanteen.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
              bizCanteen.set(user, location);
                     //adding user here 
                   });

            var onKeyExitedRegistration1 = geoQueryBizCanteen.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              bizCanteen.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration1 = geoQueryBizCanteen.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryScienceCanteen = geoFire.query({
              center: [1.2966224, 103.7805718],
              radius: 0.05
            });
            var onKeyEnteredRegistration2 = geoQueryScienceCanteen.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    scienceCanteen.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration2 = geoQueryScienceCanteen.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              scienceCanteen.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration2 = geoQueryScienceCanteen.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFOECanteen = geoFire.query({
              center: [1.2983509 , 103.7711677],
              radius: 0.05
            });
            var onKeyEnteredRegistration3 = geoQueryFOECanteen.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foeCanteen.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration3 = geoQueryFOECanteen.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              foeCanteen.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration3 = geoQueryFOECanteen.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryKoufu= geoFire.query({
             center: [1.3038157, 103.7739868],
             radius: 0.05
           });
            var onKeyEnteredRegistration4 = geoQueryKoufu.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    koufu.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration4 = geoQueryKoufu.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              koufu.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration4 = geoQueryKoufu.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFoodJunction = geoFire.query({
              center: [1.2983767, 103.7745437], 
              radius: 0.05
            });
            
            var onKeyEnteredRegistration5 = geoQueryFoodJunction.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foodJunctionYIH.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration5 = geoQueryFoodJunction.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              foodJunctionYIH.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration5 = geoQueryFoodJunction.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryAlcoveAsian = geoFire.query({
              center: [1.3020569, 103.7724088], 
              radius: 0.05
            });
            var onKeyEnteredRegistration6 = geoQueryAlcoveAsian.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    alcoveAsian.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration6 = geoQueryAlcoveAsian.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              alcoveAsian.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration6 = geoQueryAlcoveAsian.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryButterMyBun = geoFire.query({
              center: [1.3047341, 103.7725725], 
              radius: 0.05
            });

            var onKeyEnteredRegistration7 = geoQueryButterMyBun.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    butterMyBun.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration7 = geoQueryButterMyBun.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              butterMyBun.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration7 = geoQueryButterMyBun.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryHumbleOrigins = geoFire.query({
              center: [1.2950642, 103.7689681], 
              radius: 0.05
            });
            var onKeyEnteredRegistration8 = geoQueryHumbleOrigins.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    humbleOrigins.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration8 = geoQueryHumbleOrigins.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              humbleOrigins.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration8 = geoQueryHumbleOrigins.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryTheRoyalsBistroCafe  = geoFire.query({
              center: [ 1.3039084, 103.7741073], 
              radius: 0.05
            });
            var onKeyEnteredRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    royalsBistro.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              royalsBistro.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryHwangKorean = geoFire.query({
              center: [1.3038157, 103.7739868], 
              radius: 0.05
            });   
            var onKeyEnteredRegistration10 = geoQueryHwangKorean.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    hwangKorean.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration10 = geoQueryHwangKorean.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              hwangKorean.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration10 = geoQueryHwangKorean.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryPlatypus = geoFire.query({
              center: [1.2967775, 103.7809592], 
              radius: 0.05
            });  
            var onKeyEnteredRegistration11 = geoQueryPlatypus.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    platypusFood.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration11 = geoQueryPlatypus.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              platypusFood.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration11 = geoQueryPlatypus.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryReedz = geoFire.query({
              center: [1.2925654, 103.7719733], 
              radius: 0.05
            });    
            var onKeyEnteredRegistration12 = geoQueryReedz.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    reedzCafe.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration12 = geoQueryReedz.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              reedzCafe.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration12 = geoQueryReedz.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            
            var geoQuerySaporeItaliano = geoFire.query({
              center: [1.3041097, 103.7740535], 
              radius: 0.05
            });
            var onKeyEnteredRegistration13 = geoQuerySaporeItaliano.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    sapore.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration13 = geoQuerySaporeItaliano.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              sapore.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration13 = geoQuerySaporeItaliano.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryFassCanteen = geoFire.query({
              center: [1.2949143, 103.7717837],
              radius: 0.05
            });
            var onKeyEnteredRegistration14 = geoQueryFassCanteen.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        fassCanteen.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration14 = geoQueryFassCanteen.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              fassCanteen.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration14 = geoQueryFassCanteen.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFlavoursUtown = geoFire.query({
              center: [1.305908,103.774672],
              radius: 0.05
            });

            
            var onKeyEnteredRegistration15 = geoQueryFlavoursUtown.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        flavoursUTown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration15 = geoQueryFlavoursUtown.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              flavoursUTown.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration15 = geoQueryFlavoursUtown.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            
            var geoQuerySpinelli  = geoFire.query({
              center: [1.2964077,  103.7805198],
              radius: 0.05
            });

            var onKeyEnteredRegistration16 = geoQuerySpinelli.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spinelli.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration16 = geoQuerySpinelli.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              spinelli.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration16 = geoQuerySpinelli.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            var geoQuerySpiceTable = geoFire.query({
              center: [1.3038699, 103.7741271],
              radius: 0.05
            });

            var onKeyEnteredRegistration17 = geoQuerySpiceTable.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spiceTable.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration17 = geoQuerySpiceTable.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              spiceTable.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration17 = geoQuerySpiceTable.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryStarbucksMD11 = geoFire.query({
              center: [1.2941412, 103.781285],
              radius: 0.05
            });
            var onKeyEnteredRegistration18 = geoQueryStarbucksMD11.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksMD11.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration18 = geoQueryStarbucksMD11.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksMD11.remove("user").then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration18 = geoQueryStarbucksMD11.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            var geoQueryStarbucksYIH = geoFire.query({
              center: [1.2972787,  103.7724656],
              radius: 0.05 
            });
            var onKeyEnteredRegistration19 = geoQueryStarbucksYIH.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksYIH.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration19 = geoQueryStarbucksYIH.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksYIH.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration19 = geoQueryStarbucksYIH.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryUniversityClub = geoFire.query({
              center: [1.3056346, 103.772908],
              radius: 0.05 
            });
            var onKeyEnteredRegistration20 = geoQueryUniversityClub.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        universityClub.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration20 = geoQueryUniversityClub.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              universityClub.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration20 = geoQueryUniversityClub.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryWaaCow = geoFire.query({
              center: [1.2937922, 103.7729176],
              radius: 0.05 
            });
            var onKeyEnteredRegistration21 = geoQueryWaaCow.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        waaCow.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration21 = geoQueryWaaCow.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              waaCow.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration21 = geoQueryWaaCow.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });



            var geoQueryMcDonald = geoFire.query({
              center: [1.2984307, 103.7712874],
              radius: 0.05
            });
            var onKeyEnteredRegistration22 = geoQueryMcDonald.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                       mcDonald .set(user, location); //adding user here 

                     });

            var onKeyExitedRegistration22 = geoQueryMcDonald.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              mcDonald.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration22 = geoQueryMcDonald.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });



            var geoQuerySubWayYIH = geoFire.query({
              center: [1.2980747, 103.7742972],
              radius: 0.05 
            });
            var onKeyEnteredRegistration23 = geoQuerySubWayYIH.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayYIH.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration23 = geoQuerySubWayYIH.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              subwayYIH.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration23 = geoQuerySubWayYIH.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryStarbucksUtown = geoFire.query({
              center: [ 1.3056609,103.7727733],
              radius: 0.05
            });
            var onKeyEnteredRegistration50 = geoQueryStarbucksUtown.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksUtown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration50 = geoQueryStarbucksUtown.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksUtown.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration50 = geoQueryStarbucksUtown.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQuerySubWayUTown = geoFire.query({
              center: [1.303689, 103.773356],
              radius: 0.05
            });
            var onKeyEnteredRegistration24 = geoQuerySubWayUTown.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayUtown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration24 = geoQuerySubWayUTown.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              subwayUtown.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration24 = geoQuerySubWayUTown.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            //$state.go("temp");
            $state.go("yumNUS");

          }).catch(function(error) {
            console.error("ERROR: " + error);
            $ionicPopup.alert({
              title: 'Wrong password!',
              template: 'PLease create an account if you do not have one!'
            });
          });
          //var location = $firebaseObject(locationRef.child("Location"));
        //location.$bindTo($scope, "data");
        
        
      }

      $scope.register = function(username, password) {                
        var UserFb = $firebaseObject(fb.child("Users"));
        UserFb.$bindTo($scope, "data");
        var fbAuth = $firebaseAuth(fb);
        //Prompts for a username
        $ionicPopup.prompt({
          title: 'Please choose a Forum Username',
          inputType: 'text'
        })
        .then(function(result) {
            //if (results !== "") {
                //if (true) {
                    //Creates database of user in firebase
                    fbAuth.$createUser({email: username, password: password}).then(function(userData) {
                      return fbAuth.$authWithPassword({
                        email: username,
                        password: password
                      })

                    }).then(function(authData) {
                      var glocation = geoLocation.getGeolocation();
                      var user = authData.uid; 
                      geoFire.set(user, [glocation.lat , glocation.lng]); 
                      var geoQueryBizCanteen = geoFire.query({
                        center: [1.2956205, 103.7741585],
                        radius: 0.05
                      });
                      var location = glocation; 
                      var distance = geoQueryBizCanteen.radius(); 
                      var onKeyEnteredRegistration25 = geoQueryBizCanteen.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                            bizCanteen.set(user, location); //adding user here 

                          });

                      var onKeyExitedRegistration25 = geoQueryBizCanteen.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        bizCanteen.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration25 = geoQueryBizCanteen.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                      var geoQueryScienceCanteen = geoFire.query({
                        center: [1.2966224, 103.7805718],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration26 = geoQueryScienceCanteen.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    scienceCanteen.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration26 = geoQueryScienceCanteen.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        scienceCanteen.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration26 = geoQueryScienceCanteen.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryFOECanteen = geoFire.query({
                        center: [1.2983509 , 103.7711677],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration27 = geoQueryFOECanteen.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foeCanteen.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration27 = geoQueryFOECanteen.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        foeCanteen.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration27 = geoQueryFOECanteen.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryKoufu= geoFire.query({
                       center: [1.3038157, 103.7739868],
                       radius: 0.05
                     });
                      var onKeyEnteredRegistration28 = geoQueryKoufu.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    koufu.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration28 = geoQueryKoufu.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        koufu.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration28 = geoQueryKoufu.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryFoodJunction = geoFire.query({
                        center: [1.2983767, 103.7745437], 
                        radius: 0.05     
                      });

                      var onKeyEnteredRegistration29 = geoQueryFoodJunction.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foodJunctionYIH.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration29 = geoQueryFoodJunction.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        foodJunctionYIH.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration29 = geoQueryFoodJunction.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryAlcoveAsian = geoFire.query({
                        center: [1.3020569, 103.7724088], 
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration30 = geoQueryAlcoveAsian.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    alcoveAsian.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration30 = geoQueryAlcoveAsian.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        alcoveAsian.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration30  = geoQueryAlcoveAsian.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryButterMyBun = geoFire.query({
                        center: [1.3047341, 103.7725725], 
                        radius: 0.05
                      });

                      var onKeyEnteredRegistration31 = geoQueryButterMyBun.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    butterMyBun.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration31 = geoQueryButterMyBun.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        butterMyBun.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration31 = geoQueryButterMyBun.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryHumbleOrigins = geoFire.query({
                        center: [1.2950642, 103.7689681], 
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration32 = geoQueryHumbleOrigins.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    humbleOrigins.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration32 = geoQueryHumbleOrigins.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        humbleOrigins.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration32 = geoQueryHumbleOrigins.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                      var geoQueryTheRoyalsBistroCafe  = geoFire.query({
                        center: [ 1.3039084, 103.7741073], 
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration33 = geoQueryTheRoyalsBistroCafe.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    royalsBistro.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration33 = geoQueryTheRoyalsBistroCafe.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        royalsBistro.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration33 = geoQueryTheRoyalsBistroCafe.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                      var geoQueryHwangKorean = geoFire.query({
                        center: [1.3038157, 103.7739868], 
                        radius: 0.05
                      });   
                      var onKeyEnteredRegistration34 = geoQueryHwangKorean.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    hwangKorean.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration34 = geoQueryHwangKorean.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        hwangKorean.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration34 = geoQueryHwangKorean.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryPlatypus = geoFire.query({
                        center: [1.2967775, 103.7809592], 
                        radius: 0.05
                      });  
                      var onKeyEnteredRegistration35 = geoQueryPlatypus.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    platypusFood.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration35 = geoQueryPlatypus.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        platypusFood.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration35 = geoQueryPlatypus.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                      var geoQueryReedz = geoFire.query({
                        center: [1.2925654, 103.7719733], 
                        radius: 0.05
                      });    
                      var onKeyEnteredRegistration36 = geoQueryReedz.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    reedzCafe.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration36 = geoQueryReedz.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        reedzCafe.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration36 = geoQueryReedz.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });
                      
                      var geoQuerySaporeItaliano = geoFire.query({
                        center: [1.3041097, 103.7740535], 
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration37 = geoQuerySaporeItaliano.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    sapore.set(user, location); //adding user here 
                  });

                      var onKeyExitedRegistration37 = geoQuerySaporeItaliano.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        sapore.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });
                      });

                      var onKeyMovedRegistration37 = geoQuerySaporeItaliano.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                      var geoQueryFassCanteen = geoFire.query({
                        center: [1.2949143, 103.7717837],
                        radius: 0.05
                      });

                      var onKeyEnteredRegistration38 = geoQueryFassCanteen.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        fassCanteen.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration38 = geoQueryFassCanteen.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        fassCanteen.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration38 = geoQueryFassCanteen.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryFlavoursUtown = geoFire.query({
                        center: [1.305908,103.774672],
                        radius: 0.05
                      });

                      var onKeyEnteredRegistration39 = geoQueryFlavoursUtown.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        flavoursUTown.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration39 = geoQueryFlavoursUtown.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        flavoursUTown.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration39 = geoQueryFlavoursUtown.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });
                      
                      var geoQuerySpinelli  = geoFire.query({
                        center: [1.2964077,  103.7805198],
                        radius: 0.05
                      });

                      var onKeyEnteredRegistration40 = geoQuerySpinelli.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spinelli.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration40 = geoQuerySpinelli.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        spinelli.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration40 = geoQuerySpinelli.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });
                      var geoQuerySpiceTable = geoFire.query({
                        center: [1.3038699, 103.7741271],
                        radius: 0.05
                      });

                      var onKeyEnteredRegistration41 = geoQuerySpiceTable.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spiceTable.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration41 = geoQuerySpiceTable.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        spiceTable.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration41 = geoQuerySpiceTable.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryStarbucksMD11 = geoFire.query({
                        center: [1.2941412, 103.781285],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration42 = geoQueryStarbucksMD11.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksMD11.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration42 = geoQueryStarbucksMD11.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        starbucksMD11.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration42 = geoQueryStarbucksMD11.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });
                      var geoQueryStarbucksYIH = geoFire.query({
                        center: [1.2972787,  103.7724656],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration43 = geoQueryStarbucksYIH.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksYIH.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration43 = geoQueryStarbucksYIH.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        starbucksYIH.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration43 = geoQueryStarbucksYIH.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                      var geoQueryUniversityClub = geoFire.query({
                        center: [1.3056346, 103.772908],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration44 = geoQueryUniversityClub.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        universityClub.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration44 = geoQueryUniversityClub.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        universityClub.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration44 = geoQueryUniversityClub.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                      var geoQueryWaaCow = geoFire.query({
                        center: [1.2937922, 103.7729176],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration45 = geoQueryWaaCow.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        waaCow.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration45 = geoQueryWaaCow.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        waaCow.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration = geoQueryWaaCow.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });



                      var geoQueryMcDonald = geoFire.query({
                        center: [1.2984307, 103.7712874],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration46 = geoQueryMcDonald.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                       mcDonald .set(user, location); //adding user here 

                     });

                      var onKeyExitedRegistration46 = geoQueryMcDonald.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        mcDonald.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration46 = geoQueryMcDonald.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });



                      var geoQuerySubWayYIH = geoFire.query({
                        center: [1.2980747, 103.7742972],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration47 = geoQuerySubWayYIH.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayYIH.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration47 = geoQuerySubWayYIH.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        subwayYIH.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration47 = geoQuerySubWayYIH.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });
                      var geoQueryStarbucksUtown = geoFire.query({
                        center: [1.3056609, 103.7727733],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration49 = geoQueryStarbucksUtown.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksUtown.set(user, location); //adding user here 
                      });

                      var onKeyExitedRegistration49 = geoQueryStarbucksUtown.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        starbucksUtown.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration49 = geoQueryStarbucksUtown.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                      var geoQuerySubWayUTown = geoFire.query({
                        center: [1.303689, 103.773356],
                        radius: 0.05
                      });
                      var onKeyEnteredRegistration48 = geoQuerySubWayUTown.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayUtown.set(user, location); //adding user here 

                      });

                      var onKeyExitedRegistration48 = geoQuerySubWayUTown.on("key_exited", function(user, location, distance) {
                        console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        subwayUtown.remove(user).then(function() {
                          console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         console.log("Error: " + error);
                       });       
                      });
                      var onKeyMovedRegistration48 = geoQuerySubWayUTown.on("key_moved", function(user, location, distance) {
                        console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });
                      var firebaseUsers = new Firebase("http://orbital--1202.firebaseio.com/Users");
                      firebaseUsers.child(authData.uid).set ({
                        forumName : result
                      }); 
                    }),

$state.go("yumNUS");
}).catch(function(error) {
  console.error("ERROR: " + error);
});
}
})

.controller('tempCtrl', function($scope, $firebaseObject, $state, $cordovaCamera, $firebaseArray) {   

  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }

  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("bizCanteen") !== true) {
        $scope.data.bizCanteen = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
               /* $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                */
                if ($scope.choice === 4) {
                  fb.child("closed").child("bizCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("bizCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("bizCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah");
                } else {
                  fb.child("food").child("bizCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("bizCanteen"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteenContribute");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("bizCanteen").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                //console.log("done!");
                $state.go("bizCanteen");
              })
  }, function(error){

  })

  }

}) 
//bizcanteen forum controller 
.controller('seeLahCtrl', function($scope, $firebaseObject, $firebase) {

    //Filters list for normal comments
    $scope.filter = function() {
      var bizRef = fb.child("food").child("bizCanteen");
      var bizPicRef = fb.child("picture").child("bizCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var fifteen = 20;
      var time = 120; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > time) {
            childSnapshot.ref().remove();
          }
        })
      })
      bizPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > time) {
            childSnapshot.ref().remove();
          }
        })

      })
    }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("bizCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");
      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }

    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }
  })

.controller('suggestionsCtrl', function($scope) {

})

.controller('fassCanteenCtrl', function($scope) {

})

.controller('fassCanteenStallsCtrl', function($scope){

})

.controller('seeLah2Ctrl', function($scope, $firebaseObject, $firebase) {

    //Filters list for normal comments
    $scope.filter = function() {
      var bizRef = fb.child("food").child("fassCanteen");
      var fassPicRef = fb.child("picture").child("fassCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var fifteen = 20;
      var time = 120; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      fassPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > time) {
            childSnapshot.ref().remove();
          }
        })

      })
    }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("fassCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");
      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }

    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }
  })

.controller('flavoursUTownCtrl', function($scope) {

})

.controller('flavoursUTownStallsCtrl', function($scope) {

})

.controller('seeLah3Ctrl', function($scope, $firebaseObject, $firebase) {

    //Filters list for normal comments
    $scope.filter = function() {
      var bizRef = fb.child("food").child("flavoursCanteen");
      var flavoursPicRef = fb.child("picture").child("flavoursCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var fifteen = 20;
      var time = 120; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      flavoursPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > time) {
            childSnapshot.ref().remove();
          }
        })

      })
    }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("flavoursCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");
      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }

    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }
  })

.controller('fOECanteenCtrl', function($scope) {

})

.controller('fOECanteenStallsCtrl', function($scope){

})

.controller('seeLah4Ctrl', function($scope, $firebaseObject, $firebase) {

    //Filters list for normal comments
    $scope.filter = function() {
      var bizRef = fb.child("food").child("foeCanteen");
      var flavoursPicRef = fb.child("picture").child("foeCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var fifteen = 20;
      var time = 120; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      flavoursPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > time) {
            childSnapshot.ref().remove();
          }
        })

      })
    }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("foeCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");
      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }

    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }
  })

.controller('koufuFoodcourtCtrl', function($scope) {

})
.controller('koufuStallCtrl', function($scope) {

})

.controller('seeLah5Ctrl', function($scope, $firebaseObject, $firebase) {

    //Filters list for normal comments
    $scope.filter = function() {
      var bizRef = fb.child("food").child("koufuFC");
      var flavoursPicRef = fb.child("picture").child("koufuFC");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var fifteen = 20;
      var time = 120; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      flavoursPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > time) {
            childSnapshot.ref().remove();
          }
        })

      })
    }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("koufuFC");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");
      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 

    }
    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }

  })
.controller('macdonaldsFOEContributeCtrl', function($scope, $firebaseObject, $state,$firebaseArray, $cordovaCamera) {   

  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");

    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }

  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("macdonaldsFOE") !== true) {
        $scope.data.macdonaldsFOE = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
               /* $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                */
                if ($scope.choice === 4) {
                  fb.child("closed").child("macdonaldsFOE").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah8");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("macdonaldsFOE").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah8");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("macdonaldsFOE").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah8");
                } else {
                  fb.child("food").child("macdonaldsFOE").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah8");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("macdonaldsFOE"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteenContribute");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("macdonaldsFOE").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                $state.go("seeLah8");
              })
  }, function(error){

  })

  }

}) 
.controller('macdonaldsFOECtrl', function($scope){

})
.controller('seeLah8Ctrl', function($scope, $firebase, $firebaseObject) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("macdonaldsFOE");
    var butterPicRef = fb.child("picture").child("macdonaldsFOE");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 120; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("macdonaldsFOE");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");

      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");

      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }
    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }

  })

.controller('subwayYIHCtrl', function($scope) {

})
.controller('subwayYIHContributeCtrl', function($scope, $firebaseObject, $state,$firebaseArray, $cordovaCamera) {   

  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");

    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }

  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("subwayYIH") !== true) {
        $scope.data.subwayYIH = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
               /* $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                */
                if ($scope.choice === 4) {
                  fb.child("closed").child("subwayYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah9");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("subwayYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah9");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("subwayYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah9");
                } else {
                  fb.child("food").child("subwayYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah9");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("subwayYIH"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteenContribute");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("subwayYIH").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                $state.go("seeLah9");
              })
  }, function(error){

  })

  }

}) 

.controller('seeLah9Ctrl', function($scope, $firebase, $firebaseObject) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("subwayYIH");
    var butterPicRef = fb.child("picture").child("subwayYIH");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 120; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("subwayYIH");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");

      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");

      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }

    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }


    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }
  })



.controller('subwayUTownCtrl', function($scope) {
})


.controller('subwayUTownContributeCtrl', function($scope, $firebaseObject, $state,$firebaseArray, $cordovaCamera) {   
  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");

    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }



  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("subwayUTown") !== true) {
        $scope.data.subwayUTown= [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
               /* $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                */
                if ($scope.choice === 4) {
                  fb.child("closed").child("subwayUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah12");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("subwayUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah12");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("subwayUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah12");
                } else {
                  fb.child("food").child("subwayUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah12");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("subwayUTown"));
    $scope.images = syncArray;
  } else {
    $state.go("seeLah12");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("subwayUTown").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                $state.go("seeLah12");
              })
  }, function(error){

  })

  }

}) 

.controller('seeLah12Ctrl', function($scope, $firebase, $firebaseObject) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("subwayUTown");
    var butterPicRef = fb.child("picture").child("subwayUTown");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 120; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("subwayUTown");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");

      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");

      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }

    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }
  })
.controller('scienceCanteenCtrl', function($scope) {

})
.controller('scienceCanteenStallsCtrl', function($scope) {

})
.controller('seeLah6Ctrl', function($scope, $firebaseObject, $firebase) {
    //Filters list for normal comments
    $scope.filter = function() {
      var bizRef = fb.child("food").child("sciCanteen");
      var flavoursPicRef = fb.child("picture").child("sciCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var fifteen = 20;
      var time = 120; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      flavoursPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > time) {
            childSnapshot.ref().remove();
          }
        })

      })
    }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("sciCanteen");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");
      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }

    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }
  })
.controller('yIHFoodJunctionCtrl', function($scope) {

})

.controller('yIHFoodJunctionStallsCtrl', function($scope) {

})

.controller('seeLah7Ctrl', function($scope) {

})

.controller('alcoveContributeCtrl', function($scope, $firebaseArray, $firebaseObject, $state, $cordovaCamera) {
 $scope.list = function() {
  fbAuth = fb.getAuth();
  if (fbAuth) {
    var syncObject = $firebaseObject(fb.child("food"));
    syncObject.$bindTo($scope, "data");
  }
  $scope.imageUrl1 = "images/greenhuman.png";
  $scope.imageUrl2 = "images/orangehuman.png";
  $scope.imageUrl3 = "images/redhuman.png";
  $scope.imageUrl4 = "images/closesign.png";
}

$scope.choice = null;

$scope.iconChange = function(clickChoice) {
  if (clickChoice === $scope.choice) {
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
    $scope.choice = null;
  } else if (clickChoice === 1) {
    $scope.imageUrl1 = "images/greenhumanclicked.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
    $scope.choice = 1;
  } else if (clickChoice === 2) {
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehumanclicked.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
    $scope.choice = 2;
  } else if (clickChoice === 3) {
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhumanclicked.png";
    $scope.imageUrl4 = "images/closesign.png";
    $scope.choice = 3;
  } else if (clickChoice === 4) {
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesignclicked.png";
    $scope.choice = 4;
  }
}

$scope.create = function(input) {
  if (input !== "") {
    var userName = null;

    if ($scope.data.hasOwnProperty("alcove") !== true) {
      $scope.data.alcove = [];
    }

    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      fbAuth = fb.getAuth();
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value1");
      userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("alcove").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah13");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("alcove").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah13");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("alcove").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah13");
                } else {
                  fb.child("food").child("alcove").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah13");
                }
              })


  } else {
    console.log("No comments in the box detected");
  }
}
$scope.pictureURL = "http://placehold.it/50x50"; 
$scope.images = [];
var fbAuth = fb.getAuth();
if(fbAuth) {
  var userReference = fb.child("picture/");
  var syncArray = $firebaseArray(userReference.child("alcove"));
  $scope.images = syncArray;
} else {
  $state.go("bizCanteenContribute");
}

$scope.takePic = function(){
  $cordovaCamera.getPicture({
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,  
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: false
  })
  .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("alcove").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                //console.log("done!");
                $state.go("seeLah13");
              })
  }, function(error){

  })
  
} 

})
.controller('alcoveAsianRestaurantBarCtrl', function($scope) {

})
.controller('seeLah13Ctrl', function($scope, $firebase,$firebaseObject) {
   //Filters list for normal comments
   $scope.filter = function() {
    var bizRef = fb.child("food").child("alcove");
    var flavoursPicRef = fb.child("picture").child("alcove");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 120; 
    bizRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    flavoursPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }
    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("alcove");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");
      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }

    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }

  })

.controller('butterMyBunMenuCtrl', function($scope) {

})

.controller('CameraCtrl', function($scope, $cordovaCamera, $state, $firebaseArray){
 $scope.pictureURL = "http://placehold.it/50x50"; 
 $scope.images = [];
 var fbAuth = fb.getAuth();
 if(fbAuth) {
  var userReference = fb.child("picture/");
  var syncArray = $firebaseArray(userReference.child("butterMyBun"));
  $scope.images = syncArray;
} else {
  $state.go("bizCanteenContribute");
}

$scope.takePic = function(){
  $cordovaCamera.getPicture({
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,  
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: false
  })
  .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("butterMyBun").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                //console.log("done!");
                $state.go("seeLah14");
              })
  }, function(error){

  })

}


})

.controller('butterMyBunCtrl', function($scope) {

})
//butter my bun contribute page, with storage function
.controller('butterMyBunContributeCtrl', function($scope, $firebaseObject, $state, $cordovaCamera, $firebaseArray){
  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }

  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("butterMyBun") !== true) {
        $scope.data.butterMyBun = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("butterMyBun").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah14");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("butterMyBun").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah14");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("butterMyBun").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah14");
                } else {
                  fb.child("food").child("butterMyBun").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah14");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("butterMyBun"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteenContribute");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("butterMyBun").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                //console.log("done!");
                $state.go("seeLah14");
              })
  }, function(error){

  })

  }

})
//butter my buns see lah page
.controller('seeLah14Ctrl', function($scope, $firebaseObject, $firebase) {
    //Filters list for normal comments
    $scope.filter = function() {
      var butterRef = fb.child("food").child("butterMyBun");
      var butterPicRef = fb.child("picture").child("butterMyBun");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var fifteen = 20;
      var time = 120; 
      butterRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      butterPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          console.log(difference);
          if (difference > time) {
            childSnapshot.ref().remove();
          }
        })

      })
    }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("butterMyBun");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          console.log("closeddiff" + difference);
          if (difference > 7) {
            childSnapshot.ref().remove();
          }
        })
      })
    }

    $scope.list = function() {

      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");

      var closedObject = $firebaseObject(fb.child("closed"));
      closedObject.$bindTo($scope, "closed");

      var imageObject = $firebaseObject(fb.child("picture"));
      imageObject.$bindTo($scope, "image"); 
    }

    $scope.getTimeDay = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60 * 60 * 24);
      return Math.round(day);
    }

    $scope.getTimeMin = function(time) {
      var dateObj = new Date(time);
      var current = new Date();
      var commentTime = dateObj.getTime();
      var currentTime = current.getTime();
      var day = (currentTime - commentTime)/(1000 * 60);
      return Math.round(day);
    }

    $scope.crowdIcon = null;

    $scope.getImage = function(number) {
      if (number === 1) {
        return $scope.crowdIcon = "images/greenhuman.png";
      } else if (number === 2) {
        return $scope.crowdIcon = "images/orangehuman.png";
      } else {
        return $scope.crowdIcon = "images/redhuman.png";
      }
    }


  })

.controller('theRoyalsBistroCafeCtrl', function($scope) {

})

.controller('seeLah15Ctrl', function($scope) {

})

.controller('humbleOriginsCtrl', function($scope) {

})

.controller('seeLah17Ctrl', function($scope) {

})

.controller('hwangSKoreanRestaurantCtrl', function($scope) {

})

.controller('seeLah18Ctrl', function($scope) {

})

.controller('playtpusFoodbarCtrl', function($scope) {

})


.controller('seeLah19Ctrl', function($scope) {

})

.controller('reedzCafeCtrl', function($scope) {

})

.controller('seeLah20Ctrl', function($scope) {

})

.controller('saporeItalianoCtrl', function($scope) {

})

.controller('seeLah21Ctrl', function($scope) {

})

.controller('spinelliCtrl', function($scope) {

})

.controller('spinelliMenuCtrl', function($scope) {

})

.controller('seeLah22Ctrl', function($scope) {

})

.controller('spiceTableByPinesCtrl', function($scope) {

})

.controller('seeLah23Ctrl', function($scope) {

})

.controller('starbucksMD11Ctrl', function($scope) {

})

.controller('seeLah24Ctrl', function($scope) {

})

.controller('starbucksYIHCtrl', function($scope) {

})

.controller('seeLah25Ctrl', function($scope) {

})

.controller('starbucksUTownCtrl', function($scope) {

})

.controller('seeLah26Ctrl', function($scope) {

})

.controller('universityClubCtrl', function($scope) {

})

.controller('seeLah27Ctrl', function($scope) {

})

.controller('waaCowCtrl', function($scope) {

})

.controller('seeLah28Ctrl', function($scope) {

})

.controller('pageCtrl', function($scope) {

})
/*.controller('GeoCtrl', function($scope, geoLocation) {
    //var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $scope.glocation = function (){
        return  geoLocation.getGeolocation();
   };
 })  
 */

 .controller('restaurantlistController', function ($scope, $rootScope, foodFactory, geoLocation, GreatCircle, $firebase) {
      //var getColourCode = new Firebase("http://orbital--1202.firebaseio.com/location");
      var count = 0; 
      var name = null; 
      var color0 = 'green'; 
      var color1 = 'orange'; 
      var color2 = 'assertive'; 
      var num = 0;
      "use strict";
      $scope.restaurantList = foodFactory.getRestaurants(); //call to restaurantfactory
      $scope.position = geoLocation.getGeolocation();
         //console.log($scope.position.lat); //for checking purposes
        //console.log($scope.position.lng);
        $scope.distanceTo = function(restaurant){
          var distance = GreatCircle.distance(restaurant.lat,restaurant.long, $scope.position.lat, $scope.position.lng);
          restaurant.distance = distance;
          distance = distance.toFixed(2);
        //console.log(distance);
        return distance;
      };
      $scope.colourCode = function(restaurant){
        var fbName = restaurant.fbName; 
        var locationURL = "http://orbital--1202.firebaseio.com/location/" + fbName; 
        //console.log(locationURL);
        var newref = new Firebase(locationURL);
        newref.once("value", function(snapshot) {
          var num = snapshot.numChildren();
          var maxCap = restaurant.capacity;
          var percentage = num / maxCap;
          console.log(count);
          if (num <= 1) {
                  //color = 'balanced'; 
                  restaurant.color = color0;
                  restaurant.src = "images/10.png";
                  restaurant.level = "EMPTY";
              restaurant.percent = num; //percentage; 
              console.log(restaurant.color); 


            } else if (num <= 2) {
              //color = 'energized'; 
              restaurant.color = color0;
              restaurant.src = "images/20.png";
              restaurant.level = "EMPTY    ";
              restaurant.percent = num; //percentage; 
              console.log(restaurant.color); 
              
            } else if (num <= 3){
              //color = 'assertive'; 
              restaurant.color = color0;                   
              restaurant.src = "images/30.png";
              restaurant.level = "EMPTY";
              restaurant.percent = num; //percentage; 
              console.log(restaurant.color);

            } else if (num <= 4) {
              restaurant.color = color1;
              restaurant.src = "images/40.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 5) {
              restaurant.color = color1;
              restaurant.src = "images/50.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 6) {
              restaurant.color = color1;
              restaurant.src = "images/60.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 7) {
              restaurant.color = color2;
              restaurant.src = "images/70.png";
              restaurant.level = "PACKED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 8) {
              restaurant.color = color2;
              restaurant.src = "images/80.png";
              restaurant.level = "PACKED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 9) {
              restaurant.color = color2;
              restaurant.src = "images/90.png";
              restaurant.level = "PACKED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color);

            } else if (num <= 10) {
              restaurant.color = color2;
              restaurant.src = "images/100.png";
              restaurant.level = "PACKED";
              restaurant.percent = num; //percentage;
              console.log(restaurant.color)
            }
          });
        //Variables for current time in milliseconds
        var currentDate = new Date();
        var currentTime = currentDate.getTime();

        /*getColourCode.endAt("WaaCow").once("value", function(snapshot) {
        // The callback function will only get called once since we return true
            snapshot.forEach(function(childSnapshot) {

                /* Commented remove update section
                var timeLog = childSnapshot.child("time").val();
                var fifteen = 1000 * 60 * 16;
                var difference = currentTime - timeLog;
                if (difference > fifteen) {
                    childSnapshot.ref().remove();
                }
               

                if (childSnapshot.key() === fbName){
                  count = childSnapshot.numChildren();
                  name = childSnapshot.key(); 
                  console.log(name);
                  console.log(count);

                if (count < 5) {
                  //color = 'balanced'; 
                  console.log("< 5"); 
                 restaurant.color = color0;
                 restaurant.src = "images/user-black-close-up-shape.png"; 
                  console.log(restaurant.color); 


                } else if (count > 5 && count<7) {
                  console.log("> 5");
                  //color = 'energized'; 
                  restaurant.color = color1;
                  restaurant.src = "images/multiple-users-silhouette.png"; 
                  console.log(restaurant.color); 
                  
                } else if (count >= 7){
                  console.log("else");
                  //color = 'assertive'; 
                  restaurant.color = color2;                   
                  restaurant.src = "images/social.png"; 
                  console.log(restaurant.color); 
                }  
            }
          }) 
        }); */
      }
      $scope.getColor = function(restaurant){
        console.log(restaurant);
        console.log(restaurant.color); 
        return restaurant.color; 
      }

    })

.controller('FassContributeCtrl', function($scope, $firebaseObject, $state, $cordovaCamera, $firebaseArray) {   

  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }

  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("fassCanteen") !== true) {
        $scope.data.fassCanteen = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
               /* $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                */
                if ($scope.choice === 4) {
                  fb.child("closed").child("fassCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah2");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("fassCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah2");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("fassCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah2");
                } else {
                  fb.child("food").child("fassCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah2");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("fassCanteen"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteenContribute");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("fassCanteen").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                $state.go("fassCanteen");
              })
  }, function(error){

  })
  }
})

.controller('FlavoursContributeCtrl', function($scope, $firebaseObject, $state,$firebaseArray, $cordovaCamera) {   

  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");

    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }

  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("flavoursCanteen") !== true) {
        $scope.data.fassCanteen = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
               /* $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                */
                if ($scope.choice === 4) {
                  fb.child("closed").child("flavoursCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah3");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("flavoursCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah3");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("flavoursCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah3");
                } else {
                  fb.child("food").child("flavoursCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah3");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("flavoursCanteen"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteenContribute");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("flavoursCanteen").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                $state.go("seeLah3");
              })
  }, function(error){

  })

  }

})

.controller('FoeContributeCtrl', function($scope, $firebaseObject, $state,$firebaseArray, $cordovaCamera) {   

  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }

  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("foeCanteen") !== true) {
        $scope.data.fassCanteen = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
               /* $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                */
                if ($scope.choice === 4) {
                  fb.child("closed").child("foeCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah4");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("foeCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah4");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("foeCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah4");
                } else {
                  fb.child("food").child("foeCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah4");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("foeCanteen"));
    $scope.images = syncArray;
  } else {
    $state.go("seeLah4");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("foeCanteen").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                $state.go("seeLah4");
              })
  }, function(error){

  })

  }

})

.controller('KoufuContributeCtrl', function($scope, $firebaseObject, $state, $cordovaCamera, $firebaseArray) {   

  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }

  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("koufuFC") !== true) {
        $scope.data.fassCanteen = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
               /* $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                */
                if ($scope.choice === 4) {
                  fb.child("closed").child("koufuFC").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah5");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("koufuFC").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah5");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("koufuFC").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah5");
                } else {
                  fb.child("food").child("koufuFC").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah5");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("koufuFC"));
    $scope.images = syncArray;
  } else {
    $state.go("seeLah5");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("koufuFC").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                $state.go("seeLah5");
              })
  }, function(error){

  })

  }
})

.controller('ScienceContributeCtrl', function($scope, $firebaseObject, $state, $cordovaCamera, $firebaseArray) {   

  $scope.list = function() {
    fbAuth = fb.getAuth();
    if (fbAuth) {
      var syncObject = $firebaseObject(fb.child("food"));
      syncObject.$bindTo($scope, "data");
    }
    $scope.imageUrl1 = "images/greenhuman.png";
    $scope.imageUrl2 = "images/orangehuman.png";
    $scope.imageUrl3 = "images/redhuman.png";
    $scope.imageUrl4 = "images/closesign.png";
  }

  $scope.choice = null;

  $scope.iconChange = function(clickChoice) {
    if (clickChoice === $scope.choice) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = null;
    } else if (clickChoice === 1) {
      $scope.imageUrl1 = "images/greenhumanclicked.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 1;
    } else if (clickChoice === 2) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehumanclicked.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 2;
    } else if (clickChoice === 3) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhumanclicked.png";
      $scope.imageUrl4 = "images/closesign.png";
      $scope.choice = 3;
    } else if (clickChoice === 4) {
      $scope.imageUrl1 = "images/greenhuman.png";
      $scope.imageUrl2 = "images/orangehuman.png";
      $scope.imageUrl3 = "images/redhuman.png";
      $scope.imageUrl4 = "images/closesignclicked.png";
      $scope.choice = 4;
    }
  }

  $scope.create = function(input) {
    if (input !== "") {
      var userName = null;

      if ($scope.data.hasOwnProperty("sciCanteen") !== true) {
        $scope.data.fassCanteen = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                
               /* $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                */
                if ($scope.choice === 4) {
                  fb.child("closed").child("sciCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah6");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("sciCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah6");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("sciCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah6");
                } else {
                  fb.child("food").child("sciCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  console.log("done!");
                  $state.go("seeLah6");
                }
              })


    } else {
      console.log("No comments in the box detected");
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("sciCanteen"));
    $scope.images = syncArray;
  } else {
    $state.go("seeLah6");
  }

  $scope.takePic = function(){
    $cordovaCamera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,  
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    })
    .then(function(data){
    //console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("sciCanteen").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                $state.go("seeLah6");
              })
  }, function(error){

  })

  }
})

.controller('GeoCtrl', function($scope, $state, $firebaseAuth, $ionicPopup, $firebaseObject, $firebase, geoLocation){

    //$scope.login = function(username, password){

      var authData = fb.getAuth();
      $scope.authData = authData;
      var glocation = geoLocation.getGeolocation();
      var user = authData.uid; 
      var FBtime = Firebase.ServerValue.TIMESTAMP;

            //Adding users into zUsers
            geoFire.set(user, [glocation.lat , glocation.lng]);
            locationRef.child(user).child("time").set({
              time: FBtime
            });
            var currenttime = new Date();
            console.log(currenttime.getTime());
            
            
            locationRef.once("value", function(snapshot) {
              var value = snapshot.child(user).child("time/time").val();
              console.log("time " + value);              
              var test = value - 3600000;
              var date = new Date(value);
              var month = date.getMonth();
              var hour = date.getHours();
              console.log("test " + test);
              console.log("date " + date);
              console.log("month " + month);
              console.log("hour " + hour);            
            }); 

            
            var geoQueryBizCanteen = geoFire.query({
              center: [1.2956205, 103.7741585],
              radius: 0.05    
            });
            var location = glocation; 
            var distance = geoQueryBizCanteen.radius(); 

            var onKeyEnteredRegistration1 = geoQueryBizCanteen.on("key_entered", function(user, location, distance) {
              console.log(user + " entered geoQueryBizCanteen at " + location + " (" + distance + " km from center)");
              bizCanteen.set(user, location);
                     //adding user here 
                   });

            var onKeyExitedRegistration1 = geoQueryBizCanteen.on("key_exited", function(user, location, distance) {
              console.log(user + " exited geoQueryBizCanteen to " + location + " (" + distance + " km from center)");
              bizCanteen.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration1 = geoQueryBizCanteen.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within geoQueryBizCanteen to " + location + " (" + distance + " km from center)");
            });


            var geoQueryScienceCanteen = geoFire.query({
              center: [1.2966224, 103.7805718],
              radius: 0.05
            });
            var onKeyEnteredRegistration2 = geoQueryScienceCanteen.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    scienceCanteen.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration2 = geoQueryScienceCanteen.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              scienceCanteen.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration2 = geoQueryScienceCanteen.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFOECanteen = geoFire.query({
              center: [1.2983509 , 103.7711677],
              radius: 0.05
            });
            var onKeyEnteredRegistration3 = geoQueryFOECanteen.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foeCanteen.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration3 = geoQueryFOECanteen.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              foeCanteen.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration3 = geoQueryFOECanteen.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryKoufu= geoFire.query({
             center: [1.3038157, 103.7739868],
             radius: 0.05
           });
            var onKeyEnteredRegistration4 = geoQueryKoufu.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    koufu.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration4 = geoQueryKoufu.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              koufu.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration4 = geoQueryKoufu.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFoodJunction = geoFire.query({
              center: [1.2983767, 103.7745437], 
              radius: 0.05
            });
            
            var onKeyEnteredRegistration5 = geoQueryFoodJunction.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foodJunctionYIH.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration5 = geoQueryFoodJunction.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              foodJunctionYIH.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration5 = geoQueryFoodJunction.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryAlcoveAsian = geoFire.query({
              center: [1.3020569, 103.7724088], 
              radius: 0.05
            });
            var onKeyEnteredRegistration6 = geoQueryAlcoveAsian.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    alcoveAsian.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration6 = geoQueryAlcoveAsian.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              alcoveAsian.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration6 = geoQueryAlcoveAsian.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryButterMyBun = geoFire.query({
              center: [1.3047341, 103.7725725], 
              radius: 0.05
            });

            var onKeyEnteredRegistration7 = geoQueryButterMyBun.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    butterMyBun.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration7 = geoQueryButterMyBun.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              butterMyBun.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration7 = geoQueryButterMyBun.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryHumbleOrigins = geoFire.query({
              center: [1.2950642, 103.7689681], 
              radius: 0.05
            });
            var onKeyEnteredRegistration8 = geoQueryHumbleOrigins.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    humbleOrigins.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration8 = geoQueryHumbleOrigins.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              humbleOrigins.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration8 = geoQueryHumbleOrigins.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryTheRoyalsBistroCafe  = geoFire.query({
              center: [ 1.3039084, 103.7741073], 
              radius: 0.05
            });
            var onKeyEnteredRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    royalsBistro.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              royalsBistro.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryHwangKorean = geoFire.query({
              center: [1.3038157, 103.7739868], 
              radius: 0.05
            });   
            var onKeyEnteredRegistration10 = geoQueryHwangKorean.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    hwangKorean.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration10 = geoQueryHwangKorean.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              hwangKorean.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration10 = geoQueryHwangKorean.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryPlatypus = geoFire.query({
              center: [1.2967775, 103.7809592], 
              radius: 0.05
            });  
            var onKeyEnteredRegistration11 = geoQueryPlatypus.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    platypusFood.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration11 = geoQueryPlatypus.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              platypusFood.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration11 = geoQueryPlatypus.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryReedz = geoFire.query({
              center: [1.2925654, 103.7719733], 
              radius: 0.05
            });    
            var onKeyEnteredRegistration12 = geoQueryReedz.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    reedzCafe.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration12 = geoQueryReedz.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              reedzCafe.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration12 = geoQueryReedz.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            
            var geoQuerySaporeItaliano = geoFire.query({
              center: [1.3041097, 103.7740535], 
              radius: 0.05
            });
            var onKeyEnteredRegistration13 = geoQuerySaporeItaliano.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    sapore.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration13 = geoQuerySaporeItaliano.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              sapore.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration13 = geoQuerySaporeItaliano.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryFassCanteen = geoFire.query({
              center: [1.2949143, 103.7717837],
              radius: 0.05
            });
            var onKeyEnteredRegistration14 = geoQueryFassCanteen.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        fassCanteen.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration14 = geoQueryFassCanteen.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              fassCanteen.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration14 = geoQueryFassCanteen.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFlavoursUtown = geoFire.query({
              center: [1.305908,103.774672],
              radius: 0.05
            });

            
            var onKeyEnteredRegistration15 = geoQueryFlavoursUtown.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        flavoursUTown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration15 = geoQueryFlavoursUtown.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              flavoursUTown.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration15 = geoQueryFlavoursUtown.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            
            var geoQuerySpinelli  = geoFire.query({
              center: [1.2964077,  103.7805198],
              radius: 0.05
            });

            var onKeyEnteredRegistration16 = geoQuerySpinelli.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spinelli.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration16 = geoQuerySpinelli.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              spinelli.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration16 = geoQuerySpinelli.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            var geoQuerySpiceTable = geoFire.query({
              center: [1.3038699, 103.7741271],
              radius: 0.05
            });

            var onKeyEnteredRegistration17 = geoQuerySpiceTable.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spiceTable.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration17 = geoQuerySpiceTable.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              spiceTable.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration17 = geoQuerySpiceTable.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryStarbucksMD11 = geoFire.query({
              center: [1.2941412, 103.781285],
              radius: 0.05
            });
            var onKeyEnteredRegistration18 = geoQueryStarbucksMD11.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksMD11.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration18 = geoQueryStarbucksMD11.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksMD11.remove("user").then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration18 = geoQueryStarbucksMD11.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            var geoQueryStarbucksYIH = geoFire.query({
              center: [1.2972787,  103.7724656],
              radius: 0.05 
            });
            var onKeyEnteredRegistration19 = geoQueryStarbucksYIH.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksYIH.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration19 = geoQueryStarbucksYIH.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksYIH.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration19 = geoQueryStarbucksYIH.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryUniversityClub = geoFire.query({
              center: [1.3056346, 103.772908],
              radius: 0.05 
            });
            var onKeyEnteredRegistration20 = geoQueryUniversityClub.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        universityClub.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration20 = geoQueryUniversityClub.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              universityClub.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration20 = geoQueryUniversityClub.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryWaaCow = geoFire.query({
              center: [1.2937922, 103.7729176],
              radius: 0.05 
            });
            var onKeyEnteredRegistration21 = geoQueryWaaCow.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        waaCow.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration21 = geoQueryWaaCow.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              waaCow.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration21 = geoQueryWaaCow.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });



            var geoQueryMcDonald = geoFire.query({
              center: [1.2984307, 103.7712874],
              radius: 0.05
            });
            var onKeyEnteredRegistration22 = geoQueryMcDonald.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                       mcDonald .set(user, location); //adding user here 

                     });

            var onKeyExitedRegistration22 = geoQueryMcDonald.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              mcDonald.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration22 = geoQueryMcDonald.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });



            var geoQuerySubWayYIH = geoFire.query({
              center: [1.2980747, 103.7742972],
              radius: 0.05 
            });
            var onKeyEnteredRegistration23 = geoQuerySubWayYIH.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayYIH.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration23 = geoQuerySubWayYIH.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              subwayYIH.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration23 = geoQuerySubWayYIH.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryStarbucksUtown = geoFire.query({
              center: [ 1.3056609,103.7727733],
              radius: 0.05
            });
            var onKeyEnteredRegistration50 = geoQueryStarbucksUtown.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksUtown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration50 = geoQueryStarbucksUtown.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksUtown.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration50 = geoQueryStarbucksUtown.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQuerySubWayUTown = geoFire.query({
              center: [1.303689, 103.773356],
              radius: 0.05
            });
            var onKeyEnteredRegistration24 = geoQuerySubWayUTown.on("key_entered", function(user, location, distance) {
              console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayUtown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration24 = geoQuerySubWayUTown.on("key_exited", function(user, location, distance) {
              console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              subwayUtown.remove(user).then(function() {
                console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration24 = geoQuerySubWayUTown.on("key_moved", function(user, location, distance) {
              console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
          })


.controller('navController', function($scope, $state) {
  $scope.goHome = function() {
    console.log("click");
    $state.go('yumNUS');
  }

  $scope.hide = function() {
    var currentName = $state.current.name;
    if (currentName==="yumNUS" || currentName==="bizCanteen_contribute") {
      return false;
      console.log('false');
    } else {
      return true
      console.log('true');
    }
  }
})
