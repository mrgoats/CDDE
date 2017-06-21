(function () {

    'use strict';

    angular
        .module('cdde')
        .controller('mainController', mainController);

    mainController.$inject = ['$log'];

    function mainController($log) {

        var vm = this;

        vm.activate = activate;

        vm.activate();

        function activate() {
            $log.info('OK');
        };

    };

})();
