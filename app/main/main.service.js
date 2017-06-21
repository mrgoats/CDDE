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
            getForms: getForms

        };

        return service;
        //        var vm = this;
        //
        //        activate();
        //
        //        function activate() {
        //            $log.info("OK");
        //        };

        function getForms() {

            return vm.values;

        };

        function addForm(obj) {

            console.log(obj);
            vm.values.push(obj);


        };

    };

})();
