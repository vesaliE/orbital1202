

angular.module('app.controllers', ['firebase'])
  
.controller('yumNUSCtrl', function($scope) {

})
   
.controller('chooseCafeCtrl', function($scope) {

})
   
.controller('checkFastfoodsCtrl', function($scope) {

})
   
.controller('chooseCanteenCtrl', function($scope) {

})
   
.controller('bizCanteenCtrl', function($scope) {

})

.controller('bizCanteen_contributeCtrl', function($scope, $state, $firebaseAuth, $ionicPopup, $firebaseObject, $firebase) {


    $scope.login = function(username, password) {
        var fbAuth = $firebaseAuth(fb);
        return fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            $scope.authData = authData;
            $state.go("temp");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
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
                        var firebaseUsers = new Firebase("http://orbital--1202.firebaseio.com/Users");
                        firebaseUsers.child(authData.uid).set ({
                            forumName : result
                        }),

                        $state.go("temp");
                    }).catch(function(error) {
                        console.error("ERROR: " + error);
                    })

                //}
            //}
        })
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
   
.controller('seeLahCtrl', function($scope, $firebaseObject, $firebaseAuth) {
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
   
.controller('subwayFOECtrl', function($scope) {

})
   
.controller('seeLah10Ctrl', function($scope) {

})
   
.controller('subwayScienceCtrl', function($scope) {

})
   
.controller('seeLah11Ctrl', function($scope) {

})
   
.controller('subwayUTownCtrl', function($scope) {

})
   
.controller('seeLah12Ctrl', function($scope) {

})
   
.controller('seeLah13Ctrl', function($scope) {

})
   
.controller('alcoveAsianRestaurantBarCtrl', function($scope) {

})
   
.controller('aRTFoodHouseCtrl', function($scope) {

})
   
.controller('seeLah14Ctrl', function($scope) {

})
   
.controller('fortuneVillageCtrl', function($scope) {

})
   
.controller('seeLah15Ctrl', function($scope) {

})
   
.controller('goodNewsCafeCtrl', function($scope) {

})
   
.controller('seeLah16Ctrl', function($scope) {

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
 