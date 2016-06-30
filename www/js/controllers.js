

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
            center: [1.2956205, 103.7741585],
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
                                center: [1.3048615, 103.7724473],
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
                        geoFire.set(user, [glocation.lat, glocation.lng]); 
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
                                center: [1.3048615, 103.7724473],
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
                fb.child("food").child("bizCanteen").child(currentTime).set({
                    name: userName,
                    comment: input,
                    time: firebaseTime
                });
                console.log("done!");
            })


        } else {
            console.log("No comments in the box detected");
        }
    }

}) 
   
.controller('seeLahCtrl', function($scope, $firebaseObject, $firebase) {

    $scope.filter = function() {
        var bizRef = fb.child("food").child("bizCanteen");
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        var fifteen = 15;
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
    }

    $scope.list = function() {

        var syncObject = $firebaseObject(fb.child("food"));
        syncObject.$bindTo($scope, "data");
    }

    $scope.getTime = function(time) {
        var dateObj = new Date(time);
        var hours = dateObj.getHours();
        var minutes = dateObj.getMinutes();
        return hours + ":" + minutes;
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
/*.controller('GeoCtrl', function($scope, geoLocation) {
    //var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $scope.glocation = function (){
        return  geoLocation.getGeolocation();
   };
 })  
 */

.controller('restaurantlistController', function ($scope, $rootScope, foodFactory, geoLocation, GreatCircle, $firebase) {
      var getColourCode = new Firebase("http://orbital--1202.firebaseio.com/location");
      var count =0; 
      var name = null; 
      var color0 = 'balanced'; 
      var color1 = 'energized'; 
      var color2 = 'assertive'; 

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
        //console.log(fbName);
        getColourCode.endAt("WaaCow").once("value", function(snapshot) {
  // The callback function will only get called once since we return true
            snapshot.forEach(function(childSnapshot) {
                if(childSnapshot.key() === fbName){
                  count = childSnapshot.numChildren();
                  name = childSnapshot.key(); 
                  console.log(name);
                  console.log(count);

                if (count < 5) {
                  //color = 'balanced'; 
                  console.log("< 5"); 
                 restaurant.color = color0; 
                  console.log(restaurant.color); 


                } else if (count > 5 && count<7) {
                console.log("> 5");
                  //color = 'energized'; 
                  restaurant.color = color1;
                        console.log(restaurant.color); 

              
                } else if (count >= 7){
                  console.log("else");
                  //color = 'assertive'; 
                  restaurant.color = color2; 
                  console.log(restaurant.color); 

                }  
            }
          })  
      }); 
    }
    $scope.getColor = function(restaurant){
      console.log(restaurant);
      console.log(restaurant.color); 
      return restaurant.color; 
    }
})



 