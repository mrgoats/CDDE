(function () {

    "use strict";

    angular
        .module("cdde")
        .service("mainService", mainService);

    mainService.$inject = ["$log"];

    function mainService($log) {

        var vm = this;

        vm.values;

        var service = {
            getInfo: getInfo,
            setInfo: setInfo
        };

        return service;
        //        var vm = this;
        //
        //        activate();
        //
        //        function activate() {
        //            $log.info("OK");
        //        };

        function getInfo() {
            console.log('Return this: Hello');
            return vm.values;

        };

        function setInfo(values) {
            //console.log('Take this away: Go');
            // $log.info(canvas);
            vm.values = values;


        };

    };

})();
