angular.module('app.controllers', ['ionic','ionic.service.core', 'ionic.service.push','firebase', 'app.services','greatCircles'])

.controller('yumNUSCtrl', function($scope, $rootScope, foodFactory, geoLocation, GreatCircle, $firebase, $ionicPopup, $state, $ionicSideMenuDelegate) {
  /*$ionicPush.init({
    "debug": true,
    "onNotification": function(notification) {
      var payload = notification.payload;
      //console.log(notification, payload);
    },
    "onRegister": function(data) {
      //console.log(data.token);
    }
  });
  
  $ionicPush.register();*/
  $scope.toIntro = function(){
    $state.go('intro');
  }
  var linkIssue = new Firebase("https://orbital--1202.firebaseio.com/Issues");
  $scope.report =function(){
    //$state.go("reportProblem"); 
    $scope.data = {}
    var issue = $ionicPopup.show({
      template: 'Please enter your email<input type="text" ng-model="data.email"> <br>Enter Issue<input type="text" ng-model="data.issue">',
      title: 'Let Us Know!',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Submit',
        type: 'button-positive',
        onTap: function(e) {
         fbAuth = fb.getAuth();
         var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
         userFb.on("value", function(snapshot) {
          var firebaseTime = Firebase.ServerValue.TIMESTAMP;
          var currentDate = new Date();
          var currentTime = currentDate.getTime();
          userName = snapshot.child(fbAuth.uid).child("forumName").val();
          fb.child("Issues").child(currentTime).set({
            name: userName, 
            time: firebaseTime,
            issue: $scope.data
          });
        })
       }
     }]
   })
  }

  $scope.goInfo = function() {
    $state.go("aboutUs");
  }

  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft(); 
  }
  var color0 = 'balanced'; 
  var color1 = 'orange'; 
  var color2 = 'assertive'; 
  
  "use strict";
      $scope.restaurantList = foodFactory.getRestaurants(); //call to restaurantfactory
      var restaurants = foodFactory.getRestaurants();
      $scope.position = geoLocation.getGeolocation();
      
         ////console.log($scope.position.lat); //for checking purposes
        ////console.log($scope.position.lng);
        $scope.numLimit = 3;
        for(var i=0; i<restaurants.length; i++){
        ////console.log(restaurants[i]["lat"]);
        var distance = GreatCircle.distance(restaurants[i]["lat"],restaurants[i]["long"], $scope.position.lat, $scope.position.lng);
        restaurants[i]["distance"] = distance;
      }

      /*
      $scope.distanceTo = function(restaurant){
        var distance = GreatCircle.distance(restaurant.lat,restaurant.long, $scope.position.lat, $scope.position.lng);
        restaurant.distance = distance;
        distance = distance.toFixed(2);
        ////console.log(distance);
        return distance;
      };*/
      
      $scope.colourCode = function(restaurant){
        var fbName = restaurant.fbName; 
        var locationURL = "http://orbital--1202.firebaseio.com/location/" + fbName; 
        ////console.log(locationURL);
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
              restaurant.percent = num * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (num <= 2) {
              //color = 'energized'; 
              restaurant.color = color0;
              restaurant.src = "images/20.png";
              restaurant.level = "EMPTY    ";
              restaurant.percent = num * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (num <= 3){
              //color = 'assertive'; 
              restaurant.color = color0;                   
              restaurant.src = "images/30.png";
              restaurant.level = "EMPTY";
              restaurant.percent = num * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (num <= 4) {
              restaurant.color = color1;
              restaurant.src = "images/40.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (num <= 5) {
              restaurant.color = color1;
              restaurant.src = "images/50.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (num <= 6) {
              restaurant.color = color1;
              restaurant.src = "images/60.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (num <= 7) {
              restaurant.color = color2;
              restaurant.src = "images/70.png";
              restaurant.level = "PACKED";
              restaurant.percent = num * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (num <= 8) {
              restaurant.color = color2;
              restaurant.src = "images/80.png";
              restaurant.level = "PACKED";
              restaurant.percent = num * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (num <= 9) {
              restaurant.color = color2;
              restaurant.src = "images/90.png";
              restaurant.level = "PACKED";
              restaurant.percent = num * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (num <= 10) {
              restaurant.color = color2;
              restaurant.src = "images/100.png";
              restaurant.level = "PACKED";
              restaurant.percent = num * 10; //percentage;
              ////console.log(restaurant.color)
            }
          });
        
        //Variables for current time in milliseconds
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
      }
      $scope.getColor = function(restaurant){
        ////console.log(restaurant);
        ////console.log(restaurant.color); 
        return restaurant.color; 
      }

      $scope.userName = null;

      $scope.getUsername = function() {
        var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
        userFb.on("value", function(snapshot) {
          var fireAuth = fb.getAuth();
          $scope.userName = snapshot.child(fireAuth.uid).child("forumName").val();
          ////console.log(fireAuth.uid);
          ////console.log($scope.userName);
        })

      }
      
      $scope.logout = function() {
        var confirmLogout = $ionicPopup.confirm({
          title: 'Logging out',
          template: 'Do you want to logout?'
        });

        confirmLogout.then(function(res) {
          if (res) {
            fb.unauth();
            $state.go('bizCanteen_contribute')
            //console.log("logout");
          } else {
            //console.log("dont logout");
          }
        })
      }

      $scope.changePassword = function() {
        $scope.data = {}
        var passwordChange = $ionicPopup.show({
          template: 'Please enter your email<input type="test" ng-model="data.email"> <br>Enter Old Password<input type="password" ng-model="data.oldPassword"> <br>Enter new Password<input type="password" ng-model="data.newPassword1"> <br>Re-enter new Password<input type="password" ng-model="data.newPassword2">',
          title: 'Change of Password',
          scope: $scope,
          buttons: [{
            text: 'Cancel'
          }, {
            text: 'Change',
            type: 'button-positive',
            onTap: function(e) {
              return $scope.data;
            }
          }]
        })

        passwordChange.then(function(res) {
          if (res) {
            //console.log('success');
            if (res.newPassword1 === res.newPassword2) {
              fb.changePassword({
                email: res.email,
                oldPassword: res.oldPassword,
                newPassword: res.newPassword1
              }, function(error) {
                if (error) {
                  switch (error.code) {
                    case "INVALID_PASSWORD":
                    $ionicPopup.alert({
                      title: "Password is incorrect!",
                      template: 'Please try again'
                    }) ;
                    //console.log("Password Incorrect");
                    break;
                    case "INVALID_USER":
                    $ionicPopup.alert({
                      title: "Invalid email!",
                      template: 'Please try again'
                    });
                    //console.log("Invalid User");
                    break;
                    default:
                    $ionicPopup.alert({
                      title: "Error",
                      template: 'There is an error in changing your password. Please try again'
                    })
                    //console.log("Error changing password", error);
                  }
                } else {
                  $ionicPopup.alert({
                    title: "Successful!",
                    template: 'Your password has been successfully changed!'
                  });
                  //console.log("Password change successful!");
                }
              })
            } else {
              $ionicPopup.alert({
                title: "Password Mismatch",
                template: 'Your passwords do not match, please try again'
              })
              //console.log("Password different");
            }
            //console.log(res.oldPassword + res.newPassword1 + res.newPassword2);
          }
        })
      }
      var deploy = new Ionic.Deploy(); 
 // Update app code with new release from Ionic Deploy
 $scope.doUpdate = function() {
  deploy.update().then(function(res) {
    console.log('Ionic Deploy: Update Success! ', res);
  }, function(err) {
    console.log('Ionic Deploy: Update error! ', err);
  }, function(prog) {
    console.log('Ionic Deploy: Progress... ', prog);
  });
};

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    //console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
      if(hasUpdate === false){
       $ionicPopup.alert({
        title: "No Update",
        template: 'No updates available at the moment!'
      });
     }
     else{
      $ionicPopup.alert({
        title: "Update Available!",
        template: 'Please click on Download Update.'
      });
    }
  }, function(err) {
    console.error('Ionic Deploy: Unable to check for updates', err);
  });
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

  $scope.numberAlcove = null;
  $scope.numberButter = null;
  $scope.numberHumble = null;
  $scope.numberHwang = null;
  $scope.numberBistro = null;
  $scope.numberPlatypus = null;
  $scope.numberReedz = null;
  $scope.numberSapore = null;
  $scope.numberSpinelli = null;
  $scope.numberSpice = null;
  $scope.numberStarbucksMD11 = null;
  $scope.numberStarbucksYIH = null;
  $scope.numberStarbucksUTown = null;
  $scope.numberUniversity = null;
  $scope.numberWaaCow = null;

  var linkAlcove = new Firebase("https://orbital--1202.firebaseio.com/location/AlcoveAsianRestaurantBar");
  var linkButter = new Firebase("https://orbital--1202.firebaseio.com/location/ButterMyBun");
  var linkHumble = new Firebase("https://orbital--1202.firebaseio.com/location/HumbleOrigins");
  var linkHwang = new Firebase("https://orbital--1202.firebaseio.com/location/HwangRestaurant");
  var linkBistro = new Firebase("https://orbital--1202.firebaseio.com/location/TheRoyalsBistroCafé");
  var linkPlatypus = new Firebase("https://orbital--1202.firebaseio.com/location/PlatypusFoodBar");
  var linkReedz = new Firebase("https://orbital--1202.firebaseio.com/location/ReedzCafé");
  var linkSapore = new Firebase("https://orbital--1202.firebaseio.com/location/SaporeItaliano");
  var linkSpinelli = new Firebase("https://orbital--1202.firebaseio.com/location/Spinelli");
  var linkSpice = new Firebase("https://orbital--1202.firebaseio.com/location/SpiceTablebyPines");
  var linkStarbucksMD11 = new Firebase("https://orbital--1202.firebaseio.com/location/StarbucksMD11");
  var linkStarbucksYIH = new Firebase("https://orbital--1202.firebaseio.com/location/StarbucksYIH");
  var linkStarbucksUTown = new Firebase("https://orbital--1202.firebaseio.com/location/StarbucksUtown");
  var linkUniversity = new Firebase("https://orbital--1202.firebaseio.com/location/UniversityClub");
  var linkWaaCow = new Firebase("https://orbital--1202.firebaseio.com/location/WaaCow");

  $scope.getColorAlcove = function() {

    var count = 0;
    linkAlcove.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        ////console.log(timestamp);
        count++;
      })
      var total = 95;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorAlcove = "images/10.png";
              $scope.numberAlcove = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorAlcove = "images/20.png";
              $scope.numberAlcove = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorAlcove = "images/30.png";
              $scope.numberAlcove = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorAlcove = "images/40.png";
              $scope.numberAlcove = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorAlcove = "images/50.png";
              $scope.numberAlcove = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorAlcove = "images/60.png";
              $scope.numberAlcove = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorAlcove = "images/70.png";
              $scope.numberAlcove = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorAlcove = "images/80.png";
              $scope.numberAlcove = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorAlcove = "images/90.png";
              $scope.numberAlcove = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorAlcove = "images/100.png";
              $scope.numberAlcove = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorButter = function() {

    var count = 0;
    linkButter.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        ////console.log(timestamp);
        count++;
      })
      var total = 15;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorButter = "images/10.png";
              $scope.numberButter = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorButter = "images/20.png";
              $scope.numberButter = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorButter = "images/30.png";
              $scope.numberButter = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorButter = "images/40.png";
              $scope.numberButter = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorButter = "images/50.png";
              $scope.numberButter = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorButter = "images/60.png";
              $scope.numberButter = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorButter = "images/70.png";
              $scope.numberButter = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorButter = "images/80.png";
              $scope.numberButter = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorButter = "images/90.png";
              $scope.numberButter = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorButter = "images/100.png";
              $scope.numberButter = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorHumble = function() {

    var count = 0;
    linkHumble.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 16;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorHumble = "images/10.png";
              $scope.numberHumble = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorHumble = "images/20.png";
              $scope.numberHumble = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorHumble = "images/30.png";
              $scope.numberHumble = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorHumble = "images/40.png";
              $scope.numberHumble = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorHumble = "images/50.png";
              $scope.numberHumble = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorHumble = "images/60.png";
              $scope.numberHumble = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorHumble = "images/70.png";
              $scope.numberHumble = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorHumble = "images/80.png";
              $scope.numberHumble = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorHumble = "images/90.png";
              $scope.numberHumble = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorHumble = "images/100.png";
              $scope.numberHumble = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorHwang = function() {

    var count = 0;
    linkHwang.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 57;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorHwang = "images/10.png";
              $scope.numberHwang = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorHwang = "images/20.png";
              $scope.numberHwang = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorHwang = "images/30.png";
              $scope.numberHwang = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorHwang = "images/40.png";
              $scope.numberHwang = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorHwang = "images/50.png";
              $scope.numberHwang = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorHwang = "images/60.png";
              $scope.numberHwang = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorHwang = "images/70.png";
              $scope.numberHwang = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorHwang = "images/80.png";
              $scope.numberHwang = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorHwang = "images/90.png";
              $scope.numberHwang = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorHwang = "images/100.png";
              $scope.numberHwang = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorBistro = function() {

    var count = 0;
    linkBistro.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 30;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorBistro = "images/10.png";
              $scope.numberBistro = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorBistro = "images/20.png";
              $scope.numberBistro = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorBistro = "images/30.png";
              $scope.numberBistro = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorBistro = "images/40.png";
              $scope.numberBistro = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorBistro = "images/50.png";
              $scope.numberBistro = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorBistro = "images/60.png";
              $scope.numberBistro = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorBistro = "images/70.png";
              $scope.numberBistro = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorBistro = "images/80.png";
              $scope.numberBistro = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorBistro = "images/90.png";
              $scope.numberBistro = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorBistro = "images/100.png";
              $scope.numberBistro = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorPlatypus = function() {

    var count = 0;
    linkPlatypus.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 100;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorPlatypus = "images/10.png";
              $scope.numberPlatypus = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorPlatypus = "images/20.png";
              $scope.numberPlatypus = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorPlatypus = "images/30.png";
              $scope.numberPlatypus = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorPlatypus = "images/40.png";
              $scope.numberPlatypus = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorPlatypus = "images/50.png";
              $scope.numberPlatypus = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorPlatypus = "images/60.png";
              $scope.numberPlatypus = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorPlatypus = "images/70.png";
              $scope.numberPlatypus = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorPlatypus = "images/80.png";
              $scope.numberPlatypus = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorPlatypus = "images/90.png";
              $scope.numberPlatypus = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorPlatypus = "images/100.png";
              $scope.numberPlatypus = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorReedz = function() {

    var count = 0;
    linkReedz.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 36;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorReedz = "images/10.png";
              $scope.numberReedz = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorReedz = "images/20.png";
              $scope.numberReedz = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorReedz = "images/30.png";
              $scope.numberReedz = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorReedz = "images/40.png";
              $scope.numberReedz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorReedz = "images/50.png";
              $scope.numberReedz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorReedz = "images/60.png";
              $scope.numberReedz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorReedz = "images/70.png";
              $scope.numberReedz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorReedz = "images/80.png";
              $scope.numberReedz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorReedz = "images/90.png";
              $scope.numberReedz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorReedz = "images/100.png";
              $scope.numberReedz = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorSapore = function() {

    var count = 0;
    linkSapore.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 61;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorSapore = "images/10.png";
              $scope.numberSapore = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorSapore = "images/20.png";
              $scope.numberSapore = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorSapore = "images/30.png";
              $scope.numberSapore = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorSapore = "images/40.png";
              $scope.numberSapore = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorSapore = "images/50.png";
              $scope.numberSapore = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorSapore = "images/60.png";
              $scope.numberSapore = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorSapore = "images/70.png";
              $scope.numberSapore = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorSapore = "images/80.png";
              $scope.numberSapore = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorSapore = "images/90.png";
              $scope.numberSapore = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorSapore = "images/100.png";
              $scope.numberSapore = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorSpinelli = function() {

    var count = 0;
    linkSpinelli.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 36;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorSpinelli = "images/10.png";
              $scope.numberSpinelli = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorSpinelli = "images/20.png";
              $scope.numberSpinelli = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorSpinelli = "images/30.png";
              $scope.numberSpinelli = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorSpinelli = "images/40.png";
              $scope.numberSpinelli = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorSpinelli = "images/50.png";
              $scope.numberSpinelli = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorSpinelli = "images/60.png";
              $scope.numberSpinelli = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorSpinelli = "images/70.png";
              $scope.numberSpinelli = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorSpinelli = "images/80.png";
              $scope.numberSpinelli = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorSpinelli = "images/90.png";
              $scope.numberSpinelli = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorSpinelli = "images/100.png";
              $scope.numberSpinelli = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorSpice = function() {

    var count = 0;
    linkSpice.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 75;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorSpice = "images/10.png";
              $scope.numberSpice = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorSpice = "images/20.png";
              $scope.numberSpice = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorSpice = "images/30.png";
              $scope.numberSpice = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorSpice = "images/40.png";
              $scope.numberSpice = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorSpice = "images/50.png";
              $scope.numberSpice = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorSpice = "images/60.png";
              $scope.numberSpice = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorSpice = "images/70.png";
              $scope.numberSpice = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorSpice = "images/80.png";
              $scope.numberSpice = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorSpice = "images/90.png";
              $scope.numberSpice = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorSpice = "images/100.png";
              $scope.numberSpice = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorStarbucksMD11 = function() {

    var count = 0;
    linkStarbucksMD11.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 30;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorStarbucksMD11 = "images/10.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorStarbucksMD11 = "images/20.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorStarbucksMD11 = "images/30.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorStarbucksMD11 = "images/40.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorStarbucksMD11 = "images/50.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorStarbucksMD11 = "images/60.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorStarbucksMD11 = "images/70.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorStarbucksMD11 = "images/80.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorStarbucksMD11 = "images/90.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorStarbucksMD11 = "images/100.png";
              $scope.numberStarbucksMD11 = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorStarbucksYIH = function() {

    var count = 0;
    linkStarbucksYIH.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 30;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorStarbucksYIH = "images/10.png";
              $scope.numberStarbucksYIH = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorStarbucksYIH = "images/20.png";
              $scope.numberStarbucksYIH = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorStarbucksYIH = "images/30.png";
              $scope.numberStarbucksYIH = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorStarbucksYIH = "images/40.png";
              $scope.numberStarbucksYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorStarbucksYIH = "images/50.png";
              $scope.numberStarbucksYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorStarbucksYIH = "images/60.png";
              $scope.numberStarbucksYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorStarbucksYIH = "images/70.png";
              $scope.numberStarbucksYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorStarbucksYIH = "images/80.png";
              $scope.numberStarbucksYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorStarbucksYIH = "images/90.png";
              $scope.numberStarbucksYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorStarbucksYIH = "images/100.png";
              $scope.numberStarbucksYIH = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorStarbucksUTown = function() {

    var count = 0;
    linkStarbucksUTown.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 165;
      var percent = count / total * 100;
      count = 2;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorStarbucksUTown = "images/10.png";
              $scope.numberStarbucksUTown = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorStarbucksUTown = "images/20.png";
              $scope.numberStarbucksUTown = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorStarbucksUTown = "images/30.png";
              $scope.numberStarbucksUTown = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorStarbucksUTown = "images/40.png";
              $scope.numberStarbucksUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorStarbucksUTown = "images/50.png";
              $scope.numberStarbucksUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorStarbucksUTown = "images/60.png";
              $scope.numberStarbucksUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorStarbucksUTown = "images/70.png";
              $scope.numberStarbucksUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorStarbucksUTown = "images/80.png";
              $scope.numberStarbucksUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorStarbucksUTown = "images/90.png";
              $scope.numberStarbucksUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorStarbucksUTown = "images/100.png";
              $scope.numberStarbucksUtown = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorUniversity = function() {

    var count = 0;
    linkUniversity.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 35;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorUniversity = "images/10.png";
              $scope.numberUniversity = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorUniversity = "images/20.png";
              $scope.numberUniversity = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorUniversity = "images/30.png";
              $scope.numberUniversity = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorUniversity = "images/40.png";
              $scope.numberUniversity = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorUniversity = "images/50.png";
              $scope.numberUniversity = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorUniversity = "images/60.png";
              $scope.numberUniversity = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorUniversity = "images/70.png";
              $scope.numberUniversity = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorUniversity = "images/80.png";
              $scope.numberUniversity = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorUniversity = "images/90.png";
              $scope.numberUniversity = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorUniversity = "images/100.png";
              $scope.numberUniversity = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorWaaCow = function() {

    var count = 0;
    linkWaaCow.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 20;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorWaaCow = "images/10.png";
              $scope.numberWaaCow = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorWaaCow = "images/20.png";
              $scope.numberWaaCow = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorWaaCow = "images/30.png";
              $scope.numberWaaCow = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorWaaCow = "images/40.png";
              $scope.numberWaaCow = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorWaaCow = "images/50.png";
              $scope.numberWaaCow = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorWaaCow = "images/60.png";
              $scope.numberWaaCow = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorWaaCow = "images/70.png";
              $scope.numberWaaCow = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorWaaCow = "images/80.png";
              $scope.numberWaaCow = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorWaaCow = "images/90.png";
              $scope.numberWaaCow = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorWaaCow = "images/100.png";
              $scope.numberWaaCow = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }


})

.controller('checkFastfoodsCtrl', function($scope) {
  $scope.numberMac = null;
  $scope.numberSubwayYIH = null;
  $scope.numberSubwayUTown = null;

  $scope.numberMac = null;
  $scope.numberSubwayYIH = null;
  $scope.numberSubwayUTown = null;

  var linkMac =  new Firebase("https://orbital--1202.firebaseio.com/location/McDonald");
  var linkSubwayYIH =  new Firebase("https://orbital--1202.firebaseio.com/location/SubwayYIH ");
  var linkSubwayUTown =  new Firebase("https://orbital--1202.firebaseio.com/location/SubwayUtown ");

  $scope.getColorMac = function() {

    var count = 0;
    linkMac.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 273;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorMac = "images/10.png";
              $scope.numberMac = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorMac = "images/20.png";
              $scope.numberMac = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorMac = "images/30.png";
              $scope.numberMac = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorMac = "images/40.png";
              $scope.numberMac = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorMac = "images/50.png";
              $scope.numberMac = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorMac = "images/60.png";
              $scope.numberMac = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorMac = "images/70.png";
              $scope.numberMac = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorMac = "images/80.png";
              $scope.numberMac = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorMac = "images/90.png";
              $scope.numberMac = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorMac = "images/100.png";
              $scope.numberMac = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorSubwayYIH = function() {

    var count = 0;
    linkSubwayYIH.once("value", function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 22;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorSubwayYIH = "images/10.png";
              $scope.numberSubwayYIH = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorSubwayYIH = "images/20.png";
              $scope.numberSubwayYIH = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorSubwayYIH = "images/30.png";
              $scope.numberSubwayYIH = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorSubwayYIH = "images/40.png";
              $scope.numberSubwayYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorSubwayYIH = "images/50.png";
              $scope.numberSubwayYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorSubwayYIH = "images/60.png";
              $scope.numberSubwayYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorSubwayYIH = "images/70.png";
              $scope.numberSubwayYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorSubwayYIH = "images/80.png";
              $scope.numberSubwayYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorSubwayYIH = "images/90.png";
              $scope.numberSubwayYIH = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorSubwayYIH = "images/100.png";
              $scope.numberSubwayYIH = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorSubwayUTown = function() {

    var count = 0;
    linkSubwayUTown.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        console.log(timestamp);
        count++;
      })
      var total = 36;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorSubwayUTown = "images/10.png";
              $scope.numberSubwayUTown = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorSubwayUTown = "images/20.png";
              $scope.numberSubwayUTown = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorSubwayUTown = "images/30.png";
              $scope.numberSubwayUTown = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorSubwayUTown = "images/40.png";
              $scope.numberSubwayUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorSubwayUTown = "images/50.png";
              $scope.numberSubwayUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorSubwayUTown = "images/60.png";
              $scope.numberSubwayUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorSubwayUTown = "images/70.png";
              $scope.numberSubwayUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorSubwayUTown = "images/80.png";
              $scope.numberSubwayUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorSubwayUTown = "images/90.png";
              $scope.numberSubwayUTown = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorSubwayUTown = "images/100.png";
              $scope.numberSubwayUTown = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

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

  $scope.numberBiz = null;
  $scope.numberFass = null;
  $scope.numberFlavours = null;
  $scope.numberFoe = null;
  $scope.numberKoufu = null;
  $scope.numberSci = null;
  $scope.numberFoodJunction = null;

  $scope.getColorBiz = function() {

    var count = 0;
    colourBizCanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 474;
      var percent = count / total * 100

      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorBiz = "images/10.png";
              $scope.numberBiz = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorBiz = "images/20.png";
              $scope.numberBiz = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorBiz = "images/30.png";
              $scope.numberBiz = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorBiz = "images/40.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorBiz = "images/50.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorBiz = "images/60.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorBiz = "images/70.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorBiz = "images/80.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorBiz = "images/90.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorBiz = "images/100.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorFass = function() {

    var count = 0;
    colourFASSCanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 509;
      var percent = count / 509 * 10
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorFass = "images/10.png";
              $scope.numberFass = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorFass = "images/20.png";
              $scope.numberFass = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorFass = "images/30.png";
              $scope.numberFass = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorFass = "images/40.png";
              $scope.numberFass = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorFass = "images/50.png";
              $scope.numberFass = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorFass = "images/60.png";
              $scope.numberFass = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorFass = "images/70.png";
              $scope.numberFass = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorFass = "images/80.png";
              $scope.numberFass = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorFass = "images/90.png";
              $scope.numberFass = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorFass = "images/100.png";
              $scope.numberFass = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorFlavours = function() {

    var count = 0;
    colourFlavoursCanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 350;
      var percent = count / total * 100;

      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorFlavours = "images/10.png";
              $scope.numberFlavours = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorFlavours = "images/20.png";
              $scope.numberFlavours = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorFlavours = "images/30.png";
              $scope.numberFlavours = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorFlavours = "images/40.png";
              $scope.numberFlavours = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorFlavours = "images/50.png";
              $scope.numberFlavours = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorFlavours = "images/60.png";
              $scope.numberFlavours = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorFlavours = "images/70.png";
              $scope.numberFlavours = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorBiz = "images/80.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorBiz = "images/90.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorBiz = "images/100.png";
              $scope.numberBiz = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorFoe = function() {

    var count = 0;
    colourFOECanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 426;
      var percent = count / total * 100;

      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorFoe = "images/10.png";
              $scope.numberFoe = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorFoe = "images/20.png";
              $scope.numberFoe = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorFoe = "images/30.png";
              $scope.numberFoe = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorFoe = "images/40.png";
              $scope.numberFoe = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorFoe = "images/50.png";
              $scope.numberFoe = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorFoe = "images/60.png";
              $scope.numberFoe = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorFoe = "images/70.png";
              $scope.numberFoe = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorFoe = "images/80.png";
              $scope.numberFoe = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorFoe = "images/90.png";
              $scope.numberFoe = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorFoe = "images/100.png";
              $scope.numberFoe = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorKoufu = function() {

    var count = 0;
    colourKoufuFoodcourt.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 245;
      var percent = count / total * 100;

      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorKoufu = "images/10.png";
              $scope.numberKoufu = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorKoufu = "images/20.png";
              $scope.numberKoufu = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorKoufu = "images/30.png";
              $scope.numberKoufu = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorKoufu = "images/40.png";
              $scope.numberKoufu = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorKoufu = "images/50.png";
              $scope.numberKoufu = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorKoufu = "images/60.png";
              $scope.numberKoufu = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorKoufu = "images/70.png";
              $scope.numberKoufu = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorKoufu = "images/80.png";
              $scope.numberKoufu = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorKoufu = "images/90.png";
              $scope.numberKoufu = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorKoufu = "images/100.png";
              $scope.numberKoufu = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorSci = function() {

    var count = 0;
    colourScienceCanteen.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 519;
      var percent = count / total * 100;

      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorSci = "images/10.png";
              $scope.numberSci = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorSci = "images/20.png";
              $scope.numberSci = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorSci = "images/30.png";
              $scope.numberSci = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorSci = "images/40.png";
              $scope.numberSci = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorSci = "images/50.png";
              $scope.numberSci = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorSci = "images/60.png";
              $scope.numberSci = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorSci = "images/70.png";
              $scope.numberSci = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorSci = "images/80.png";
              $scope.numberSci = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorSci = "images/90.png";
              $scope.numberSci = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorSci = "images/100.png";
              $scope.numberSci = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

  $scope.getColorFoodJunction = function() {

    var count = 0;
    colourFoodJunctionYIH.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var timestamp = childSnapshot.val();
        //console.log(timestamp);
        count++;
      })
      var total = 181;
      var percent = count / total * 100;
      if (count <= 1) {
                  //color = 'balanced'; ;
                  $scope.colorFoodJunction = "images/10.png";
              $scope.numberFoodJunction = count * 10; //percentage; 
              ////console.log(restaurant.color); 


            } else if (count <= 2) {
              //color = 'energized'; 
              $scope.colorFoodJunction = "images/20.png";
              $scope.numberFoodJunction = count * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (count <= 3){
              //color = 'assertive';              
              $scope.colorFoodJunction = "images/30.png";
              $scope.numberFoodJunction = count * 10; //percentage; 
              ////console.log(restaurant.color);

            } else if (count <= 4) {
              $scope.colorFoodJunction = "images/40.png";
              $scope.numberFoodJunction = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 5) {
              $scope.colorFoodJunction = "images/50.png";
              $scope.numberFoodJunction = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 6) {
              $scope.colorFoodJunction = "images/60.png";
              $scope.numberFoodJunction = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 7) {
              $scope.colorFoodJunction = "images/70.png";
              $scope.numberFoodJunction = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 8) {
              $scope.colorFoodJunction = "images/80.png";
              $scope.numberFoodJunction = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 9) {
              $scope.colorFoodJunction = "images/90.png";
              $scope.numberFoodJunction = count * 10; //percentage;
              ////console.log(restaurant.color);

            } else if (count <= 10) {
              $scope.colorFoodJunction = "images/100.png";
              $scope.numberFoodJunction = count * 10; //percentage;
              ////console.log(restaurant.color)
            }
          })
  }

})

.controller('bizCanteenCtrl', function($scope) {

})

.controller('bizCanteenStallsCtrl', function($scope) {

})


.controller('bizCanteen_contributeCtrl', function($scope, $state, $firebaseAuth, $localstorage, $ionicPopup, $firebaseObject, $firebase, geoLocation) {

  $scope.forgotPassword = function() {
    $scope.data = {};

    $ionicPopup.prompt({
      title: 'Please enter registered email',
      inputType: 'text'
    })
    .then(function(result) {
      fb.resetPassword({
        email: result
      }, function(error) {
        if (error) {
          switch (error.code) {
            case "INVALID_USER":
            $ionicPopup.alert({
              title: 'Invalid User',
              template: 'The specified email does not exist. Please create an account if you do not have one!'
            });
            break;
            default:
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Please try again'
            });
          }
        } else {
          $ionicPopup.alert({
            title: 'Success!',
            template: 'Password reset email sent successfully'
          });
        }
      })
    })
  }

  $scope.rmbMe = { checked: true };

  $scope.test = function() {
    //console.log($scope.rmbMe.checked);
  }

  $scope.username = null;
  $scope.password = null;

  $scope.checkUsername = function() {
    var storedUsername =  $localstorage.get("username");
    if (storedUsername !== null) {
     $scope.username = storedUsername;
     //console.log("OBTAINED");
   }
 }

 $scope.checkPassword = function() {
  var storedPassword =  $localstorage.get("password");
  if (storedPassword !== null) {
    $scope.password = storedPassword;
    //console.log("OBTAINED");
  }
}

$scope.login = function(username, password){
  var fbAuth = $firebaseAuth(fb);
  return fbAuth.$authWithPassword({
    email: username,
    password: password
  }).then(function(authData) {
    if ($scope.rmbMe.checked) {
      $localstorage.set("username", username);
      $localstorage.set("password", password);
    }
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
            //console.log(currenttime.getTime());
            
            
            locationRef.once("value", function(snapshot) {
              var value = snapshot.child(user).child("time/time").val();
              //console.log("time " + value);              
              var test = value - 3600000;
              var date = new Date(value);
              var month = date.getMonth();
              var hour = date.getHours();
              //console.log("test " + test);
              //console.log("date " + date);
              //console.log("month " + month);
              //console.log("hour " + hour);            
            })

            
            var geoQueryBizCanteen = geoFire.query({
              center: [1.2956205 , 103.7741585],
              radius: 0.05    
            });
            var location = glocation; 
            var distance = geoQueryBizCanteen.radius(); 

            var onKeyEnteredRegistration1 = geoQueryBizCanteen.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
              bizCanteen.set(user, location);
                     //adding user here 
                   });

            var onKeyExitedRegistration1 = geoQueryBizCanteen.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              bizCanteen.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration1 = geoQueryBizCanteen.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryScienceCanteen = geoFire.query({
              center: [1.2966224, 103.7805718],
              radius: 0.05
            });
            var onKeyEnteredRegistration2 = geoQueryScienceCanteen.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    scienceCanteen.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration2 = geoQueryScienceCanteen.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              scienceCanteen.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration2 = geoQueryScienceCanteen.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFOECanteen = geoFire.query({
              center: [1.2983509 , 103.7711677],
              radius: 0.05
            });
            var onKeyEnteredRegistration3 = geoQueryFOECanteen.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foeCanteen.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration3 = geoQueryFOECanteen.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              foeCanteen.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration3 = geoQueryFOECanteen.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryKoufu= geoFire.query({
             center: [1.3038157, 103.7739868],
             radius: 0.05
           });
            var onKeyEnteredRegistration4 = geoQueryKoufu.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    koufu.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration4 = geoQueryKoufu.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              koufu.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration4 = geoQueryKoufu.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFoodJunction = geoFire.query({
              center: [1.2983767, 103.7745437], 
              radius: 0.05
            });
            
            var onKeyEnteredRegistration5 = geoQueryFoodJunction.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foodJunctionYIH.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration5 = geoQueryFoodJunction.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              foodJunctionYIH.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration5 = geoQueryFoodJunction.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryAlcoveAsian = geoFire.query({
              center: [1.3020569, 103.7724088], 
              radius: 0.05
            });
            var onKeyEnteredRegistration6 = geoQueryAlcoveAsian.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    alcoveAsian.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration6 = geoQueryAlcoveAsian.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              alcoveAsian.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration6 = geoQueryAlcoveAsian.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryButterMyBun = geoFire.query({
              center: [1.3047341, 103.7725725], 
              radius: 0.05
            });

            var onKeyEnteredRegistration7 = geoQueryButterMyBun.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    butterMyBun.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration7 = geoQueryButterMyBun.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              butterMyBun.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration7 = geoQueryButterMyBun.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryHumbleOrigins = geoFire.query({
              center: [1.2950642, 103.7689681], 
              radius: 0.05
            });
            var onKeyEnteredRegistration8 = geoQueryHumbleOrigins.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    humbleOrigins.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration8 = geoQueryHumbleOrigins.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              humbleOrigins.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration8 = geoQueryHumbleOrigins.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryTheRoyalsBistroCafe  = geoFire.query({
              center: [ 1.3039084, 103.7741073], 
              radius: 0.05
            });
            var onKeyEnteredRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    royalsBistro.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              royalsBistro.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryHwangKorean = geoFire.query({
              center: [1.3038157, 103.7739868], 
              radius: 0.05
            });   
            var onKeyEnteredRegistration10 = geoQueryHwangKorean.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    hwangKorean.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration10 = geoQueryHwangKorean.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              hwangKorean.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration10 = geoQueryHwangKorean.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryPlatypus = geoFire.query({
              center: [1.2967775, 103.7809592], 
              radius: 0.05
            });  
            var onKeyEnteredRegistration11 = geoQueryPlatypus.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    platypusFood.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration11 = geoQueryPlatypus.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              platypusFood.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration11 = geoQueryPlatypus.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryReedz = geoFire.query({
              center: [1.2925654, 103.7719733], 
              radius: 0.05
            });    
            var onKeyEnteredRegistration12 = geoQueryReedz.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    reedzCafe.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration12 = geoQueryReedz.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              reedzCafe.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration12 = geoQueryReedz.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            
            var geoQuerySaporeItaliano = geoFire.query({
              center: [1.3041097, 103.7740535], 
              radius: 0.05
            });
            var onKeyEnteredRegistration13 = geoQuerySaporeItaliano.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    sapore.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration13 = geoQuerySaporeItaliano.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              sapore.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration13 = geoQuerySaporeItaliano.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryFassCanteen = geoFire.query({
              center: [1.2949143, 103.7717837],
              radius: 0.05
            });
            var onKeyEnteredRegistration14 = geoQueryFassCanteen.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        fassCanteen.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration14 = geoQueryFassCanteen.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              fassCanteen.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration14 = geoQueryFassCanteen.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFlavoursUtown = geoFire.query({
              center: [1.305908,103.774672],
              radius: 0.05
            });

            
            var onKeyEnteredRegistration15 = geoQueryFlavoursUtown.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        flavoursUTown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration15 = geoQueryFlavoursUtown.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              flavoursUTown.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration15 = geoQueryFlavoursUtown.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            
            var geoQuerySpinelli  = geoFire.query({
              center: [1.2964077,  103.7805198],
              radius: 0.05
            });

            var onKeyEnteredRegistration16 = geoQuerySpinelli.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spinelli.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration16 = geoQuerySpinelli.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              spinelli.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration16 = geoQuerySpinelli.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            var geoQuerySpiceTable = geoFire.query({
              center: [1.3038699, 103.7741271],
              radius: 0.05
            });

            var onKeyEnteredRegistration17 = geoQuerySpiceTable.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spiceTable.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration17 = geoQuerySpiceTable.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              spiceTable.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration17 = geoQuerySpiceTable.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryStarbucksMD11 = geoFire.query({
              center: [1.2941412, 103.781285],
              radius: 0.05
            });
            var onKeyEnteredRegistration18 = geoQueryStarbucksMD11.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksMD11.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration18 = geoQueryStarbucksMD11.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksMD11.remove("user").then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration18 = geoQueryStarbucksMD11.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            var geoQueryStarbucksYIH = geoFire.query({
              center: [1.2972787,  103.7724656],
              radius: 0.05 
            });
            var onKeyEnteredRegistration19 = geoQueryStarbucksYIH.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksYIH.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration19 = geoQueryStarbucksYIH.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksYIH.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration19 = geoQueryStarbucksYIH.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryUniversityClub = geoFire.query({
              center: [1.3056346, 103.772908],
              radius: 0.05 
            });
            var onKeyEnteredRegistration20 = geoQueryUniversityClub.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        universityClub.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration20 = geoQueryUniversityClub.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              universityClub.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration20 = geoQueryUniversityClub.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryWaaCow = geoFire.query({
              center: [1.2937922, 103.7729176],
              radius: 0.05 
            });
            var onKeyEnteredRegistration21 = geoQueryWaaCow.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        waaCow.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration21 = geoQueryWaaCow.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              waaCow.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration21 = geoQueryWaaCow.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });



            var geoQueryMcDonald = geoFire.query({
              center: [1.2984307, 103.7712874],
              radius: 0.05
            });
            var onKeyEnteredRegistration22 = geoQueryMcDonald.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                       mcDonald .set(user, location); //adding user here 

                     });

            var onKeyExitedRegistration22 = geoQueryMcDonald.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              mcDonald.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration22 = geoQueryMcDonald.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });



            var geoQuerySubWayYIH = geoFire.query({
              center: [1.2980747, 103.7742972],
              radius: 0.05 
            });
            var onKeyEnteredRegistration23 = geoQuerySubWayYIH.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayYIH.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration23 = geoQuerySubWayYIH.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              subwayYIH.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration23 = geoQuerySubWayYIH.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryStarbucksUtown = geoFire.query({
              center: [ 1.3056609,103.7727733],
              radius: 0.05
            });
            var onKeyEnteredRegistration50 = geoQueryStarbucksUtown.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksUtown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration50 = geoQueryStarbucksUtown.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksUtown.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration50 = geoQueryStarbucksUtown.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQuerySubWayUTown = geoFire.query({
              center: [1.303689, 103.773356],
              radius: 0.05
            });
            var onKeyEnteredRegistration24 = geoQuerySubWayUTown.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayUtown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration24 = geoQuerySubWayUTown.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              subwayUtown.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration24 = geoQuerySubWayUTown.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            //$state.go("temp");
            $state.go("yumNUS");

          }).catch(function(error) {
            console.error("ERROR: " + error);
            $ionicPopup.alert({
              title: 'Wrong password!',
              template: 'Please create an account if you do not have one!'
            });
          });
          //var location = $firebaseObject(locationRef.child("Location"));
        //location.$bindTo($scope, "data");
        
        
      }

      $scope.register = function(username, password) {                
        var UserFb = $firebaseObject(fb.child("Users"));
        UserFb.$bindTo($scope, "data");
        var fbAuth = $firebaseAuth(fb);

        if (username === "" || username === undefined || password === "" || password === undefined) {
          $ionicPopup.alert({
            title: "No Email or Password detected",
            template: "Please enter an email or password to create your account"
          })
        } else {
          //console.log(username);
          //console.log(password);
        //Prompts for a username
        $ionicPopup.prompt({
          title: 'Please choose a Forum Username',
          inputType: 'text'
        })
        .then(function(result) {
          var firebaseUsers = new Firebase("http://orbital--1202.firebaseio.com/Users");
            //if (results !== "") {
                //if (true) {
                    //Creates database of user in firebase
                    if (result === "" || result === undefined) {
                      $ionicPopup.alert({
                        title: 'No username detected!',
                        template: 'Please enter a username'
                      })
                    } else {
                      var repeat = false;
                      firebaseUsers.once("value", function(snapshot) {
                          snapshot.forEach(function(childSnapshot) {
                              var currentUser = childSnapshot.child("forumName").val();
                              if (currentUser === result) {
                                  repeat = true;
                                  return true;
                              }
                          })
                      })

                      if (repeat) {
                          $ionicPopup.alert({
                              title: 'Username taken!',
                              template: 'Please select another username!'
                          })
                      } else {

                      fbAuth.$createUser({email: username, password: password}).then(function(userData) {
                        return fbAuth.$authWithPassword({
                          email: username,
                          password: password
                        })

                      }).then(function(authData) {
                        console.log("created!")
                        if ($scope.rmbMe.checked) {
                          $localstorage.set("username", username);
                          $localstorage.set("password", password);
                        }

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
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                            bizCanteen.set(user, location); //adding user here 

                          });

                        var onKeyExitedRegistration25 = geoQueryBizCanteen.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        bizCanteen.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration25 = geoQueryBizCanteen.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                        var geoQueryScienceCanteen = geoFire.query({
                          center: [1.2966224, 103.7805718],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration26 = geoQueryScienceCanteen.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    scienceCanteen.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration26 = geoQueryScienceCanteen.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        scienceCanteen.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration26 = geoQueryScienceCanteen.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryFOECanteen = geoFire.query({
                          center: [1.2983509 , 103.7711677],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration27 = geoQueryFOECanteen.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foeCanteen.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration27 = geoQueryFOECanteen.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        foeCanteen.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration27 = geoQueryFOECanteen.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryKoufu= geoFire.query({
                         center: [1.3038157, 103.7739868],
                         radius: 0.05
                       });
                        var onKeyEnteredRegistration28 = geoQueryKoufu.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    koufu.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration28 = geoQueryKoufu.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        koufu.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration28 = geoQueryKoufu.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryFoodJunction = geoFire.query({
                          center: [1.2983767, 103.7745437], 
                          radius: 0.05     
                        });

                        var onKeyEnteredRegistration29 = geoQueryFoodJunction.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foodJunctionYIH.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration29 = geoQueryFoodJunction.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        foodJunctionYIH.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration29 = geoQueryFoodJunction.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryAlcoveAsian = geoFire.query({
                          center: [1.3020569, 103.7724088], 
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration30 = geoQueryAlcoveAsian.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    alcoveAsian.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration30 = geoQueryAlcoveAsian.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        alcoveAsian.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration30  = geoQueryAlcoveAsian.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryButterMyBun = geoFire.query({
                          center: [1.3047341, 103.7725725], 
                          radius: 0.05
                        });

                        var onKeyEnteredRegistration31 = geoQueryButterMyBun.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    butterMyBun.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration31 = geoQueryButterMyBun.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        butterMyBun.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration31 = geoQueryButterMyBun.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryHumbleOrigins = geoFire.query({
                          center: [1.2950642, 103.7689681], 
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration32 = geoQueryHumbleOrigins.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    humbleOrigins.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration32 = geoQueryHumbleOrigins.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        humbleOrigins.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration32 = geoQueryHumbleOrigins.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                        var geoQueryTheRoyalsBistroCafe  = geoFire.query({
                          center: [ 1.3039084, 103.7741073], 
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration33 = geoQueryTheRoyalsBistroCafe.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    royalsBistro.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration33 = geoQueryTheRoyalsBistroCafe.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        royalsBistro.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration33 = geoQueryTheRoyalsBistroCafe.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                        var geoQueryHwangKorean = geoFire.query({
                          center: [1.3038157, 103.7739868], 
                          radius: 0.05
                        });   
                        var onKeyEnteredRegistration34 = geoQueryHwangKorean.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    hwangKorean.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration34 = geoQueryHwangKorean.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        hwangKorean.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration34 = geoQueryHwangKorean.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryPlatypus = geoFire.query({
                          center: [1.2967775, 103.7809592], 
                          radius: 0.05
                        });  
                        var onKeyEnteredRegistration35 = geoQueryPlatypus.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    platypusFood.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration35 = geoQueryPlatypus.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        platypusFood.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration35 = geoQueryPlatypus.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                        var geoQueryReedz = geoFire.query({
                          center: [1.2925654, 103.7719733], 
                          radius: 0.05
                        });    
                        var onKeyEnteredRegistration36 = geoQueryReedz.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    reedzCafe.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration36 = geoQueryReedz.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        reedzCafe.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration36 = geoQueryReedz.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQuerySaporeItaliano = geoFire.query({
                          center: [1.3041097, 103.7740535], 
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration37 = geoQuerySaporeItaliano.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    sapore.set(user, location); //adding user here 
                  });

                        var onKeyExitedRegistration37 = geoQuerySaporeItaliano.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        sapore.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });
                      });

                        var onKeyMovedRegistration37 = geoQuerySaporeItaliano.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                        var geoQueryFassCanteen = geoFire.query({
                          center: [1.2949143, 103.7717837],
                          radius: 0.05
                        });

                        var onKeyEnteredRegistration38 = geoQueryFassCanteen.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        fassCanteen.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration38 = geoQueryFassCanteen.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        fassCanteen.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration38 = geoQueryFassCanteen.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryFlavoursUtown = geoFire.query({
                          center: [1.305908,103.774672],
                          radius: 0.05
                        });

                        var onKeyEnteredRegistration39 = geoQueryFlavoursUtown.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        flavoursUTown.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration39 = geoQueryFlavoursUtown.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        flavoursUTown.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration39 = geoQueryFlavoursUtown.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQuerySpinelli  = geoFire.query({
                          center: [1.2964077,  103.7805198],
                          radius: 0.05
                        });

                        var onKeyEnteredRegistration40 = geoQuerySpinelli.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spinelli.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration40 = geoQuerySpinelli.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        spinelli.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration40 = geoQuerySpinelli.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });
                        var geoQuerySpiceTable = geoFire.query({
                          center: [1.3038699, 103.7741271],
                          radius: 0.05
                        });

                        var onKeyEnteredRegistration41 = geoQuerySpiceTable.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spiceTable.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration41 = geoQuerySpiceTable.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        spiceTable.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration41 = geoQuerySpiceTable.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryStarbucksMD11 = geoFire.query({
                          center: [1.2941412, 103.781285],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration42 = geoQueryStarbucksMD11.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksMD11.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration42 = geoQueryStarbucksMD11.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        starbucksMD11.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration42 = geoQueryStarbucksMD11.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });
                        var geoQueryStarbucksYIH = geoFire.query({
                          center: [1.2972787,  103.7724656],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration43 = geoQueryStarbucksYIH.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksYIH.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration43 = geoQueryStarbucksYIH.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        starbucksYIH.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration43 = geoQueryStarbucksYIH.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        var geoQueryUniversityClub = geoFire.query({
                          center: [1.3056346, 103.772908],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration44 = geoQueryUniversityClub.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        universityClub.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration44 = geoQueryUniversityClub.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        universityClub.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration44 = geoQueryUniversityClub.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                        var geoQueryWaaCow = geoFire.query({
                          center: [1.2937922, 103.7729176],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration45 = geoQueryWaaCow.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        waaCow.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration45 = geoQueryWaaCow.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        waaCow.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration = geoQueryWaaCow.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });



                        var geoQueryMcDonald = geoFire.query({
                          center: [1.2984307, 103.7712874],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration46 = geoQueryMcDonald.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                       mcDonald .set(user, location); //adding user here 

                     });

                        var onKeyExitedRegistration46 = geoQueryMcDonald.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        mcDonald.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration46 = geoQueryMcDonald.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });



                        var geoQuerySubWayYIH = geoFire.query({
                          center: [1.2980747, 103.7742972],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration47 = geoQuerySubWayYIH.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayYIH.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration47 = geoQuerySubWayYIH.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        subwayYIH.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration47 = geoQuerySubWayYIH.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });
                        var geoQueryStarbucksUtown = geoFire.query({
                          center: [1.3056609, 103.7727733],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration49 = geoQueryStarbucksUtown.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksUtown.set(user, location); //adding user here 
                      });

                        var onKeyExitedRegistration49 = geoQueryStarbucksUtown.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        starbucksUtown.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration49 = geoQueryStarbucksUtown.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });


                        var geoQuerySubWayUTown = geoFire.query({
                          center: [1.303689, 103.773356],
                          radius: 0.05
                        });
                        var onKeyEnteredRegistration48 = geoQuerySubWayUTown.on("key_entered", function(user, location, distance) {
                        //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayUtown.set(user, location); //adding user here 

                      });

                        var onKeyExitedRegistration48 = geoQuerySubWayUTown.on("key_exited", function(user, location, distance) {
                        //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                        subwayUtown.remove(user).then(function() {
                          //console.log("Provided key has been removed from GeoFire");
                        }, function(error) {
                         //console.log("Error: " + error);
                       });       
                      });
                        var onKeyMovedRegistration48 = geoQuerySubWayUTown.on("key_moved", function(user, location, distance) {
                        //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                      });

                        firebaseUsers.child(authData.uid).set ({
                          forumName : result
                        });
                        console.log("go");
                        $state.go("intro");
                      })
}

}
}).catch(function(error) {
  console.error("ERROR: " + error);
});
}
}

})

.controller('tempCtrl', function($scope, $firebaseObject, $state, $cordovaCamera, $firebaseArray, $ionicPopup) {   

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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {
      console.log($scope.choice)
      console.log(input);
      console.log("there is a comment!");
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
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
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
                  //console.log("done!");
                  $state.go("seeLah");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("bizCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("bizCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah");
                } else {
                  fb.child("food").child("bizCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah");
                }
              })
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
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("bizCanteen").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah");
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
      var time = 20; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      bizPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
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
          //console.log("closeddiff" + difference);
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
      var time = 20; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      fassPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
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
          //console.log("closeddiff" + difference);
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
      var time = 20; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      flavoursPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
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
          //console.log("closeddiff" + difference);
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
      var time = 20; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      flavoursPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
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
          //console.log("closeddiff" + difference);
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
      var time = 20; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      flavoursPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
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
          //console.log("closeddiff" + difference);
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
.controller('macdonaldsFOEContributeCtrl', function($scope, $firebaseObject, $ionicPopup, $state,$firebaseArray, $cordovaCamera) {   

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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("macdonaldsFOE") !== true) {
        $scope.data.macdonaldsFOE = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
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
                  //console.log("done!");
                  $state.go("seeLah8");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("macdonaldsFOE").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah8");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("macdonaldsFOE").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah8");
                } else {
                  fb.child("food").child("macdonaldsFOE").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah8");
                }
              })

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
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
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
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
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
          //console.log("closeddiff" + difference);
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
.controller('subwayYIHContributeCtrl', function($scope, $firebaseObject, $ionicPopup, $state,$firebaseArray, $cordovaCamera) {   

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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("subwayYIH") !== true) {
        $scope.data.subwayYIH = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
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
                  //console.log("done!");
                  $state.go("seeLah9");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("subwayYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah9");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("subwayYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah9");
                } else {
                  fb.child("food").child("subwayYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah9");
                }
              })
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
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
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
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
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
          //console.log("closeddiff" + difference);
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


.controller('subwayUTownContributeCtrl', function($scope, $firebaseObject, $ionicPopup, $state,$firebaseArray, $cordovaCamera) {   
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("subwayUTown") !== true) {
        $scope.data.subwayUTown= [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
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
                  //console.log("done!");
                  $state.go("seeLah12");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("subwayUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah12");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("subwayUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah12");
                } else {
                  fb.child("food").child("subwayUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah12");
                }
              })
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
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
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
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
          //console.log("closeddiff" + difference);
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
      var time = 20; 
      bizRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      flavoursPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
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
          //console.log("closeddiff" + difference);
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

.controller('foodJunctionContributeCtrl', function($scope, $state, $ionicPopup, $firebaseObject, $firebaseArray, $cordovaCamera) {
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("foodJunction") !== true) {
        $scope.data.alcove = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("foodJunction").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah7");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("foodJunction").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah7");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("foodJunction").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah7");
                } else {
                  fb.child("food").child("foodJunction").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah7");
                }
              })

    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("foodJunction"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("foodJunction").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah7");
              })
  }, function(error){

  })

  } 

})

