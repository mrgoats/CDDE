(function () {

    "use strict";

    angular
        .module("cdde")
        .service("mainService", mainService);

    mainService.$inject = ["$log"];

    function mainService($log) {

        var vm = this;

        vm.values = [];

        var service = {

            addForm: addForm,
            getForms: getForms,
            clear: clear

        };

        return service;

        function getForms() {

            return vm.values;

        };

        function addForm(obj) {

            vm.values.push(obj);

        };

        function clear() {
            vm.values = [];

        };

    };

})();
