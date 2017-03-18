(function () {

    "use strict";

    angular
        .module("cdk")
        .controller("drawingController", drawingController);

    drawingController.$inject = ["$log"];

    function drawingController($log) {

        var vm = this;
        vm.db = "Drawing";
        vm.canvas;

        vm.drawingDisabled = true;

        function activate() {
            $log.info("Activated - Drawing");


            // create a wrapper around native canvas element (with id="c")
            vm.canvas = new fabric.Canvas('board');
            vm.canvas.isDrawingMode = false;

            // create a rectangle object
            var rect = new fabric.Rect({
                left: 100,
                top: 100,
                fill: 'red',
                width: 20,
                height: 20
            });

            // "add" rectangle onto canvas
            vm.canvas.add(rect);
        };

        activate();

        vm.toggleDrawing = toggleDrawing;

        function toggleDrawing() {
            vm.canvas.isDrawingMode = !vm.canvas.isDrawingMod;
            console.log("Yay");
            vm.drawingDisabled = !vm.drawingDisabled;

        };

    };

})();
