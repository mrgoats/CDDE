(function () {

    'use strict';

    angular
        .module('cdde')
        .factory('three', three);

    three.$inject = ['$window'];

    function three($window) {
        return $window.THREE;
    };

})();