.controller('seeLah7Ctrl', function($scope, $firebase, $firebaseObject) {
 $scope.filter = function() {
  var bizRef = fb.child("food").child("foodJunction");
  var flavoursPicRef = fb.child("picture").child("foodJunction");
  var currentDate = new Date();
  var currentTime = currentDate.getTime();
  var fifteen = 20;
  var time = 20; 
  bizRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var childTime = childSnapshot.child("time").val();
      var difference = (currentTime - childTime)/(1000 * 60);
      //console.log(difference);
      if (difference > fifteen) {
        childSnapshot.ref().remove();
      }
    })
  })
  flavoursPicRef.on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childTime = childSnapshot.child("time").val();
      var difference = (currentTime - childTime)/(1000 * 60);
      //console.log(difference);
      if (difference > time) {
        childSnapshot.ref().remove();
      }
    })

  })
}
    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("foodJunction");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          //console.log("closeddiff" + difference);
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

.controller('alcoveContributeCtrl', function($scope, $firebaseArray, $firebaseObject, $ionicPopup, $state, $cordovaCamera) {
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
  if ($scope.choice === null) {
    $ionicPopup.alert({
      title: "No Icon selected",
      template: "Please select one of the 4 Icons"
    })
  } else if (input === undefined) {
    $ionicPopup.alert({
      title: "No comment detected",
      template: "Please type in a comment"
    })
  } else {

    if ($scope.data.hasOwnProperty("alcove") !== true) {
      $scope.data.alcove = [];
    }

    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      fbAuth = fb.getAuth();
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value1");
      userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("alcove").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah13");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("alcove").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah13");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("alcove").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah13");
                } else {
                  fb.child("food").child("alcove").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah13");
                }
              })
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
  $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("alcove").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
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
    var time = 20; 
    bizRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    flavoursPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
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
          //console.log("closeddiff" + difference);
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
  $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("butterMyBun").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah14");
              })
  }, function(error){

  })

}


})

