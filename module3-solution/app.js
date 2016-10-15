(function() {
        'use strict';

        angular.module('NarrowItDownApp', [])
            .controller('NarrowItDownController', NarrowItDownController)
            .service('MenuSearchService', MenuSearchService)
            .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
            .directive('itemsLoaderIndicator', ItemsLoaderIndicator)
            .directive('foundItems', FoundItems);

        function FoundItems() {
            var ddo = {
                restrict: "E",
                templateUrl: 'foundItems.html',
                scope: {
                    found: '<foundItems',
                    onRemove: '&'
                }
            };

            return ddo;
        }

        function ItemsLoaderIndicator() {
            var ddo = {
                restrict: "E",
                templateUrl: 'itemsLoaderIndicator.html',
                scope: {
                    loading: '=loading'
                }
            };

            return ddo;
        }

        NarrowItDownController.$inject = ['MenuSearchService'];

        function NarrowItDownController(MenuSearchService) {
            var menuController = this;

            menuController.searchText = "";
            menuController.items = [];
            menuController.resultText = "";
            menuController.loading = false;

            var setResultText = function(text) {
                menuController.loading = false;
                menuController.resultText = text;
            }

            var startSearch = function() {
                menuController.resultText = "";
                menuController.loading = true;
                menuController.items = [];
            }

            var setItems = function(data) {
                menuController.items = data;
                if (!data.length) {
                    setResultText("Nothing found");
                } else {
                    setResultText("");
                }
            }

            menuController.removeItem = function(index) {
                menuController.items.splice(index, 1);
            }

            menuController.narrowDown = function() {
                if (!menuController.searchText) {
                    setResultText("Please enter search term");
                } else {
                    startSearch();
                    var prom = MenuSearchService.getMatchedMenuItems(menuController.searchText);
                    prom.then(function(response) {
                            console.log("narrowDown : ", response);
                            setItems(response);
                        })
                        .catch(function(error) {
                            setResultText("Error: " + error);
                        })
                }
            }
        }

        MenuSearchService.$inject = ['$http', '$filter', 'ApiBasePath']

        function MenuSearchService($http, $filter, ApiBasePath) {
            var service = this;
            var lowCase = $filter('lowercase');

            var filterResponse = function(searchTerm) {
                var matchFilter = function(item) {
                    return lowCase(item.description).indexOf(lowCase(searchTerm)) >= 0;
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