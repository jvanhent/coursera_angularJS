(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', MsgController);

    MsgController.$inject = ['$scope'];

    function MsgController($scope) {
        $scope.inputData = "";
        $scope.outputMsg = "";

        $scope.check = function() {
            if ($scope.inputData.length == 0) {
                $scope.outputMsg = "Enter data first";
            } else {
                var s = $scope.inputData.split(",").length;
                if (s > 3) {
                    $scope.outputMsg = "Too Much!";
                } else {
                    $scope.outputMsg = "Enjoy!";
                }
            }
        };
    }

})();