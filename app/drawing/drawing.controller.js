(function () {

    'use strict';

    angular
        .module('cdde')
        .controller('drawingController', drawingController);

    drawingController.$inject = ['$log', 'mainService', 'fabricService'];

    function drawingController($log, mainService, fabricService) {

        var vm = this;

        vm.db = 'Drawing';
        vm.canvas = null;
        vm.modes = ['Square', 'Circle', 'Triangle'];
        vm.drawingDisabled = true;
        vm.btnModeText = 'Enter drawing mode';
        vm.objectColor = '#0000FF';
        vm.projectData = null;

        vm.activate = activate;
        vm.toggleDrawing = toggleDrawing;
        vm.clear = clear;
        vm.deleteObject = deleteObject;
        vm.addRect = addRect;
        vm.addCircle = addCircle;
        vm.addTriangle = addTriangle;
        vm.createObject = createObject;
        vm.fabricSetup = fabricSetup;
        vm.downloadImage = downloadImage;
        vm.loadProjectData = loadProjectData;
        vm.updateColor = updateColor;

        vm.activate();

        function activate() {

            $log.info('Activated - Drawing');
            vm.drawingTool = vm.modes[0];

            vm.fabricSetup();
        }

        function fabricSetup() {

            vm.canvas = fabricService.newCanvas('board');

            vm.canvas.isDrawingMode = false;

        }

        function clear() {

            mainService.clear();
            vm.canvas.clear();

        }

        function deleteObject() {

            mainService.removeForm(vm.canvas.getActiveObject());
            fabricService.removeFromCanvas(vm.canvas);

        }

        function addRect(color, left, top) {

            if (left === undefined) {
                left = 280;
            }

            if (top === undefined) {
                top = 175;

            }

            var opt = {
                left: left,
                top: top,
                fill: color,
                width: 20,
                height: 20,
            };

            var rect = fabricService.newRectangle(opt);
            vm.canvas.add(rect);
            mainService.addForm(rect);

        }

        function addCircle(color, left, top) {

            if (left === undefined) {
                left = 280;
            }

            if (top === undefined) {
                top = 175;

            }

            var circle = new fabric.Circle({
                radius: 20,
                fill: color,
                left: left,
                top: top
            });
            vm.canvas.add(circle);
            mainService.addForm(circle);
        }

        function addTriangle(color, left, top) {

            if (left === undefined) {
                left = 280;
            }

            if (top === undefined) {
                top = 175;

            }


            var triangle = new fabric.Triangle({
                width: 30,
                height: 30,
                fill: color,
                left: left,
                top: top
            });

            vm.canvas.add(triangle);
            mainService.addForm(triangle);

        }

        function createObject() {

            if (vm.drawingTool === 'Square') {

                vm.addRect(vm.objectColor);

            } else if (vm.drawingTool === 'Circle') {

                vm.addCircle(vm.objectColor);

            } else {
                vm.addTriangle(vm.objectColor);
            }

        }

        function toggleDrawing() {

            vm.canvas.isDrawingMode = !vm.canvas.isDrawingMode;

            vm.drawingDisabled = !vm.drawingDisabled;

            if (vm.canvas.isDrawingMode) {
                vm.btnModeText = 'Leave drawing mode';
            } else {
                vm.btnModeText = 'Enter drawing mode';
            }

        }

        function downloadImage() {

            vm.canvas.isDrawingMode = false;

            if (!window.localStorage) {
                alert("This function is not supported by your browser.");
                return;
            }
            // to PNG
            window.open(vm.canvas.toDataURL('png'));

        }

        function loadProjectData() {

            vm.shapes = mainService.getProjectData();

            vm.clear();

            var i = 0;

            for (i; i < vm.shapes.length; i++) {

                if (vm.shapes[i].type === 'rect') {

                    vm.addRect(vm.shapes[i].fill, vm.shapes[i].left, vm.shapes[i].top);

                } else if (vm.shapes[i].type === 'circle') {

                    vm.addCircle(vm.shapes[i].fill, vm.shapes[i].left, vm.shapes[i].top);

                } else {

                    vm.addTriangle(vm.shapes[i].fill, vm.shapes[i].left, vm.shapes[i].top);

                }

            }
        }

        function updateColor(color) {

            vm.objectColor = '#' + color.toUpperCase();
        }
    }

})();
