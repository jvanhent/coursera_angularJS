(function() {
    "use strict";

    angular.module('common')
        .service('CustomerService', CustomerService);


    function CustomerService() {
        var service = this;
        var info = null;

        service.saveInfo = function(first, last, email, phone, favDish) {
            console.log("Save info in service: ", first, last, email, phone, favDish);
            info = {
                firstName: first,
                lastName: last,
                emailAddress: email,
                phoneNumber: phone,
                favDish: favDish
            };
            return true;
        };


    }



})();