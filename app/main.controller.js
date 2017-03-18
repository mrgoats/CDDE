(function () {

    "use strict";

    angular
        .module("cdk")
        .controller("mainController", mainController);

    mainController.$inject = ["$log"];

    function mainController($log) {

        var vm = this;

        vm.drawingDisabled = false;

        vm.toggleDrawing = toggleDrawing;
        vm.text = "test";

        activate();

        function activate() {
            $log.info("OK");
        };

        function toggleDrawing() {
            //vm.canvas.isDrawingMode = !vm.canvas.isDrawingMod;
            vm.drawingDisabled = !vm.drawingDisabled;

        };

    };

})();
