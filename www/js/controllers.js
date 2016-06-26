

angular.module('app.controllers', ['firebase', 'app.services','greatCircles'])
  
.controller('yumNUSCtrl', function($scope, geoLocation) {
        /*
         var glocation = geoLocation.getGeolocation();
         var user = username.split(".", 2);
         geoFire.set(user[0], [glocation.lat, glocation.lng]).then(function() {
         console.log("Current user " + username + "'s location has been added to GeoFire");
     });
     */ //to be added once login is performed at the start 

})
   
.controller('chooseCafeCtrl', function($scope) {

})
   
.controller('checkFastfoodsCtrl', function($scope) {

})
   
.controller('chooseCanteenCtrl', function($scope, $firebase) {
    var colourBizCanteen = new Firebase("http://orbital--1202.firebaseio.com/location/BIZCanteen");
    $scope.red = 'button button-assertive  button-block';
    $scope.orange = 'button button-energized  button-block';
    $scope.color = null;

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
          return $scope.color = 'button button-balanced  button-block';
          
        } else if (count <= 10) {
          console.log("here at else!");
          return $scope.color = 'button button-energized  button-block';
          
        } else {
          return $scope.color = 'button button-assertive  button-block';
        }
      })
    }
})
   
.controller('bizCanteenCtrl', function($scope) {

})

