(function() {
    'use strict';

    angular
        .module('public')
        .controller('CustomerInfoController', CustomerInfoController)

    CustomerInfoController.$inject = ['customerInfo', 'MenuService'];

    function CustomerInfoController(customerInfo, MenuService) {
        var ctrl = this;
        ctrl.customerInfo = customerInfo;
        ctrl.menuItem = '';

        ctrl.$onInit = function() {
            if (ctrl.customerInfo) {
                MenuService.getMenuItem(ctrl.customerInfo.favDish)
                    .then(function(response) {
                        console.log("Found item : ", response);
                        ctrl.menuItem = response.data;
                    })
                    .catch(function(response) {
                        console.log("Error item : ", response);
                    });
            }
        };
    }

}());