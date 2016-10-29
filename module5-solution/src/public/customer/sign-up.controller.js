(function() {
    'use strict';

    angular
        .module('public')
        .controller('SignUpController', SignUpController)

    SignUpController.$inject = ['CustomerService', 'MenuService'];

    function SignUpController(CustomerService, MenuService) {
        var ctrl = this;
        ctrl.firstName = '';
        ctrl.lastName = '';
        ctrl.emailAddress = '';
        ctrl.phoneNumber = '';
        ctrl.favDish = '';
        ctrl.favDishError = '';
        ctrl.saveMsg = '';

        ctrl.saveInfo = function() {
            ctrl.favDishError = '';
            ctrl.saveMsg = '';
            MenuService.validateMenuItem(ctrl.favDish).then(
                function(response) {
                    console.log("validateMenuItem ok: ", response);
                    ctrl.favDishError = response.data.ok
                    var saved = CustomerService.saveInfo(ctrl.firstName, ctrl.lastName, ctrl.emailAddress, ctrl.phoneNumber, ctrl.favDish);
                    if (saved) {
                        ctrl.saveMsg = 'Your information has been saved';
                    } else {
                        ctrl.saveMsg = 'Not Saved';
                    }
                },
                function(error) {
                    ctrl.favDishError = 'No such menu number exists';
                }
            );

        }
    }

}());