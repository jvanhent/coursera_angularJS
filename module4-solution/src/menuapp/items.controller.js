(function() {
    'use strict';
    angular.module('MenuApp')
        .controller('MenuItemsController', MenuItemsController);

    MenuItemsController.$inject = ['items'];

    function MenuItemsController(items) {
        var itemCtrl = this;
        itemCtrl.items = items.data.menu_items;
    }


})();