(function () {

    'use strict';

    angular
        .module('cdde')
        .controller('renderingController', renderingController);

    renderingController.$inject = ['$log', 'mainService', 'threeService'];

    function renderingController($log, mainService, threeService) {

        var vm = this;

        vm.rd = 'Rendering';
        vm.shapes = [];

        vm.activate = activate;
        vm.threeSetup = threeSetup;
        vm.addObject = addObject;
        vm.addBox = addBox;
        vm.addCylinder = addCylinder;
        vm.addPrism = addPrism;
        vm.getContainer = getContainer;

        vm.activate();

        function activate() {
            $log.info('Activated - Rendering');
            vm.threeSetup();
        }

        function threeSetup() {

            // Create a scene which will hold all our meshes to be rendered
            var scene = threeService.newScene();
            vm.scene = scene;

            var camera = threeService.newCamera();

            vm.camera = camera;
            // Reposition the camera
            camera.position.set(0, 5, 5);

            // Point the camera at a given coordinate
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            var renderer = threeService.newRenderer();

            // Size should be the same as the window
            //renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setSize(560, 350);

            // Set a near white clear color (default is black)
            renderer.setClearColor(0xfff6e6);

            var container = vm.getContainer();

            container.appendChild(renderer.domElement);

            // A mesh is created from the geometry and material, then added to the scene
            var plane = threeService.newMesh();

            plane.rotateX(Math.PI / 2);

            scene.add(plane);

            // Render the scene/camera combination
            renderer.render(scene, camera);

            // Add an orbit control which allows us to move around the scene. See the three.js example for more details
            // https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
            var controls = threeService.newControls(camera, renderer);
            /*
            controls.addEventListener('change', function () {
                renderer.render(scene, camera);
            }); // add this only if there is no animation loop (requestAnimationFrame)
            */

            var render = function () {
                requestAnimationFrame(render);

                renderer.render(scene, camera);
                controls.update();
            };
            vm.render = render;

            render();

        }

        function setCoordinates(x, y) {

            vm.x = (x - 280);
            vm.y = (y - 175);

            return {
                x: vm.x,
                y: vm.y
            };

        }

        function addPrism(color, x, y) {

            var coordinates = setCoordinates(x, y);

            var prism = threeService.newPrism(color);

            prism.position.set(coordinates.x / 36.5, 0.5, coordinates.y / 36.5);
            prism.rotateY(Math.PI);
            vm.scene.add(prism);

        }

        function addBox(color, x, y, width, height) {

            var coordinates = setCoordinates(x, y);

            var cube = threeService.newBox(color, width, height);

            cube.position.set(coordinates.x / 21.5, 0.5, coordinates.y / 21.5);

            vm.scene.add(cube);

        }

        function addCylinder(color, x, y) {

            var coordinates = setCoordinates(x, y);

            var cylinder = threeService.newCylinder(color);

            cylinder.position.set(coordinates.x / 38, 0.5, coordinates.y / 38);
            vm.scene.add(cylinder);

        }

        function addObject() {

            //clear shapes in scene
            var i = vm.scene.children.length - 1;

            //ignore first element (plane) and remove shapes
            for (i; i > 0; i--) {
                var obj = vm.scene.children[i];
                vm.scene.remove(obj);
            }

            //get the current shapes on the board
            vm.shapes = mainService.getForms();

            $log.debug(vm.shapes);

            //add the current shapes
            i = 0;

            for (i; i < vm.shapes.length; i++) {

                if (vm.shapes[i].isType('rect')) {

                    vm.addBox(vm.shapes[i].fill, vm.shapes[i].left, vm.shapes[i].top, vm.shapes[i].width, vm.shapes[i].height);

                } else if (vm.shapes[i].isType('circle')) {

                    vm.addCylinder(vm.shapes[i].fill, vm.shapes[i].left, vm.shapes[i].top);

                } else {

                    vm.addPrism(vm.shapes[i].fill, vm.shapes[i].left, vm.shapes[i].top);

                }

            }

        }

        function getContainer() {

            return document.getElementById('3dCanvas');
        }

    }

})();
