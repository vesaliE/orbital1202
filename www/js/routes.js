angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('yumNUS', {
    url: '/page1',
    templateUrl: 'templates/yumNUS.html',
    controller: 'yumNUSCtrl'
  })

  .state('chooseCafe', {
    url: '/choose_cafe',
    templateUrl: 'templates/chooseCafe.html',
    controller: 'chooseCafeCtrl'
  })

  .state('checkFastfoods', {
    url: '/check_fastfood',
    templateUrl: 'templates/checkFastfoods.html',
    controller: 'checkFastfoodsCtrl'
  })

  .state('chooseCanteen', {
    url: '/choose_canteen',
    templateUrl: 'templates/chooseCanteen.html',
    controller: 'chooseCanteenCtrl'
  })

  .state('bizCanteen', {
    url: '/biz_canteen',
    templateUrl: 'templates/bizCanteen.html',
    controller: 'bizCanteenCtrl'
  })

  .state('bizCanteen_contribute', {
    url: '/biz_canteen_contribute',
    templateUrl: 'templates/bizCanteen_contribute.html',
    controller: 'bizCanteen_contributeCtrl'
  })

  .state('temp', {
    url: '/temp',
    templateUrl: 'templates/temp.html',
    controller: 'tempCtrl'
  })

  .state('seeLah', {
    url: '/biz_canteen_sl',
    templateUrl: 'templates/seeLah.html',
    controller: 'seeLahCtrl'
  })

  .state('showNearBy', {
    url: '/show_near_by',
    templateUrl: 'templates/showNearBy.html',
    controller: 'restaurantlistController'
  })

  .state('fassCanteen', {
    url: '/fass_canteen',
    templateUrl: 'templates/fassCanteen.html',
    controller: 'fassCanteenCtrl'
  })

  .state('seeLah2', {
    url: '/fass_canteen_sl',
    templateUrl: 'templates/seeLah2.html',
    controller: 'seeLah2Ctrl'
  })

  .state('flavoursUTown', {
    url: '/flavours',
    templateUrl: 'templates/flavoursUTown.html',
    controller: 'flavoursUTownCtrl'
  })

  .state('seeLah3', {
    url: '/flavours_sl',
    templateUrl: 'templates/seeLah3.html',
    controller: 'seeLah3Ctrl'
  })

  .state('fOECanteen', {
    url: '/foe_canteen',
    templateUrl: 'templates/fOECanteen.html',
    controller: 'fOECanteenCtrl'
  })

  .state('seeLah4', {
    url: '/foe_canteen_sl',
    templateUrl: 'templates/seeLah4.html',
    controller: 'seeLah4Ctrl'
  })

  .state('koufuFoodcourt', {
    url: '/koufu_foodcourt',
    templateUrl: 'templates/koufuFoodcourt.html',
    controller: 'koufuFoodcourtCtrl'
  })

  .state('seeLah5', {
    url: '/koufu_foodcourt_sl',
    templateUrl: 'templates/seeLah5.html',
    controller: 'seeLah5Ctrl'
  })
    .state('koufuStall', {
    url: '/koufu_stall',
    templateUrl: 'templates/koufuStall.html',
    controller: 'koufuStallCtrl'
  })

  .state('scienceCanteen', {
    url: '/science_canteen',
    templateUrl: 'templates/scienceCanteen.html',
    controller: 'scienceCanteenCtrl'
  })

  .state('seeLah6', {
    url: '/science_canteen_sl',
    templateUrl: 'templates/seeLah6.html',
    controller: 'seeLah6Ctrl'
  })

  .state('yIHFoodJunction', {
    url: '/yih_food_junction',
    templateUrl: 'templates/yIHFoodJunction.html',
    controller: 'yIHFoodJunctionCtrl'
  })

  .state('seeLah7', {
    url: '/yih_food_junction_sl',
    templateUrl: 'templates/seeLah7.html',
    controller: 'seeLah7Ctrl'
  })

  .state('macdonaldsFOE', {
    url: '/macdonalds_foe',
    templateUrl: 'templates/macdonaldsFOE.html',
    controller: 'macdonaldsFOECtrl'
  })

  .state('seeLah8', {
    url: '/macdonalds_foe_sl',
    templateUrl: 'templates/seeLah8.html',
    controller: 'seeLah8Ctrl'
  })

  .state('subwayYIH', {
    url: '/subway_yih',
    templateUrl: 'templates/subwayYIH.html',
    controller: 'subwayYIHCtrl'
  })

  .state('seeLah9', {
    url: '/subway_yih_sl',
    templateUrl: 'templates/seeLah9.html',
    controller: 'seeLah9Ctrl'
  })

  

  .state('subwayUTown', {
    url: '/subway_utown',
    templateUrl: 'templates/subwayUTown.html',
    controller: 'subwayUTownCtrl'
  })

  .state('seeLah12', {
    url: '/subway_utown_sl',
    templateUrl: 'templates/seeLah12.html',
    controller: 'seeLah12Ctrl'
  })

  .state('seeLah13', {
    url: '/alcove_asian_restaurant_bar_sl',
    templateUrl: 'templates/seeLah13.html',
    controller: 'seeLah13Ctrl'
  })

  .state('alcoveAsianRestaurantBar', {
    url: '/alcove_asian_restaurant_bar',
    templateUrl: 'templates/alcoveAsianRestaurantBar.html',
    controller: 'alcoveAsianRestaurantBarCtrl'
  })


  .state('humbleOrigins', {
    url: '/humble_origins',
    templateUrl: 'templates/humbleOrigins.html',
    controller: 'humbleOriginsCtrl'
  })

  .state('seeLah17', {
    url: '/humble_origins_sl',
    templateUrl: 'templates/seeLah17.html',
    controller: 'seeLah17Ctrl'
  })

  .state('hwangSKoreanRestaurant', {
    url: '/hwang_korean_restaurant',
    templateUrl: 'templates/hwangSKoreanRestaurant.html',
    controller: 'hwangSKoreanRestaurantCtrl'
  })

  .state('seeLah18', {
    url: '/hwang_korean_restaurant_sl ',
    templateUrl: 'templates/seeLah18.html',
    controller: 'seeLah18Ctrl'
  })

  .state('playtpusFoodbar', {
    url: '/platypus_foodbar',
    templateUrl: 'templates/playtpusFoodbar.html',
    controller: 'playtpusFoodbarCtrl'
  })

  .state('seeLah19', {
    url: '/platypus_foodbar_sl',
    templateUrl: 'templates/seeLah19.html',
    controller: 'seeLah19Ctrl'
  })

  .state('reedzCafe', {
    url: '/reedz_cafe',
    templateUrl: 'templates/reedzCafe.html',
    controller: 'reedzCafeCtrl'
  })

  .state('seeLah20', {
    url: '/reedz_foodbar_sl',
    templateUrl: 'templates/seeLah20.html',
    controller: 'seeLah20Ctrl'
  })

  .state('saporeItaliano', {
    url: '/sapore_italiano',
    templateUrl: 'templates/saporeItaliano.html',
    controller: 'saporeItalianoCtrl'
  })

  .state('seeLah21', {
    url: '/sapore_italiano_sl',
    templateUrl: 'templates/seeLah21.html',
    controller: 'seeLah21Ctrl'
  })

  .state('spinelli', {
    url: '/spinelli',
    templateUrl: 'templates/spinelli.html',
    controller: 'spinelliCtrl'
  })


  .state('spinelliMenu', {
    url: '/spinelli_Menu',
    templateUrl: 'templates/spinelliMenu.html',
    controller: 'spinelliMenuCtrl'
  })

  .state('seeLah22', {
    url: '/spinelli_sl',
    templateUrl: 'templates/seeLah22.html',
    controller: 'seeLah22Ctrl'
  })

  .state('spiceTableByPines', {
    url: '/spice_table_by_pines',
    templateUrl: 'templates/spiceTableByPines.html',
    controller: 'spiceTableByPinesCtrl'
  })

  .state('seeLah23', {
    url: '/spice_table_by_pines_sl',
    templateUrl: 'templates/seeLah23.html',
    controller: 'seeLah23Ctrl'
  })

  .state('starbucksMD11', {
    url: '/starbucks_md11',
    templateUrl: 'templates/starbucksMD11.html',
    controller: 'starbucksMD11Ctrl'
  })

  .state('seeLah24', {
    url: '/starbucks_md11_sl',
    templateUrl: 'templates/seeLah24.html',
    controller: 'seeLah24Ctrl'
  })

  .state('starbucksYIH', {
    url: '/starbucks_yih',
    templateUrl: 'templates/starbucksYIH.html',
    controller: 'starbucksYIHCtrl'
  })

  .state('seeLah25', {
    url: '/starbucks_yih_sl',
    templateUrl: 'templates/seeLah25.html',
    controller: 'seeLah25Ctrl'
  })

  .state('starbucksUTown', {
    url: '/starbucks_utown',
    templateUrl: 'templates/starbucksUTown.html',
    controller: 'starbucksUTownCtrl'
  })

  .state('seeLah26', {
    url: '/starbucks_utown_sl',
    templateUrl: 'templates/seeLah26.html',
    controller: 'seeLah26Ctrl'
  })

  .state('universityClub', {
    url: '/university_club',
    templateUrl: 'templates/universityClub.html',
    controller: 'universityClubCtrl'
  })

  .state('seeLah27', {
    url: '/university_club_sl',
    templateUrl: 'templates/seeLah27.html',
    controller: 'seeLah27Ctrl'
  })

  .state('waaCow', {
    url: '/waa_cow',
    templateUrl: 'templates/waaCow.html',
    controller: 'waaCowCtrl'
  })

  .state('seeLah28', {
    url: '/waa_cow_sl ',
    templateUrl: 'templates/seeLah28.html',
    controller: 'seeLah28Ctrl'
  })

  .state('page', {
    url: '/page62',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

 

  .state('butterMyBun', {
    url: '/butter_my_bun',
    templateUrl: 'templates/butterMyBun.html',
    controller: 'butterMyBunCtrl'
  })

  .state('seeLah14', {
    url: '/butter_my_bun_sl',
    templateUrl: 'templates/seeLah14.html',
    controller: 'seeLah14Ctrl'
  })
   .state('butterMyBunMenu', {
    url: '/butter_my_bun_menu',
    templateUrl: 'templates/butterMyBunMenu.html',
    controller: 'butterMyBunMenuCtrl'
  })
  .state('theRoyalsBistroCafe', {
    url: '/the_royals_bistro_cafe',
    templateUrl: 'templates/theRoyalsBistroCafe.html',
    controller: 'theRoyalsBistroCafeCtrl'
  })
  
  .state('seeLah15', {
    url: '/the_royals_bistro_cafe_sl',
    templateUrl: 'templates/seeLah15.html',
    controller: 'seeLah15Ctrl'
  })

$urlRouterProvider.otherwise('/biz_canteen_contribute')

  

});