.controller('butterMyBunCtrl', function($scope) {

})
//butter my bun contribute page, with storage function
.controller('butterMyBunContributeCtrl', function($scope, $firebaseObject, $state, $ionicPopup, $cordovaCamera, $firebaseArray){
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("butterMyBun") !== true) {
        $scope.data.butterMyBun = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("butterMyBun").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah14");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("butterMyBun").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah14");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("butterMyBun").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah14");
                } else {
                  fb.child("food").child("butterMyBun").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah14");
                }
              })
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
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("butterMyBun").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
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
      var time = 20; 
      butterRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
          if (difference > fifteen) {
            childSnapshot.ref().remove();
          }
        })
      })
      butterPicRef.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(1000 * 60);
          //console.log(difference);
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
          //console.log("closeddiff" + difference);
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

.controller('royalContributeCtrl', function($scope, $state, $firebaseObject, $ionicPopup, $firebaseArray, $cordovaCamera) {
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("royal") !== true) {
        $scope.data.royal = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("royal").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah15");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("royal").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah15");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("royal").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah15");
                } else {
                  fb.child("food").child("royal").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah15");
                }
              })
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("royal"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("royal").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah15");
              })
  }, function(error){

  })

  }
})
.controller('seeLah15Ctrl', function($scope, $firebaseObject, $firebase) {
 $scope.filter = function() {
  var butterRef = fb.child("food").child("royal");
  var butterPicRef = fb.child("picture").child("royal");
  var currentDate = new Date();
  var currentTime = currentDate.getTime();
  var fifteen = 20;
  var time = 20; 
  butterRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var childTime = childSnapshot.child("time").val();
      var difference = (currentTime - childTime)/(1000 * 60);
      //console.log(difference);
      if (difference > fifteen) {
        childSnapshot.ref().remove();
      }
    })
  })
  butterPicRef.on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childTime = childSnapshot.child("time").val();
      var difference = (currentTime - childTime)/(1000 * 60);
      //console.log(difference);
      if (difference > time) {
        childSnapshot.ref().remove();
      }
    })

  })
}

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("royal");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          //console.log("closeddiff" + difference);
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

