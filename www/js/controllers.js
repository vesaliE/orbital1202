angular.module('app.controllers', [])
  
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
   
.controller('seeLahCtrl', function($scope) {

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
.controller('GeoCtrl', function($scope, geoLocation) {
	//var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $scope.glocation = function (){
    	return	geoLocation.getGeolocation();
   };
 })  

                
         
   /*
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat  = position.coords.latitude
      $scope.long = position.coords.longitude
      console.log(lat + " " + long);
    }, function(err) {
      // error
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    });


  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
  });


  watch.clearWatch();
  // OR
  $cordovaGeolocation.clearWatch(watch)
    .then(function(result) {
      // success
      }, function (error) {
      // error
    });
    */


 