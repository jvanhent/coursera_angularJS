(function() {
    'use strict';

    angular
        .module('public')
        .controller('CustomerInfoController', CustomerInfoController)

    CustomerInfoController.$inject = ['customerInfo', 'MenuService'];

    function CustomerInfoController(customerInfo, MenuService) {
        var ctrl = this;
        ctrl.customerInfo = customerInfo;


    }

}());