.controller('humbleOriginsCtrl', function($scope) {

})

.controller('humbleContributeCtrl', function($scope, $state, $ionicPopup, $firebaseObject, $cordovaCamera, $firebaseArray){
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("humble") !== true) {
        $scope.data.humble = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("humble").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah17");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("humble").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah17");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("humble").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah17");
                } else {
                  fb.child("food").child("humble").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah17");
                }
              })
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("humble"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("humble").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah17");
              })
  }, function(error){

  })

  }
})

.controller('seeLah17Ctrl', function($scope, $firebaseObject, $firebase) {

  $scope.filter = function() {
    var butterRef = fb.child("food").child("humble");
    var butterPicRef = fb.child("picture").child("humble");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("humble");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          //console.log("closeddiff" + difference);
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

.controller('hwangSKoreanRestaurantCtrl', function($scope) {

})

.controller('hwangContributeCtrl', function($scope, $state, $ionicPopup, $cordovaCamera, $firebaseArray, $firebaseObject) {
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("hwang") !== true) {
        $scope.data.hwang = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("hwang").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah18");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("hwang").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah18");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("hwang").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah18");
                } else {
                  fb.child("food").child("hwang").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah18");
                }
              })
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("hwang"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("hwang").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah18");
              })
  }, function(error){

  })

  }
})

