(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menuController = this;

        menuController.searchText = "";
        menuController.foundItems = MenuSearchService.foundItems;

        menuController.narrowDown = function() {
            MenuSearchService.getMatchedMenuItems(menuController.searchText);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.foundItems = [];



        service.getMatchedMenuItems = function(searchTerm) {
            console.log("searchTerm ", searchTerm);
            var matchFilter = function(term) {
                return function(item) {
                    return item.description.indexOf(searchTerm) >= 0;
                }
            };
            service.getMenuItems().then(function(response) {
                    var filter = matchFilter(searchTerm);
                    console.log("all items", response.data.menu_items);
                    var matched = response.data.menu_items.filter(filter);
                    console.log("matched items for " + searchTerm, matched);
                    //var myRedObjects = $filter('filter')(myObjects, { color: "red" });
                })
                .catch(function(error) {
                    console.log(error);
                })
        };

        service.getMenuItems = function() {
            var response = $http({
                method: "GET",
                url: (ApiBasePath)
            });

            return response;
        }
    }


})();