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
            menuController.items = [];
            menuController.resultText = "";
            menuController.loading = false;

            menuController.narrowDown = function() {
                menuController.loading = true;
                var prom = MenuSearchService.getMatchedMenuItems(menuController.searchText);
                prom.then(function(response) {
                        console.log("narrowDown : ", response);
                        menuController.items = response;
                        if (!menuController.data) {
                            menuController.resultText = "Nothing found";
                        } else {
                            menuController.resultText = "";
                        }
                        menuController.loading = false;
                    })
                    .catch(function(error) {
                        console.log(error);
                        menuController.resultText = "Error: " + error;
                    })
            }
        }

        MenuSearchService.$inject = ['$http', 'ApiBasePath']

        function MenuSearchService($http, ApiBasePath) {
            var service = this;

            var filterResponse = function(searchTerm) {
                var matchFilter = function(item) {
                    return item.description.indexOf(searchTerm) >= 0;
                }

                return function(response) {
                    return response.data.menu_items.filter(matchFilter);
                };
            }

            service.getMatchedMenuItems = function(searchTerm) {
                console.log("searchTerm ", searchTerm);
                return $http.get(ApiBasePath).then(filterResponse(searchTerm));
            }

        }

    }

)();