.controller('seeLah18Ctrl', function($scope, $firebaseObject, $firebase) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("hwang");
    var butterPicRef = fb.child("picture").child("hwang");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("hwang");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          //console.log("closeddiff" + difference);
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

.controller('playtpusFoodbarCtrl', function($scope) {

})

.controller('platypusContributeCtrl', function($scope, $state, $ionicPopup, $firebaseObject, $firebaseArray,$cordovaCamera) {
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
  if ($scope.choice === null) {
    $ionicPopup.alert({
      title: "No Icon selected",
      template: "Please select one of the 4 Icons"
    })
  } else if (input === undefined) {
    $ionicPopup.alert({
      title: "No comment detected",
      template: "Please type in a comment"
    })
  } else {

    if ($scope.data.hasOwnProperty("platypus") !== true) {
      $scope.data.platypus = [];
    }

    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      fbAuth = fb.getAuth();
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value1");
      userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("platypus").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah19");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("platypus").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah19");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("platypus").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah19");
                } else {
                  fb.child("food").child("platypus").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah19");
                }
              })
  }
}
$scope.pictureURL = "http://placehold.it/50x50"; 
$scope.images = [];
var fbAuth = fb.getAuth();
if(fbAuth) {
  var userReference = fb.child("picture/");
  var syncArray = $firebaseArray(userReference.child("platypus"));
  $scope.images = syncArray;
} else {
  $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("platypus").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah19");
              })
  }, function(error){

  })

}
})

