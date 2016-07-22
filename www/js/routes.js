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

  .state('bizCanteenStalls', {
    url: '/biz_canteen_stalls',
    templateUrl: 'templates/bizCanteenStalls.html',
    controller: 'bizCanteenStallsCtrl'
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
  .state('fassCanteenStalls', {
    url: '/fass_canteen_stalls',
    templateUrl: 'templates/fassCanteenStalls.html',
    controller: 'fassCanteenStallsCtrl'
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
  .state('flavoursUTownStalls', {
    url: '/flavours_stalls',
    templateUrl: 'templates/flavoursUTownStalls.html',
    controller: 'flavoursUTownStallsCtrl'
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

  .state('fOECanteenStalls', {
    url: '/foe_canteen_stalls',
    templateUrl: 'templates/fOECanteenStalls.html',
    controller: 'fOECanteenStallsCtrl'
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

  .state('scienceCanteenStalls', {
    url: '/science_canteen_stalls',
    templateUrl: 'templates/scienceCanteenStalls.html',
    controller: 'scienceCanteenStallsCtrl'
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

  .state('yIHFoodJunctionStalls', {
    url: '/yih_food_junction_stalls',
    templateUrl: 'templates/yIHFoodJunctionStalls.html',
    controller: 'yIHFoodJunctionStallsCtrl'
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
  .state('butterMyBunContribute', {
    url: '/butter_my_bun_contribute',
    templateUrl: 'templates/butterMyBunContribute.html',
    controller: 'butterMyBunContributeCtrl'
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

  .state('FassContribute', {
    url: '/Fass_contribute',
    templateUrl: 'templates/Fass_Contribute.html',
    controller: 'FassContributeCtrl'
  })

  .state('FlavoursContribute', {
    url: '/Flavours_contribute',
    templateUrl: 'templates/Flavours_Contribute.html',
    controller: 'FlavoursContributeCtrl'
  })
  .state('macdonaldsFOEContribute', {
    url: '/macdonalds_foe_contribute',
    templateUrl: 'templates/macdonaldsFoeContribute.html',
    controller: 'macdonaldsFOEContributeCtrl'
  })
  .state('subwayYIHContribute', {
    url: 'subwayYIH_Contribute',
    templateUrl: 'templates/subwayYIHContribute.html',
    controller: 'subwayYIHContributeCtrl'
  })
  .state('subwayUTownContribute', {
    url: 'subwayUTown_Contribute',
    templateUrl: 'templates/subwayUTownContribute.html',
    controller: 'subwayUTownContributeCtrl'
  })
  .state('FoeContribute', {
    url: '/Foe_Contribute',
    templateUrl: 'templates/Foe_Contribute.html',
    controller: 'FoeContributeCtrl'
  })
  
  .state('KoufuContribute', {
    url: '/Koufu_Contribute',
    templateUrl: 'templates/Koufu_Contribute.html',
    controller: 'KoufuContributeCtrl'
  })

  .state('ScienceContribute', {
    url: '/Science_Contribute',
    templateUrl: 'templates/Science_Contribute.html',
    controller: 'ScienceContributeCtrl'
  })  
  .state('alcoveContribute', {
    url: '/alcove_Contribute',
    templateUrl: 'templates/alcoveContribute.html',
    controller: 'alcoveContributeCtrl'
  })

  .state('humbleContribute', {
    url: '/humble_Contribute',
    templateUrl: 'templates/humbleContribute.html',
    controller: 'humbleContributeCtrl'
  })
  .state('hwangContribute', {
    url: '/hwang_Contribute',
    templateUrl: 'templates/hwangContribute.html',
    controller: 'hwangContributeCtrl'
  })
  .state('royalContribute', {
    url: '/royal_Contribute',
    templateUrl: 'templates/royalContribute.html',
    controller: 'royalContributeCtrl'
  })
    .state('platypusContribute', {
    url: '/platypus_Contribute',
    templateUrl: 'templates/platypusContribute.html',
    controller: 'platypusContributeCtrl'
  })
    .state('reedzContribute', {
    url: '/reedz_Contribute',
    templateUrl: 'templates/reedzContribute.html',
    controller: 'reedzContributeCtrl'
  })
    .state('saporeContribute', {
    url: '/sapore_Contribute',
    templateUrl: 'templates/saporeContribute.html',
    controller: 'saporeContributeCtrl'
  })

  .state('spinelliContribute', {
    url: '/spinelli_Contribute',
    templateUrl: 'templates/spinelliContribute.html',
    controller: 'spinelliContributeCtrl'
  })

  .state('spiceContribute', {
    url: '/spice_Contribute',
    templateUrl: 'templates/spiceContribute.html',
    controller: 'spiceContributeCtrl'
  })
  

  .state('starbucksMD11Contribute', {
    url: '/starbucks_MD11_Contribute',
    templateUrl: 'templates/starbucksMD11Contribute.html',
    controller: 'starbucksMD11ContributeCtrl'
  })
  

  .state('starbucksUTownContribute', {
    url: '/starbucks_UTown_Contribute',
    templateUrl: 'templates/starbucksUTownContribute.html',
    controller: 'starbucksUTownContributeCtrl'
  })
  

  .state('starbucksYIHContribute', {
    url: '/starbucks_YIH_Contribute',
    templateUrl: 'templates/starbucksYIHContribute.html',
    controller: 'starbucksYIHContributeCtrl'
  })
  

  .state('waaContribute', {
    url: '/waa_Contribute',
    templateUrl: 'templates/waaContribute.html',
    controller: 'waaContributeCtrl'
  })
  

  .state('uniClubContribute', {
    url: '/uni_Club_Contribute',
    templateUrl: 'templates/uniClubContribute.html',
    controller: 'uniClubContributeCtrl'
  })
  

  .state('foodJunctionContribute', {
    url: '/food_Junction_Contribute',
    templateUrl: 'templates/foodJunctionContribute.html',
    controller: 'foodJunctionContributeCtrl'
  })
  
  .state('aboutUs', {
    url: '/aboutUs',
    templateUrl: 'templates/aboutUs.html',
    controller: 'aboutUsCtrl'
  })
  /*.state('reportProblem', {
    url: '/reportProblem',
    templateUrl: 'templates/reportProblem.html',
    controller: 'reportProblemCtrl'
  })*/

  $urlRouterProvider.otherwise('/biz_canteen_contribute')

  

});