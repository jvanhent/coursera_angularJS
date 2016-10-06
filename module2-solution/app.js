(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListService', ShoppingListService);

    ToBuyController.$inject = ['ShoppingListService'];
    AlreadyBoughtController.$inject = ['ShoppingListService'];

    function ToBuyController(ShoppingListService) {
        var toBuy = this;

        toBuy.items = ShoppingListService.getToBuyItems();
        toBuy.itemName = "";
        toBuy.itemQuantity = "";

        toBuy.addToBuyItem = function() {
            ShoppingListService.addToBuyItem(toBuy.itemName, toBuy.itemQuantity);
        }

        toBuy.removeToBuyItem = function(itemIndex) {
            ShoppingListService.removeToBuyItem(itemIndex);
        };

        toBuy.boughtItem = function(itemIndex) {
            ShoppingListService.boughtItem(itemIndex);
        }
    }

    function AlreadyBoughtController(ShoppingListService) {
        var bought = this;

        bought.items = ShoppingListService.getBoughtItems();

    }


    function ShoppingListService() {
        var service = this;

        // List of shopping items
        var toBuyItems = [
            { name: "cookies", quantity: 10 },
            { name: "bread", quantity: 3 },
            { name: "flowers", quantity: 2 },
            { name: "chairs", quantity: 5 },
            { name: "windows", quantity: 2 },
            { name: "smarties", quantity: 100 },
            { name: "lights", quantity: 4 }
        ];

        var boughtItems = [];

        service.addToBuyItem = function(itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            toBuyItems.push(item);
        };

        service.removeToBuyItem = function(itemIndex) {
            return toBuyItems.splice(itemIndex, 1)[0];
        };

        service.boughtItem = function(itemIndex) {
            var item = service.removeToBuyItem(itemIndex);
            boughtItems.push(item);
        }

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };
    }

})();