.controller('seeLah19Ctrl', function($scope, $firebaseObject, $firebase) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("platypus");
    var butterPicRef = fb.child("picture").child("platypus");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("platypus");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          //console.log("closeddiff" + difference);
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

.controller('reedzCafeCtrl', function($scope) {

})

.controller('reedzContributeCtrl', function($scope, $firebaseObject, $ionicPopup, $state, $firebaseArray, $cordovaCamera) {
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("reedz") !== true) {
        $scope.data.reedz = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("reedz").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah20");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("reedz").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah20");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("reedz").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah20");
                } else {
                  fb.child("food").child("reedz").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah20");
                }
              })
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("reedz"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("reedz").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah20");
              })
  }, function(error){

  })

  }
})


.controller('seeLah20Ctrl', function($scope, $firebaseObject, $firebase) {
 $scope.filter = function() {
  var butterRef = fb.child("food").child("reedz");
  var butterPicRef = fb.child("picture").child("reedz");
  var currentDate = new Date();
  var currentTime = currentDate.getTime();
  var fifteen = 20;
  var time = 20; 
  butterRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var childTime = childSnapshot.child("time").val();
      var difference = (currentTime - childTime)/(1000 * 60);
      //console.log(difference);
      if (difference > fifteen) {
        childSnapshot.ref().remove();
      }
    })
  })
  butterPicRef.on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childTime = childSnapshot.child("time").val();
      var difference = (currentTime - childTime)/(1000 * 60);
      //console.log(difference);
      if (difference > time) {
        childSnapshot.ref().remove();
      }
    })

  })
}

    //Filters list for closed
    $scope.filterClosed = function() {
      var closedRef = fb.child("closed").child("reedz");
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      var oneDay = 1000 * 60 * 60 * 24;
      closedRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childTime = childSnapshot.child("time").val();
          var difference = (currentTime - childTime)/(oneDay);
          //console.log("closeddiff" + difference);
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

.controller('saporeItalianoCtrl', function($scope) {

})

.controller('saporeContributeCtrl', function($scope, $state, $ionicPopup, $firebaseObject, $firebaseArray, $cordovaCamera) {
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("sapore") !== true) {
        $scope.data.sapore = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("sapore").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah21");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("sapore").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah21");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("sapore").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah21");
                } else {
                  fb.child("food").child("sapore").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah21");
                }
              })
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("sapore"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("sapore").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah21");
              })
  }, function(error){

  })

  }
})
.controller('seeLah21Ctrl', function($scope, $firebase, $firebaseObject) {
 $scope.filter = function() {
  var butterRef = fb.child("food").child("sapore");
  var butterPicRef = fb.child("picture").child("sapore");
  var currentDate = new Date();
  var currentTime = currentDate.getTime();
  var fifteen = 20;
  var time = 20; 
  butterRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var childTime = childSnapshot.child("time").val();
      var difference = (currentTime - childTime)/(1000 * 60);
      //console.log(difference);
      if (difference > fifteen) {
        childSnapshot.ref().remove();
      }
    })
  })
  butterPicRef.on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childTime = childSnapshot.child("time").val();
      var difference = (currentTime - childTime)/(1000 * 60);
      //console.log(difference);
      if (difference > time) {
        childSnapshot.ref().remove();
      }
    })

  })
}
   //Filters list for closed
   $scope.filterClosed = function() {
    var closedRef = fb.child("closed").child("sapore");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    closedRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(oneDay);
        //console.log("closeddiff" + difference);
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

.controller('spinelliCtrl', function($scope) {

})

.controller('spinelliMenuCtrl', function($scope) {

})
.controller('spinelliContributeCtrl', function($scope, $state, $ionicPopup, $firebaseObject, $firebaseArray, $cordovaCamera) {
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("spinelli") !== true) {
        $scope.data.spinelli = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("spinelli").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah22");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("spinelli").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah22");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("spinelli").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah22");
                } else {
                  fb.child("food").child("spinelli").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah22");
                }
              })
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("spinelli"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("spinelli").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah22");
              })
  }, function(error){

  })

  }

})
.controller('seeLah22Ctrl', function($scope,$firebase,$firebaseObject) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("spinelli");
    var butterPicRef = fb.child("picture").child("spinelli");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }
   //Filters list for closed
   $scope.filterClosed = function() {
    var closedRef = fb.child("closed").child("spinelli");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    closedRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(oneDay);
        //console.log("closeddiff" + difference);
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

.controller('spiceTableByPinesCtrl', function($scope) {

})

.controller('spiceContributeCtrl', function($scope, $firebaseObject, $ionicPopup, $state, $firebaseArray, $cordovaCamera) {
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
    if ($scope.choice === null) {
      $ionicPopup.alert({
        title: "No Icon selected",
        template: "Please select one of the 4 Icons"
      })
    } else if (input === undefined) {
      $ionicPopup.alert({
        title: "No comment detected",
        template: "Please type in a comment"
      })
    } else {

      if ($scope.data.hasOwnProperty("spice") !== true) {
        $scope.data.spice = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("spice").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah23");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("spice").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah23");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("spice").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah23");
                } else {
                  fb.child("food").child("spice").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah23");
                }
              })
    }
  }
  $scope.pictureURL = "http://placehold.it/50x50"; 
  $scope.images = [];
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("picture/");
    var syncArray = $firebaseArray(userReference.child("spice"));
    $scope.images = syncArray;
  } else {
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("spice").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah23");
              })
  }, function(error){

  })

  }

})
.controller('seeLah23Ctrl', function($scope, $firebaseObject, $firebase) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("spice");
    var butterPicRef = fb.child("picture").child("spice");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }
   //Filters list for closed
   $scope.filterClosed = function() {
    var closedRef = fb.child("closed").child("spice");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    closedRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(oneDay);
        //console.log("closeddiff" + difference);
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

.controller('starbucksMD11Ctrl', function($scope) {

})

.controller('starbucksMD11ContributeCtrl', function($scope, $state, $ionicPopup, $firebaseArray, $firebaseObject, $cordovaCamera) {
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
  if ($scope.choice === null) {
    $ionicPopup.alert({
      title: "No Icon selected",
      template: "Please select one of the 4 Icons"
    })
  } else if (input === undefined) {
    $ionicPopup.alert({
      title: "No comment detected",
      template: "Please type in a comment"
    })
  } else {
    if ($scope.data.hasOwnProperty("starbucksMD11") !== true) {
      $scope.data.starbucksMD11 = [];
    }

    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      fbAuth = fb.getAuth();
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value1");
      userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("starbucksMD11").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah24");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("starbucksMD11").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah24");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("starbucksMD11").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah24");
                } else {
                  fb.child("food").child("starbucksMD11").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah24");
                }
              })
  }
}
$scope.pictureURL = "http://placehold.it/50x50"; 
$scope.images = [];
var fbAuth = fb.getAuth();
if(fbAuth) {
  var userReference = fb.child("picture/");
  var syncArray = $firebaseArray(userReference.child("starbucksMD11"));
  $scope.images = syncArray;
} else {
  $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("starbucksMD11").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah24");
              })
  }, function(error){

  })

}

})

.controller('seeLah24Ctrl', function($scope, $firebase, $firebaseObject) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("starbucksMD11");
    var butterPicRef = fb.child("picture").child("starbucksMD11");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }
   //Filters list for closed
   $scope.filterClosed = function() {
    var closedRef = fb.child("closed").child("starbucksMD11");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    closedRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(oneDay);
        //console.log("closeddiff" + difference);
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

.controller('starbucksYIHCtrl', function($scope) {

})

.controller('starbucksYIHContributeCtrl', function($scope, $firebaseObject, $ionicPopup, $state, $firebaseArray, $cordovaCamera) {
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
  if ($scope.choice === null) {
    $ionicPopup.alert({
      title: "No Icon selected",
      template: "Please select one of the 4 Icons"
    })
  } else if (input === undefined) {
    $ionicPopup.alert({
      title: "No comment detected",
      template: "Please type in a comment"
    })
  } else {

    if ($scope.data.hasOwnProperty("starbucksYIH") !== true) {
      $scope.data.starbucksYIH = [];
    }

    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      fbAuth = fb.getAuth();
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value1");
      userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("starbucksYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah25");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("starbucksYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah25");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("starbucksYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah25");
                } else {
                  fb.child("food").child("starbucksYIH").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah25");
                }
              })
  }
}
$scope.pictureURL = "http://placehold.it/50x50"; 
$scope.images = [];
var fbAuth = fb.getAuth();
if(fbAuth) {
  var userReference = fb.child("picture/");
  var syncArray = $firebaseArray(userReference.child("starbucksYIH"));
  $scope.images = syncArray;
} else {
  $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("starbucksYIH").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah25");
              })
  }, function(error){

  })

}

})

