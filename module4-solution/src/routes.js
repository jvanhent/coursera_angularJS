(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
            url: '/',
            templateUrl: 'src/menuapp/templates/home.template.html'
        })

        // categories list page
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/menuapp/templates/categories.template.html',
            controller: 'MenuCategoriesController as catCtrl',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        // Item detail
        .state('items', {
            url: '/items/{category}',
            templateUrl: 'src/menuapp/templates/items.template.html',
            controller: 'MenuItemsController as itemCtrl',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.category);
                }]
            }
        });


    }

})();