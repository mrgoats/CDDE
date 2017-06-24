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
        vm.setShapes = setShapes;

        vm.activate();

        function activate() {
            $log.info('Activated - Rendering');
            vm.threeSetup();
        };

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

            var container = document.getElementById('3dCanvas');

            // Append to the document
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

        };

        function setShapes() {

            vm.shapes = mainService.getForms();

        };

        function addPrism(x, y) {

            this.x = x - 280;
            this.y = y - 175;

            var prism = threeService.newPrism();

            prism.position.set(this.x / 64, 0.5, this.y / 64);
            prism.rotateY(Math.PI);
            vm.scene.add(prism);

        };

        function addBox(x, y) {

            this.x = x - 280;
            this.y = y - 175;

            var cube = threeService.newBox();

            cube.position.set(this.x / 64, 0.5, this.y / 64);

            vm.scene.add(cube);

        };

        function addCylinder(x, y) {

            this.x = x - 280;
            this.y = y - 175;

            var cylinder = threeService.newCylinder();

            cylinder.position.set(this.x / 64, 0.5, this.y / 64);
            vm.scene.add(cylinder);

        };

        function addObject() {

            //clear shapes in scene
            var i = vm.scene.children.length - 1;

            //ignore first element (plane) and remove shapes
            for (i; i > 0; i--) {
                var obj = vm.scene.children[i];
                vm.scene.remove(obj);
            }

            //get the current shapes on the board
            vm.setShapes();

            //add the current shapes
            var i = 0;

            for (i; i < vm.shapes.length; i++) {

                if (vm.shapes[i].isType('rect')) {

                    vm.addBox(vm.shapes[i].left, vm.shapes[i].top);

                } else if (vm.shapes[i].isType('circle')) {

                    vm.addCylinder(vm.shapes[i].left, vm.shapes[i].top);

                } else {

                    vm.addPrism(vm.shapes[i].left, vm.shapes[i].top);

                }

            }

        };

    };
})();