.controller('seeLah25Ctrl', function($scope, $firebase, $firebaseObject) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("starbucksYIH");
    var butterPicRef = fb.child("picture").child("starbucksYIH");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }
   //Filters list for closed
   $scope.filterClosed = function() {
    var closedRef = fb.child("closed").child("starbucksYIH");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    closedRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(oneDay);
        //console.log("closeddiff" + difference);
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

.controller('starbucksUTownCtrl', function($scope) {

})

.controller('starbucksUTownContributeCtrl', function($scope, $firebaseObject, $ionicPopup, $firebaseArray, $state, $cordovaCamera) {
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
  if ($scope.choice === null) {
    $ionicPopup.alert({
      title: "No Icon selected",
      template: "Please select one of the 4 Icons"
    })
  } else if (input === undefined) {
    $ionicPopup.alert({
      title: "No comment detected",
      template: "Please type in a comment"
    })
  } else {

    if ($scope.data.hasOwnProperty("starbucksUTown") !== true) {
      $scope.data.starbucksUTown = [];
    }

    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      fbAuth = fb.getAuth();
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value1");
      userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("starbucksUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah26");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("starbucksUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah26");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("starbucksUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah26");
                } else {
                  fb.child("food").child("starbucksUTown").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah26");
                }
              })
  }
}
$scope.pictureURL = "http://placehold.it/50x50"; 
$scope.images = [];
var fbAuth = fb.getAuth();
if(fbAuth) {
  var userReference = fb.child("picture/");
  var syncArray = $firebaseArray(userReference.child("starbucksUTown"));
  $scope.images = syncArray;
} else {
  $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("starbucksUTown").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah26");
              })
  }, function(error){

  })

}

})