.controller('bizCanteen_contributeCtrl', function($scope, $state, $firebaseAuth, $ionicPopup, $firebaseObject, $firebase, geoLocation) {


    $scope.login = function(username, password){
        var fbAuth = $firebaseAuth(fb);
        return fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            $scope.authData = authData;
            var currentTimestamp = Firebase.ServerValue.TIMESTAMP;

            //User location adding
            var glocation = geoLocation.getGeolocation();
            var user = authData.uid; 
            geoFire.set(user, [glocation.lat, glocation.lng]);
            console.log(user);
            locationRef.child(user).child("time").set({
                        time: currentTimestamp
                    });
            var jstime = new Date(currentTimestamp);
            var formatedtime = jstime.toJSON();
            console.log(jstime);
            
            var geoQueryBizCanteen = geoFire.query({
            center: [1.2956205, 103.7741585],
            radius: 0.5     
            });
            var location = glocation; 
            var distance = geoQueryBizCanteen.radius(); 
            var onKeyEnteredRegistration = geoQueryBizCanteen.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    bizCanteen.set(user, location);                    
            });

            var onKeyExitedRegistration = geoQueryBizCanteen.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                bizCanteen.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryBizCanteen.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryScienceCanteen = geoFire.query({
                    center: [1.2966224, 103.7805718],
                    radius: 0.5
            });
             var onKeyEnteredRegistration = geoQueryScienceCanteen.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    scienceCanteen.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryScienceCanteen.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                scienceCanteen.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryScienceCanteen.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFOECanteen = geoFire.query({
                    center: [1.2983509 , 103.7711677],
                    radius: 0.5
            });
             var onKeyEnteredRegistration = geoQueryFOECanteen.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foeCanteen.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryFOECanteen.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                foeCanteen.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryFOECanteen.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryKoufu= geoFire.query({
                     center: [1.3038157, 103.7739868],
                     radius: 0.5
            });
             var onKeyEnteredRegistration = geoQueryKoufu.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    koufu.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryKoufu.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                koufu.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryKoufu.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFoodJunction = geoFire.query({
                    center: [1.2983767, 103.7745437], 
                    radius: 0.5
            });

             var onKeyEnteredRegistration = geoQueryFoodJunction.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foodJunctionYIH.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryFoodJunction.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                foodJunctionYIH.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryFoodJunction.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

             var geoQueryAlcoveAsian = geoFire.query({
                    center: [1.3020569, 103.7724088], 
                    radius: 0.5
            });
            var onKeyEnteredRegistration = geoQueryAlcoveAsian.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    alcoveAsian.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryAlcoveAsian.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                alcoveAsian.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryAlcoveAsian.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryButterMyBun = geoFire.query({
                    center: [1.3047341, 103.7725725], 
                    radius: 0.5
            });

            var onKeyEnteredRegistration = geoQueryButterMyBun.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    butterMyBun.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryButterMyBun.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                butterMyBun.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryButterMyBun.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryHumbleOrigins = geoFire.query({
                    center: [1.2950642, 103.7689681], 
                    radius: 0.5
            });
             var onKeyEnteredRegistration = geoQueryHumbleOrigins.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    humbleOrigins.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryHumbleOrigins.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                humbleOrigins.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryHumbleOrigins.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryTheRoyalsBistroCafe  = geoFire.query({
                    center: [ 1.3039084, 103.7741073], 
                    radius: 0.5
            });
             var onKeyEnteredRegistration = geoQueryTheRoyalsBistroCafe.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    royalsBistro.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryTheRoyalsBistroCafe.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                royalsBistro.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryTheRoyalsBistroCafe.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryHwangKorean = geoFire.query({
                    center: [1.3038157, 103.7739868], 
                    radius: 0.5
            });   
             var onKeyEnteredRegistration = geoQueryHwangKorean.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    hwangKorean.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryHwangKorean.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                hwangKorean.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryHwangKorean.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryPlatypus = geoFire.query({
                    center: [1.2967775, 103.7809592], 
                    radius: 0.5
            });  
             var onKeyEnteredRegistration = geoQueryPlatypus.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    platypusFood.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryPlatypus.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                platypusFood.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryPlatypus.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryReedz = geoFire.query({
                    center: [1.2925654, 103.7719733], 
                    radius: 0.5
            });    
             var onKeyEnteredRegistration = geoQueryReedz.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    reedzCafe.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryReedz.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                reedzCafe.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryReedz.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
 
            var geoQuerySaporeItaliano = geoFire.query({
                    center: [1.3041097, 103.7740535], 
                    radius: 0.5
            });
             var onKeyEnteredRegistration = geoQuerySaporeItaliano.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    sapore.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQuerySaporeItaliano.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                sapore.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQuerySaporeItaliano.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryFassCanteen = geoFire.query({
                        center: [1.2949143, 103.7717837],
                        radius: 0.5
            });

        var location2 = geoQueryFassCanteen.center(); 
        var onKeyEnteredRegistration = geoQueryFassCanteen.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        fassCanteen.set(user, location); //adding user here 

            });

                var onKeyExitedRegistration = geoQueryFassCanteen.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    fassCanteen.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryFassCanteen.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });

                 var geoQueryFlavoursUtown = geoFire.query({
                                center: [1.3048615, 103.7724473],
                                radius: 0.5
                });

                var location3 = geoQueryFlavoursUtown.center(); 
                var onKeyEnteredRegistration = geoQueryFlavoursUtown.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        flavoursUTown.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryFlavoursUtown.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    flavoursUTown.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryFlavoursUtown.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });
                
                var geoQuerySpinelli  = geoFire.query({
                                center: [1.2964077,  103.7805198],
                                radius: 0.5
                });

                var onKeyEnteredRegistration = geoQuerySpinelli.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spinelli.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQuerySpinelli.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    spinelli.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQuerySpinelli.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });
                 var geoQuerySpiceTable = geoFire.query({
                                center: [1.3038699, 103.7741271],
                                radius: 0.5
                });

                var onKeyEnteredRegistration = geoQuerySpiceTable.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spiceTable.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQuerySpiceTable.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    spiceTable.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQuerySpiceTable.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });

                var geoQueryStarbucksMD11 = geoFire.query({
                                center: [1.2941412, 103.781285],
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQueryStarbucksMD11.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksMD11.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryStarbucksMD11.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    starbucksMD11.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryStarbucksMD11.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });
                var geoQueryStarbucksYIH = geoFire.query({
                                center: [1.2972787,  103.7724656],
                                radius: 0.5 
                });
                var onKeyEnteredRegistration = geoQueryStarbucksYIH.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksYIH.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryStarbucksYIH.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    starbucksYIH.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryStarbucksYIH.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });

                var geoQueryUniversityClub = geoFire.query({
                                center: [1.3056346, 103.772908],
                                radius: 0.5 
                });
                var onKeyEnteredRegistration = geoQueryUniversityClub.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        universityClub.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryUniversityClub.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    universityClub.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryUniversityClub.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });


                var geoQueryWaaCow = geoFire.query({
                                center: [1.2937922, 103.7729176],
                                radius: 0.5 
                });
                var onKeyEnteredRegistration = geoQueryWaaCow.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        waaCow.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryWaaCow.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    waaCow.remove("user").then(function() {
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
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQueryMcDonald.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                       mcDonald .set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryMcDonald.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    mcDonald.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryMcDonald.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });



                 var geoQuerySubWayYIH = geoFire.query({
                                center: [1.2980747, 103.7742972],
                                radius: 0.5 
                });
                var onKeyEnteredRegistration = geoQuerySubWayYIH.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayYIH.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQuerySubWayYIH.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    subwayYIH.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQuerySubWayYIH.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });



                 var geoQuerySubWayUTown = geoFire.query({
                                center: [1.303689, 103.773356],
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQuerySubWayUTown.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayUtown.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQuerySubWayUTown.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    subwayUtown.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQuerySubWayUTown.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });

            $state.go("temp");
            $state.go("yumNUS");

        }).catch(function(error) {
            console.error("ERROR: " + error);
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
                        //Setting up the scope for firebase
                        /*
                        if ($scope.data.hasOwnProperty("forumNames") !== true) {
                            $scope.data.forumNames = [];
                        }
                        $scope.data.forumNames.push({
                            forumName : result,
                            userID : authData.uid
                        }), 
                        */
                        var glocation = geoLocation.getGeolocation();
                        var user = authData.uid; 
                        geoFire.set(user, [glocation.lat, glocation.lng]); 
                        var geoQueryBizCanteen = geoFire.query({
                                center: [1.2956205, 103.7741585],
                                radius: 0.5
                        });
                        var location = glocation; 
                        var distance = geoQueryBizCanteen.radius(); 
                        var onKeyEnteredRegistration = geoQueryBizCanteen.on("key_entered", function(user, location, distance) {
                            console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                            bizCanteen.set(user, location); //adding user here 

                        });

                        var onKeyExitedRegistration = geoQueryBizCanteen.on("key_exited", function(user, location, distance) {
                            console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                            bizCanteen.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
                        });

                        var onKeyMovedRegistration = geoQueryBizCanteen.on("key_moved", function(user, location, distance) {
                            console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                        });


                        var geoQueryScienceCanteen = geoFire.query({
                            center: [1.2966224, 103.7805718],
                            radius: 0.5
                        });
             var onKeyEnteredRegistration = geoQueryScienceCanteen.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    scienceCanteen.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryScienceCanteen.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                scienceCanteen.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryScienceCanteen.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFOECanteen = geoFire.query({
                    center: [1.2983509 , 103.7711677],
                    radius: 0.5
            });
             var onKeyEnteredRegistration = geoQueryFOECanteen.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foeCanteen.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryFOECanteen.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                foeCanteen.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryFOECanteen.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryKoufu= geoFire.query({
                     center: [1.3038157, 103.7739868],
                     radius: 0.5
            });
             var onKeyEnteredRegistration = geoQueryKoufu.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    koufu.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryKoufu.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                koufu.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryKoufu.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryFoodJunction = geoFire.query({
                    center: [1.2983767, 103.7745437], 
                    radius: 0.5     
            });

             var onKeyEnteredRegistration = geoQueryFoodJunction.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    foodJunctionYIH.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryFoodJunction.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                foodJunctionYIH.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryFoodJunction.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

             var geoQueryAlcoveAsian = geoFire.query({
                    center: [1.3020569, 103.7724088], 
                    radius: 0.5
            });
            var onKeyEnteredRegistration = geoQueryAlcoveAsian.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    alcoveAsian.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryAlcoveAsian.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                alcoveAsian.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryAlcoveAsian.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryButterMyBun = geoFire.query({
                    center: [1.3047341, 103.7725725], 
                    radius: 0.5
            });

            var onKeyEnteredRegistration = geoQueryButterMyBun.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    butterMyBun.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryButterMyBun.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                butterMyBun.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryButterMyBun.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryHumbleOrigins = geoFire.query({
                    center: [1.2950642, 103.7689681], 
                    radius: 0.5
            });
             var onKeyEnteredRegistration = geoQueryHumbleOrigins.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    humbleOrigins.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryHumbleOrigins.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                humbleOrigins.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryHumbleOrigins.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryTheRoyalsBistroCafe  = geoFire.query({
                    center: [ 1.3039084, 103.7741073], 
                    radius: 0.5
            });
             var onKeyEnteredRegistration = geoQueryTheRoyalsBistroCafe.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    royalsBistro.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryTheRoyalsBistroCafe.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                royalsBistro.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryTheRoyalsBistroCafe.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryHwangKorean = geoFire.query({
                    center: [1.3038157, 103.7739868], 
                    radius: 0.5
            });   
             var onKeyEnteredRegistration = geoQueryHwangKorean.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    hwangKorean.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryHwangKorean.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                hwangKorean.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryHwangKorean.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });

            var geoQueryPlatypus = geoFire.query({
                    center: [1.2967775, 103.7809592], 
                    radius: 0.5
            });  
             var onKeyEnteredRegistration = geoQueryPlatypus.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    platypusFood.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryPlatypus.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                platypusFood.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryPlatypus.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryReedz = geoFire.query({
                    center: [1.2925654, 103.7719733], 
                    radius: 0.5
            });    
             var onKeyEnteredRegistration = geoQueryReedz.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    reedzCafe.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQueryReedz.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                reedzCafe.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQueryReedz.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });
 
            var geoQuerySaporeItaliano = geoFire.query({
                    center: [1.3041097, 103.7740535], 
                    radius: 0.5
            });
             var onKeyEnteredRegistration = geoQuerySaporeItaliano.on("key_entered", function(user, location, distance) {
                    console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                    sapore.set(user, location); //adding user here 
            });

            var onKeyExitedRegistration = geoQuerySaporeItaliano.on("key_exited", function(user, location, distance) {
                console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                sapore.remove("user").then(function() {
                            console.log("Provided key has been removed from GeoFire");
                            }, function(error) {
                                 console.log("Error: " + error);
                            });
             });

            var onKeyMovedRegistration = geoQuerySaporeItaliano.on("key_moved", function(user, location, distance) {
                console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
            });


            var geoQueryFassCanteen = geoFire.query({
                        center: [1.2949143, 103.7717837],
                        radius: 0.5
            });

        var location2 = geoQueryFassCanteen.center(); 
        var onKeyEnteredRegistration = geoQueryFassCanteen.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        fassCanteen.set(user, location); //adding user here 

            });

                var onKeyExitedRegistration = geoQueryFassCanteen.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    fassCanteen.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryFassCanteen.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });

                 var geoQueryFlavoursUtown = geoFire.query({
                                center: [1.3048615, 103.7724473],
                                radius: 0.5
                });

                var location3 = geoQueryFlavoursUtown.center(); 
                var onKeyEnteredRegistration = geoQueryFlavoursUtown.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        flavoursUTown.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryFlavoursUtown.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    flavoursUTown.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryFlavoursUtown.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });
                
                var geoQuerySpinelli  = geoFire.query({
                                center: [1.2964077,  103.7805198],
                                radius: 0.5
                });

                var onKeyEnteredRegistration = geoQuerySpinelli.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spinelli.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQuerySpinelli.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    spinelli.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQuerySpinelli.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });
                 var geoQuerySpiceTable = geoFire.query({
                                center: [1.3038699, 103.7741271],
                                radius: 0.5
                });

                var onKeyEnteredRegistration = geoQuerySpiceTable.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        spiceTable.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQuerySpiceTable.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    spiceTable.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQuerySpiceTable.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });

                var geoQueryStarbucksMD11 = geoFire.query({
                                center: [1.2941412, 103.781285],
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQueryStarbucksMD11.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksMD11.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryStarbucksMD11.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    starbucksMD11.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryStarbucksMD11.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });
                var geoQueryStarbucksYIH = geoFire.query({
                                center: [1.2972787,  103.7724656],
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQueryStarbucksYIH.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        starbucksYIH.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryStarbucksYIH.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    starbucksYIH.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryStarbucksYIH.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });

                var geoQueryUniversityClub = geoFire.query({
                                center: [1.3056346, 103.772908],
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQueryUniversityClub.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        universityClub.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryUniversityClub.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    universityClub.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryUniversityClub.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });


                var geoQueryWaaCow = geoFire.query({
                                center: [1.2937922, 103.7729176],
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQueryWaaCow.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        waaCow.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryWaaCow.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    waaCow.remove("user").then(function() {
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
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQueryMcDonald.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                       mcDonald .set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQueryMcDonald.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    mcDonald.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQueryMcDonald.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });



                 var geoQuerySubWayYIH = geoFire.query({
                                center: [1.2980747, 103.7742972],
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQuerySubWayYIH.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayYIH.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQuerySubWayYIH.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    subwayYIH.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQuerySubWayYIH.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });



                 var geoQuerySubWayUTown = geoFire.query({
                                center: [1.303689, 103.773356],
                                radius: 0.5
                });
                var onKeyEnteredRegistration = geoQuerySubWayUTown.on("key_entered", function(user, location, distance) {
                        console.log(user + " entered query at " + location + " (" + distance + " km from center)");
                        subwayUtown.set(user, location); //adding user here 

                });

                var onKeyExitedRegistration = geoQuerySubWayUTown.on("key_exited", function(user, location, distance) {
                    console.log(user + " exited query to " + location + " (" + distance + " km from center)");
                    subwayUtown.remove("user").then(function() {
                        console.log("Provided key has been removed from GeoFire");
                    }, function(error) {
                             console.log("Error: " + error);
                        });       
                    });
                var onKeyMovedRegistration = geoQuerySubWayUTown.on("key_moved", function(user, location, distance) {
                    console.log(user + " moved within query to " + location + " (" + distance + " km from center)");
                });
                        var firebaseUsers = new Firebase("http://orbital--1202.firebaseio.com/Users");
                        firebaseUsers.child(authData.uid).set ({
                            forumName : result
                        }); 
                        $state.go("temp");
                        

                        }),

                        $state.go("yumNUS");
                    }).catch(function(error) {
                        console.error("ERROR: " + error);
                    });
                }
            })

