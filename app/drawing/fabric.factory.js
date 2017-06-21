(function () {

    'use strict';

    angular
        .module('cdde')
        .factory('fabric', fabric);

    fabric.$inject = ['$window'];

    function fabric($window) {
        return $window.fabric;
    };

})();