.controller('seeLah26Ctrl', function($scope, $firebase, $firebaseObject) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("starbucksUTown");
    var butterPicRef = fb.child("picture").child("starbucksUTown");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }
   //Filters list for closed
   $scope.filterClosed = function() {
    var closedRef = fb.child("closed").child("starbucksUTown");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    closedRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(oneDay);
        //console.log("closeddiff" + difference);
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

.controller('universityClubCtrl', function($scope) {

})

.controller('uniClubContributeCtrl', function($scope, $state, $ionicPopup, $firebaseArray, $firebaseObject, $cordovaCamera) {
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
  if ($scope.choice === null) {
    $ionicPopup.alert({
      title: "No Icon selected",
      template: "Please select one of the 4 Icons"
    })
  } else if (input === undefined) {
    $ionicPopup.alert({
      title: "No comment detected",
      template: "Please type in a comment"
    })
  } else {

    if ($scope.data.hasOwnProperty("uniClub") !== true) {
      $scope.data.uniClub = [];
    }

    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      fbAuth = fb.getAuth();
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value1");
      userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("uniClub").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah27");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("uniClub").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah27");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("uniClub").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah27");
                } else {
                  fb.child("food").child("uniClub").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah27");
                }
              })
  }
}
$scope.pictureURL = "http://placehold.it/50x50"; 
$scope.images = [];
var fbAuth = fb.getAuth();
if(fbAuth) {
  var userReference = fb.child("picture/");
  var syncArray = $firebaseArray(userReference.child("uniClub"));
  $scope.images = syncArray;
} else {
  $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("uniClub").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah27");
              })
  }, function(error){

  })

}

})
.controller('seeLah27Ctrl', function($scope, $firebase, $firebaseObject) {
  $scope.filter = function() {
    var butterRef = fb.child("food").child("uniClub");
    var butterPicRef = fb.child("picture").child("uniClub");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }
   //Filters list for closed
   $scope.filterClosed = function() {
    var closedRef = fb.child("closed").child("uniClub");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    closedRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(oneDay);
        //console.log("closeddiff" + difference);
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

.controller('waaCowCtrl', function($scope) {

})

.controller('waaContributeCtrl', function($scope, $state, $ionicPopup, $firebaseArray, $firebaseObject, $cordovaCamera) {
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
  if ($scope.choice === null) {
    $ionicPopup.alert({
      title: "No Icon selected",
      template: "Please select one of the 4 Icons"
    })
  } else if (input === undefined) {
    $ionicPopup.alert({
      title: "No comment detected",
      template: "Please type in a comment"
    })
  } else {

    if ($scope.data.hasOwnProperty("waa") !== true) {
      $scope.data.waa = [];
    }

    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      fbAuth = fb.getAuth();
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value1");
      userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
                if ($scope.choice === 4) {
                  fb.child("closed").child("waa").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: $scope.choice,
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah28");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("waa").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah28");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("waa").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah28");
                } else {
                  fb.child("food").child("waa").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah28");
                }
              })
  }
}
$scope.pictureURL = "http://placehold.it/50x50"; 
$scope.images = [];
var fbAuth = fb.getAuth();
if(fbAuth) {
  var userReference = fb.child("picture/");
  var syncArray = $firebaseArray(userReference.child("waa"));
  $scope.images = syncArray;
} else {
  $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
       //var userReference = fb.child("picture/" + fbAuth.uid);
       userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //var syncArray = $firebaseArray(fb.child("picture").child("butterMyBun")); 
                fb.child("picture").child("waa").child(currentTime).set({
                  name: userName, 
                  time: firebaseTime,
                  image: $scope.pictureURL
                });
                ////console.log("done!");
                $state.go("seeLah28");
              })
  }, function(error){

  })

}

})
.controller('seeLah28Ctrl', function($scope, $firebase, $firebaseObject) {

  $scope.filter = function() {
    var butterRef = fb.child("food").child("waa");
    var butterPicRef = fb.child("picture").child("waa");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var fifteen = 20;
    var time = 20; 
    butterRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > fifteen) {
          childSnapshot.ref().remove();
        }
      })
    })
    butterPicRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(1000 * 60);
        //console.log(difference);
        if (difference > time) {
          childSnapshot.ref().remove();
        }
      })

    })
  }
   //Filters list for closed
   $scope.filterClosed = function() {
    var closedRef = fb.child("closed").child("waa");
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    closedRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childTime = childSnapshot.child("time").val();
        var difference = (currentTime - childTime)/(oneDay);
        //console.log("closeddiff" + difference);
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
         ////console.log($scope.position.lat); //for checking purposes
        ////console.log($scope.position.lng);
        $scope.distanceTo = function(restaurant){
          var distance = GreatCircle.distance(restaurant.lat,restaurant.long, $scope.position.lat, $scope.position.lng);
          restaurant.distance = distance;
          distance = distance.toFixed(2);
        ////console.log(distance);
        return distance;
      };
      $scope.colourCode = function(restaurant){
        var fbName = restaurant.fbName; 
        var locationURL = "http://orbital--1202.firebaseio.com/location/" + fbName; 
        ////console.log(locationURL);
        var newref = new Firebase(locationURL);
        newref.once("value", function(snapshot) {
          var num = snapshot.numChildren();
          var maxCap = restaurant.capacity;
          var percentage = num / maxCap;
          //console.log(count);
          if (num <= 1) {
                  //color = 'balanced'; 
                  restaurant.color = color0;
                  restaurant.src = "images/10.png";
                  restaurant.level = "EMPTY";
              restaurant.percent = num * 10; //percentage; 
              //console.log(restaurant.color); 


            } else if (num <= 2) {
              //color = 'energized'; 
              restaurant.color = color0;
              restaurant.src = "images/20.png";
              restaurant.level = "EMPTY    ";
              restaurant.percent = num * 10; //percentage; 
              //console.log(restaurant.color); 
              
            } else if (num <= 3){
              //color = 'assertive'; 
              restaurant.color = color0;                   
              restaurant.src = "images/30.png";
              restaurant.level = "EMPTY";
              restaurant.percent = num * 10; //percentage; 
              //console.log(restaurant.color);

            } else if (num <= 4) {
              restaurant.color = color1;
              restaurant.src = "images/40.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num * 10; //percentage;
              //console.log(restaurant.color);

            } else if (num <= 5) {
              restaurant.color = color1;
              restaurant.src = "images/50.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num * 10; //percentage;
              //console.log(restaurant.color);

            } else if (num <= 6) {
              restaurant.color = color1;
              restaurant.src = "images/60.png";
              restaurant.level = "CROWDED";
              restaurant.percent = num * 10; //percentage;
              //console.log(restaurant.color);

            } else if (num <= 7) {
              restaurant.color = color2;
              restaurant.src = "images/70.png";
              restaurant.level = "PACKED";
              restaurant.percent = num * 10; //percentage;
              //console.log(restaurant.color);

            } else if (num <= 8) {
              restaurant.color = color2;
              restaurant.src = "images/80.png";
              restaurant.level = "PACKED";
              restaurant.percent = num * 10; //percentage;
              //console.log(restaurant.color);

            } else if (num <= 9) {
              restaurant.color = color2;
              restaurant.src = "images/90.png";
              restaurant.level = "PACKED";
              restaurant.percent = num * 10; //percentage;
              //console.log(restaurant.color);

            } else if (num <= 10) {
              restaurant.color = color2;
              restaurant.src = "images/100.png";
              restaurant.level = "PACKED";
              restaurant.percent = num * 10; //percentage;
              //console.log(restaurant.color)
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
                  //console.log(name);
                  //console.log(count);

                if (count < 5) {
                  //color = 'balanced'; 
                  //console.log("< 5"); 
                 restaurant.color = color0;
                 restaurant.src = "images/user-black-close-up-shape.png"; 
                  //console.log(restaurant.color); 


                } else if (count > 5 && count<7) {
                  //console.log("> 5");
                  //color = 'energized'; 
                  restaurant.color = color1;
                  restaurant.src = "images/multiple-users-silhouette.png"; 
                  //console.log(restaurant.color); 
                  
                } else if (count >= 7){
                  //console.log("else");
                  //color = 'assertive'; 
                  restaurant.color = color2;                   
                  restaurant.src = "images/social.png"; 
                  //console.log(restaurant.color); 
                }  
            }
          }) 
        }); */
      }
      $scope.getColor = function(restaurant){
        //console.log(restaurant);
        //console.log(restaurant.color); 
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
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
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
                  //console.log("done!");
                  $state.go("seeLah2");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("fassCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah2");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("fassCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah2");
                } else {
                  fb.child("food").child("fassCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah2");
                }
              })


    } else {
      //console.log("No comments in the box detected");
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
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
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
        $scope.data.flavoursCanteen = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
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
                  //console.log("done!");
                  $state.go("seeLah3");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("flavoursCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah3");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("flavoursCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah3");
                } else {
                  fb.child("food").child("flavoursCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah3");
                }
              })


    } else {
      //console.log("No comments in the box detected");
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
    $state.go("bizCanteen_contribute");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
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
        $scope.data.foeCanteen = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
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
                  //console.log("done!");
                  $state.go("seeLah4");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("foeCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah4");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("foeCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah4");
                } else {
                  fb.child("food").child("foeCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah4");
                }
              })


    } else {
      //console.log("No comments in the box detected");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
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
        $scope.data.koufuFC = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
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
                  //console.log("done!");
                  $state.go("seeLah5");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("koufuFC").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah5");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("koufuFC").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah5");
                } else {
                  fb.child("food").child("koufuFC").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah5");
                }
              })


    } else {
      //console.log("No comments in the box detected");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
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
        $scope.data.sciCanteen = [];
      }

      var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
      userFb.on("value", function(snapshot) {
        fbAuth = fb.getAuth();
        var firebaseTime = Firebase.ServerValue.TIMESTAMP;
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        //console.log(fbAuth.uid + " value1");
        userName = snapshot.child(fbAuth.uid).child("forumName").val();
                ////console.log(userName + " value2");
                
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
                  //console.log("done!");
                  $state.go("seeLah6");
                } else if ($scope.choice === 1) {
                  fb.child("food").child("sciCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/greenhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah6");
                } else if ($scope.choice === 2) {
                  fb.child("food").child("sciCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/orangehuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah6");
                } else {
                  fb.child("food").child("sciCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    option: "images/redhuman.png",
                    time: firebaseTime
                  });
                  //console.log("done!");
                  $state.go("seeLah6");
                }
              })


    } else {
      //console.log("No comments in the box detected");
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
    ////console.log("camera data: " + angular.toJson(data));
    $scope.pictureURL = "data:image/jpeg;base64," + data;
    //alert("Image has been uploaded");
    var userFb = new Firebase("http://orbital--1202.firebaseio.com/Users");
    userFb.on("value", function(snapshot) {
      var firebaseTime = Firebase.ServerValue.TIMESTAMP;
      var currentDate = new Date();
      var currentTime = currentDate.getTime();
      //console.log(fbAuth.uid + " value");
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
            //console.log(currenttime.getTime());
            
            
            locationRef.once("value", function(snapshot) {
              var value = snapshot.child(user).child("time/time").val();
              //console.log("time " + value);              
              var test = value - 3600000;
              var date = new Date(value);
              var month = date.getMonth();
              var hour = date.getHours();
              //console.log("test " + test);
              //console.log("date " + date);
              //console.log("month " + month);
              //console.log("hour " + hour);            
            }); 

            
            var geoQueryBizCanteen = geoFire.query({
              center: [1.2956205, 103.7741585],
              radius: 0.05    
            });
            var location = glocation; 
            var distance = geoQueryBizCanteen.radius(); 

            var onKeyEnteredRegistration1 = geoQueryBizCanteen.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered geoQueryBizCanteen at " + location + " (" + distance + " km from center)");
              bizCanteen.set(user, location);
                     //adding user here 
                   });

            var onKeyExitedRegistration1 = geoQueryBizCanteen.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited geoQueryBizCanteen to " + location + " (" + distance + " km from center)");
              bizCanteen.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration1 = geoQueryBizCanteen.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within geoQueryBizCanteen to " + location + " (" + distance + " km from center)");
            });


            var geoQueryScienceCanteen = geoFire.query({
              center: [1.2966224, 103.7805718],
              radius: 0.05
            });
            var onKeyEnteredRegistration2 = geoQueryScienceCanteen.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    scienceCanteen.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration2 = geoQueryScienceCanteen.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              scienceCanteen.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration2 = geoQueryScienceCanteen.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFOECanteen = geoFire.query({
              center: [1.2983509 , 103.7711677],
              radius: 0.05
            });
            var onKeyEnteredRegistration3 = geoQueryFOECanteen.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foeCanteen.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration3 = geoQueryFOECanteen.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              foeCanteen.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration3 = geoQueryFOECanteen.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryKoufu= geoFire.query({
             center: [1.3038157, 103.7739868],
             radius: 0.05
           });
            var onKeyEnteredRegistration4 = geoQueryKoufu.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    koufu.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration4 = geoQueryKoufu.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              koufu.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration4 = geoQueryKoufu.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFoodJunction = geoFire.query({
              center: [1.2983767, 103.7745437], 
              radius: 0.05
            });
            
            var onKeyEnteredRegistration5 = geoQueryFoodJunction.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foodJunctionYIH.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration5 = geoQueryFoodJunction.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              foodJunctionYIH.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration5 = geoQueryFoodJunction.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryAlcoveAsian = geoFire.query({
              center: [1.3020569, 103.7724088], 
              radius: 0.05
            });
            var onKeyEnteredRegistration6 = geoQueryAlcoveAsian.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    alcoveAsian.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration6 = geoQueryAlcoveAsian.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              alcoveAsian.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration6 = geoQueryAlcoveAsian.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryButterMyBun = geoFire.query({
              center: [1.3047341, 103.7725725], 
              radius: 0.05
            });

            var onKeyEnteredRegistration7 = geoQueryButterMyBun.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    butterMyBun.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration7 = geoQueryButterMyBun.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              butterMyBun.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration7 = geoQueryButterMyBun.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryHumbleOrigins = geoFire.query({
              center: [1.2950642, 103.7689681], 
              radius: 0.05
            });
            var onKeyEnteredRegistration8 = geoQueryHumbleOrigins.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    humbleOrigins.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration8 = geoQueryHumbleOrigins.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              humbleOrigins.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration8 = geoQueryHumbleOrigins.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryTheRoyalsBistroCafe  = geoFire.query({
              center: [ 1.3039084, 103.7741073], 
              radius: 0.05
            });
            var onKeyEnteredRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    royalsBistro.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              royalsBistro.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration9 = geoQueryTheRoyalsBistroCafe.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryHwangKorean = geoFire.query({
              center: [1.3038157, 103.7739868], 
              radius: 0.05
            });   
            var onKeyEnteredRegistration10 = geoQueryHwangKorean.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    hwangKorean.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration10 = geoQueryHwangKorean.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              hwangKorean.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration10 = geoQueryHwangKorean.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryPlatypus = geoFire.query({
              center: [1.2967775, 103.7809592], 
              radius: 0.05
            });  
            var onKeyEnteredRegistration11 = geoQueryPlatypus.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    platypusFood.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration11 = geoQueryPlatypus.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              platypusFood.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration11 = geoQueryPlatypus.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryReedz = geoFire.query({
              center: [1.2925654, 103.7719733], 
              radius: 0.05
            });    
            var onKeyEnteredRegistration12 = geoQueryReedz.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    reedzCafe.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration12 = geoQueryReedz.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              reedzCafe.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration12 = geoQueryReedz.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            
            var geoQuerySaporeItaliano = geoFire.query({
              center: [1.3041097, 103.7740535], 
              radius: 0.05
            });
            var onKeyEnteredRegistration13 = geoQuerySaporeItaliano.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    sapore.set(user, location); //adding user here 
                  });

            var onKeyExitedRegistration13 = geoQuerySaporeItaliano.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              sapore.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });
            });

            var onKeyMovedRegistration13 = geoQuerySaporeItaliano.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryFassCanteen = geoFire.query({
              center: [1.2949143, 103.7717837],
              radius: 0.05
            });
            var onKeyEnteredRegistration14 = geoQueryFassCanteen.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        fassCanteen.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration14 = geoQueryFassCanteen.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              fassCanteen.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration14 = geoQueryFassCanteen.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFlavoursUtown = geoFire.query({
              center: [1.305908,103.774672],
              radius: 0.05
            });

            
            var onKeyEnteredRegistration15 = geoQueryFlavoursUtown.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        flavoursUTown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration15 = geoQueryFlavoursUtown.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              flavoursUTown.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration15 = geoQueryFlavoursUtown.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            
            var geoQuerySpinelli  = geoFire.query({
              center: [1.2964077,  103.7805198],
              radius: 0.05
            });

            var onKeyEnteredRegistration16 = geoQuerySpinelli.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spinelli.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration16 = geoQuerySpinelli.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              spinelli.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration16 = geoQuerySpinelli.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            var geoQuerySpiceTable = geoFire.query({
              center: [1.3038699, 103.7741271],
              radius: 0.05
            });

            var onKeyEnteredRegistration17 = geoQuerySpiceTable.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spiceTable.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration17 = geoQuerySpiceTable.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              spiceTable.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration17 = geoQuerySpiceTable.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryStarbucksMD11 = geoFire.query({
              center: [1.2941412, 103.781285],
              radius: 0.05
            });
            var onKeyEnteredRegistration18 = geoQueryStarbucksMD11.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksMD11.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration18 = geoQueryStarbucksMD11.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksMD11.remove("user").then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration18 = geoQueryStarbucksMD11.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
            var geoQueryStarbucksYIH = geoFire.query({
              center: [1.2972787,  103.7724656],
              radius: 0.05 
            });
            var onKeyEnteredRegistration19 = geoQueryStarbucksYIH.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksYIH.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration19 = geoQueryStarbucksYIH.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksYIH.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration19 = geoQueryStarbucksYIH.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryUniversityClub = geoFire.query({
              center: [1.3056346, 103.772908],
              radius: 0.05 
            });
            var onKeyEnteredRegistration20 = geoQueryUniversityClub.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        universityClub.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration20 = geoQueryUniversityClub.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              universityClub.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration20 = geoQueryUniversityClub.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryWaaCow = geoFire.query({
              center: [1.2937922, 103.7729176],
              radius: 0.05 
            });
            var onKeyEnteredRegistration21 = geoQueryWaaCow.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        waaCow.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration21 = geoQueryWaaCow.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              waaCow.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration21 = geoQueryWaaCow.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });



            var geoQueryMcDonald = geoFire.query({
              center: [1.2984307, 103.7712874],
              radius: 0.05
            });
            var onKeyEnteredRegistration22 = geoQueryMcDonald.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                       mcDonald .set(user, location); //adding user here 

                     });

            var onKeyExitedRegistration22 = geoQueryMcDonald.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              mcDonald.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration22 = geoQueryMcDonald.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });



            var geoQuerySubWayYIH = geoFire.query({
              center: [1.2980747, 103.7742972],
              radius: 0.05 
            });
            var onKeyEnteredRegistration23 = geoQuerySubWayYIH.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayYIH.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration23 = geoQuerySubWayYIH.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              subwayYIH.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration23 = geoQuerySubWayYIH.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryStarbucksUtown = geoFire.query({
              center: [ 1.3056609,103.7727733],
              radius: 0.05
            });
            var onKeyEnteredRegistration50 = geoQueryStarbucksUtown.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksUtown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration50 = geoQueryStarbucksUtown.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              starbucksUtown.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration50 = geoQueryStarbucksUtown.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQuerySubWayUTown = geoFire.query({
              center: [1.303689, 103.773356],
              radius: 0.05
            });
            var onKeyEnteredRegistration24 = geoQuerySubWayUTown.on("key_entered", function(user, location, distance) {
              //console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayUtown.set(user, location); //adding user here 

                      });

            var onKeyExitedRegistration24 = geoQuerySubWayUTown.on("key_exited", function(user, location, distance) {
              //console.log(user + " exited query to " + location + " (" + distance + " km from center)");
              subwayUtown.remove(user).then(function() {
                //console.log("Provided key has been removed from GeoFire");
              }, function(error) {
               //console.log("Error: " + error);
             });       
            });
            var onKeyMovedRegistration24 = geoQuerySubWayUTown.on("key_moved", function(user, location, distance) {
              //console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
          })


.controller('navController', function($scope, $state) {
  $scope.goHome = function() {
    //console.log("click");
    $state.go('yumNUS');
  }
  $scope.hide = function() {
    var currentName = $state.current.name;
    if (currentName ==="yumNUS" || currentName==="bizCanteen_contribute") {
      return false;
      //console.log('false');
    } else {
      return true
      //console.log('true');
    }
  }
})

.controller('aboutUsCtrl', function($scope) {

})

.controller('reportProblemCtrl', function($scope){

})

.controller('introCtrl', function($scope, $state, $ionicSlideBoxDelegate){
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('yumNUS');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})