.controller('tempCtrl', function($scope, $firebaseObject, $state) {   

    $scope.list = function() {
        fbAuth = fb.getAuth();
        if (fbAuth) {
            var syncObject = $firebaseObject(fb.child("food"));
            syncObject.$bindTo($scope, "data");
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
                console.log(fbAuth.uid + " value1");
                userName = snapshot.child(fbAuth.uid).child("forumName").val();
                //console.log(userName + " value2");
                $scope.data.bizCanteen.push({
                    name: userName,
                    comment: input
                });
                $state.go("bizCanteen");
            })


        } else {
            console.log("No comments in the box detected");
        }
    }

}) 
   
.controller('seeLahCtrl', function($scope, $firebaseObject) {
    $scope.list = function() {

        var syncObject = $firebaseObject(fb.child("food"));
        syncObject.$bindTo($scope, "data");
    }
})
   
.controller('suggestionsCtrl', function($scope) {

})
   
.controller('fassCanteenCtrl', function($scope) {

})
   
.controller('seeLah2Ctrl', function($scope) {

})
   
.controller('flavoursUTownCtrl', function($scope) {

})
   
.controller('seeLah3Ctrl', function($scope) {

})
   
.controller('fOECanteenCtrl', function($scope) {

})
   
.controller('seeLah4Ctrl', function($scope) {

})
   
