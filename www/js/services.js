angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('$localStorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])
    .factory('geoLocation', function ($localStorage) {
        return {
            setGeolocation: function (latitude, longitude) {
                var _position = {
                    latitude: latitude,
                    longitude: longitude
                }
                $localStorage.setObject('geoLocation', _position)
            },
            getGeolocation: function () {
                return glocation = {
                    lat: $localStorage.getObject('geoLocation').latitude,
                    lng: $localStorage.getObject('geoLocation').longitude
                }
            }
        }
    })

.factory('foodFactory', function () {
        "use strict";
        var factory = {
            Restaurants : [
                    //canteens 
                    {Name: 'Biz Canteen - The Terrace', venueType: 'Canteen', itemid: 'Canteen001', lat:1.2956205, long: 103.7741585, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'FASS Canteen - The Deck', venueType: 'Canteen ',  itemid: 'Canteen002', lat: 1.2949143, long: 103.7717837, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Flavours @ UTown', venueType: 'Canteen',  itemid: 'Canteen003', lat: 1.3048615, long: 103.7724473, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'FOE Canteen - Techno Edge', venueType: 'Canteen', itemid: 'Canteen004', lat: 1.2983509 , long: 103.7711677, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Koufu Foodcourt', venueType: 'Canteen', itemid: 'Canteen005',lat: 1.3038157, long: 103.7739868 , icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Science Canteen', venueType: 'Canteen ',  itemid: 'Canteen006',  lat: 1.2966224, long: 103.7805718, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Food Junction YIH', venueType: 'Canteen ', itemid: 'Canteen007',lat: 1.2983767, long: 103.7745437, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    //cafes
                    {Name: 'Alcove Asian Restaurant Bar',  venueType: 'Cafe', itemid: 'Cafe001', lat: 1.3020569, long: 103.7724088, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Butter My Bun', venueType: 'Cafe', itemid: 'Cafe014', lat: 1.3047341, long: 103.7725725, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'}, 
                    {Name: 'Humble Origins',  venueType: 'Cafe', itemid: 'Cafe005', lat: 1.2950642, long: 103.7689681,  icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'The Hwang\'s Restaurant University Town ',  venueType: 'Cafe', itemid: 'Cafe006', lat: 1.3038157, long: 103.7739868, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'The Royals Bistro Café ',  venueType: 'Cafe', itemid: 'Cafe013', lat: 1.3039084, long: 103.7741073, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Platypus Food Bar (LT27)',  venueType: 'Cafe', itemid: 'Cafe007', lat: 1.2967775, long: 103.7809592, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Reedz Café NUS Business School',  venueType: 'Cafe', itemid: 'Cafe008', lat: 1.2925654, long: 103.7719733, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Sapore Italiano',  venueType: 'Cafe', itemid: 'Cafe009', lat: 1.3041097, long: 103.7740535, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Spinelli Coffee ',  venueType: 'Cafe', itemid: 'Cafe010', lat: 1.2964077,  long: 103.7805198, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Spice Table by Pines',  venueType: 'Cafe', itemid: 'Cafe011', lat: 1.3038699, long: 103.7741271, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Starbucks (MD11)',  venueType: 'Cafe', itemid: 'Cafe012', lat:  1.2941412, long: 103.781285, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Starbucks @ YIH ',  venueType: 'Cafe', itemid: 'Cafe015', lat: 1.2972787, long: 103.7724656, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'University Club ',  venueType: 'Cafe', itemid: 'Cafe016', lat: 1.3056346, long: 103.772908, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Waa Cow ',  venueType: 'Cafe', itemid: 'Cafe017', lat: 1.2937922, long:103.7729176, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    //fastfood 
                    {Name: 'McDonald\'s Restaurant NUS  ',  venueType: 'Fastfood', itemid: 'fastfood001', lat: 1.2984307, long:103.7712874 , icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Subway @ YIH  ',  venueType: 'Fastfood', itemid: 'fastfood002', lat: 1.2980747, long: 103.7742972, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'},
                    {Name: 'Subway @ Utown  ',  venueType: 'Fastfood', itemid: 'fastfood003', lat: 1.303689, long: 103.773356, icon: 'img/restaurant_pointer_WMcustom_40x49_v3.png'}
            ],
            getRestaurants : function () {
              return factory.Restaurants;
            },
          };
      return factory;
    
    });








