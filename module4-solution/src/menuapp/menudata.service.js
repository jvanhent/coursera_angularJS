(function() {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('CategoriesPath', "https://davids-restaurant.herokuapp.com/categories.json")
        .constant('ItemsPath', "https://davids-restaurant.herokuapp.com/menu_items.json");


    MenuDataService.$inject = ['CategoriesPath', 'ItemsPath', '$http']

    function MenuDataService(CategoriesPath, ItemsPath, $http) {
        var service = this;

        service.getAllCategories = function() {
            return $http.get(CategoriesPath);
        };

        service.getItemsForCategory = function(categoryShortName) {
            return $http.get(ItemsPath, { params: { 'category': categoryShortName } });
        };
    }

})();