.controller('koufuFoodcourtCtrl', function($scope) {

})
   
.controller('seeLah5Ctrl', function($scope) {

})
   
.controller('scienceCanteenCtrl', function($scope) {

})
   
.controller('seeLah6Ctrl', function($scope) {

})
   
.controller('yIHFoodJunctionCtrl', function($scope) {

})
   
.controller('seeLah7Ctrl', function($scope) {

})
   
.controller('macdonaldsFOECtrl', function($scope) {

})
   
.controller('seeLah8Ctrl', function($scope) {

})
   
.controller('subwayYIHCtrl', function($scope) {

})
   
.controller('seeLah9Ctrl', function($scope) {

})

   
.controller('subwayUTownCtrl', function($scope) {

})
   
.controller('seeLah12Ctrl', function($scope) {

})
   
.controller('seeLah13Ctrl', function($scope) {

})
   
.controller('alcoveAsianRestaurantBarCtrl', function($scope) {

})
   

.controller('butterMyBunCtrl', function($scope) {

})
   
.controller('seeLah14Ctrl', function($scope) {

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
.controller('GeoCtrl', function($scope, geoLocation) {
    //var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $scope.glocation = function (){
        return  geoLocation.getGeolocation();
   };
 })  

.controller('restaurantlistController', function ($scope, $rootScope, foodFactory, geoLocation, GreatCircle) {
        "use strict";
      $scope.restaurantList = foodFactory.getRestaurants(); //call to restaurantfactory
      $scope.position = geoLocation.getGeolocation();
      console.log($scope.position.lat); //for checking purposes
      console.log($scope.position.lng);
      $scope.distanceTo = function(restaurant){
        var distance = GreatCircle.distance(restaurant.lat,restaurant.long, $scope.position.lat, $scope.position.lng);
        restaurant.distance = distance;
        distance = distance.toFixed(2);
        return distance;
    };
    var colourName = new Firebase("http://orbital--1202.firebaseio.com/location/BIZCanteen");
    $scope.red = 'button button-assertive  button-block';
    $scope.orange = 'button button-energized  button-block';
    $scope.color = null;

    $scope.getColor = function() {

      var count = 0;
      colourBizCanteen.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var timestamp = childSnapshot.val();
            console.log(timestamp);
            count++;
          })
        if (count === 0) {
          console.log("here at 0!");
          return $scope.color = 'button button-balanced  button-block';
          
        } else {
          console.log("here at else!");
          return $scope.color = 'button button-energized  button-block';
          
        }
      })
    }






})



 