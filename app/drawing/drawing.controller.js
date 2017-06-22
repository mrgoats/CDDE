(function () {

    'use strict';

    angular
        .module('cdde')
        .controller('drawingController', drawingController);

    drawingController.$inject = ['$log', 'mainService', 'fabricService'];

    function drawingController($log, mainService, fabricService) {

        var vm = this;

        vm.db = 'Drawing';
        vm.canvas;
        vm.modes = ['Pencil', 'Circle', 'Square', 'Triangle'];
        vm.drawingDisabled = true;
        vm.btnModeText = 'Enter drawing mode';

        vm.activate = activate;
        vm.toggleDrawing = toggleDrawing;
        vm.clear = clear;
        vm.deleteObject = deleteObject;
        vm.addRect = addRect;
        vm.addCircle = addCircle;
        vm.addTriangle = addTriangle;
        vm.createObject = createObject;
        vm.fabricStuff = fabricStuff;

        vm.activate();

        function activate() {

            $log.info('Activated - Drawing');
            vm.drawingTool = vm.modes[0];

            vm.fabricStuff();
        };


        function fabricStuff() {

            vm.canvas = fabricService.newCanvas('board');

            //vm.canvas = new fabric.Canvas('board');
            vm.canvas.isDrawingMode = false;

            // create a rectangle object
            //            var opt = {
            //                left: 100,
            //                top: 100,
            //                fill: 'black',
            //                width: 20,
            //                height: 20
            //            };
            //            var rect = fabricService.newRectangle(opt);

            //            var rect = new fabric.Rect({
            //                left: 100,
            //                top: 100,
            //                fill: 'red',
            //                width: 20,
            //                height: 20
            //            });

            // 'add' rectangle onto canvas
            //            vm.canvas.add(rect);

        };

        function clear() {

            vm.canvas.clear();

        };

        function deleteObject() {

            vm.canvas.getActiveObject().remove();

        };

        function addRect() {
            var opt = {
                left: 280,
                top: 175,
                fill: 'black',
                width: 20,
                height: 20,
            };

            var rect = fabricService.newRectangle(opt);
            vm.canvas.add(rect);
            mainService.addForm(rect);

        };

        function addCircle() {
            var circle = new fabric.Circle({
                radius: 20,
                fill: 'grey',
                left: 280,
                top: 175
            });
            vm.canvas.add(circle);
            mainService.addForm(circle);
        };

        function addTriangle() {

            var triangle = new fabric.Triangle({
                width: 20,
                height: 30,
                fill: 'blue',
                left: 280,
                top: 175
            });

            vm.canvas.add(triangle);
            mainService.addForm(triangle);

        };

        function createObject() {

            if (vm.drawingTool === 'Square') {

                vm.addRect();

            } else if (vm.drawingTool === 'Circle') {

                vm.addCircle();

            } else {
                vm.addTriangle();
            }

            var objs = vm.canvas.getObjects();
            console.log(objs);

        };

        function toggleDrawing() {

            vm.canvas.isDrawingMode = !vm.canvas.isDrawingMode;

            vm.drawingDisabled = !vm.drawingDisabled;

            if (vm.canvas.isDrawingMode) {
                vm.btnModeText = 'Leave drawing mode';
            } else {
                vm.btnModeText = 'Enter drawing mode';
            }

        };

    };

})();
