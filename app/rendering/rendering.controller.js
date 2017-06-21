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
        vm.threeStuff = threeStuff;
        vm.addObject = addObject;
        vm.addBox = addBox;
        vm.addCylinder = addCylinder;
        vm.addPrism = addPrism;
        vm.setShapes = setShapes;

        vm.activate();

        function activate() {
            $log.info('Activated - Rendering');
            vm.threeStuff();
        };

        function threeStuff() {

            // Create a scene which will hold all our meshes to be rendered
            var scene = new THREE.Scene();
            vm.scene = scene;

            // Create and position a camera
            var camera = new THREE.PerspectiveCamera(
                60, // Field of view
                window.innerWidth / window.innerHeight, // Aspect ratio
                0.1, // Near clipping pane
                1000 // Far clipping pane
            );

            // Reposition the camera
            camera.position.set(-5, 5, 0);

            // Point the camera at a given coordinate
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            // Create a renderer
            var renderer = new THREE.WebGLRenderer({
                antialias: true
            });

            // Size should be the same as the window
            //renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setSize(560, 350);

            // Set a near white clear color (default is black)
            renderer.setClearColor(0xfff6e6);

            var container = document.getElementById('rendering');
            document.body.appendChild(container);

            // Append to the document
            document.body.appendChild(renderer.domElement);

            // A mesh is created from the geometry and material, then added to the scene
            var plane = new THREE.Mesh(
                new THREE.PlaneGeometry(5, 5, 5, 5),
                new THREE.MeshBasicMaterial({
                    color: 0x393839,
                    wireframe: true
                })
            );

            plane.rotateX(Math.PI / 2);
            scene.add(plane);

            // Render the scene/camera combination
            renderer.render(scene, camera);

            // Add an orbit control which allows us to move around the scene. See the three.js example for more details
            // https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
            var controls = new THREE.OrbitControls(camera, renderer.domElement);
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

            console.log("SHAPES");
            console.log(vm.shapes);

        };

        function addPrism() {

            var geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 3);
            var material = new THREE.MeshBasicMaterial({
                color: 0xaa0cc0,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide

            });
            var cylinder = new THREE.Mesh(geometry, material);

            cylinder.position.set(1.75, 0.5, -1.75);
            vm.scene.add(cylinder);

        };

        function addBox() {

            var geometry = new THREE.BoxGeometry(1, 1, 1);

            // CUBE
            var cubeMaterials = [
                        new THREE.MeshBasicMaterial({
                    color: 0xff0000,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide
                }),
                        new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide
                }),
                        new THREE.MeshBasicMaterial({
                    color: 0x0000ff,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide
                }),
                        new THREE.MeshBasicMaterial({
                    color: 0xffff00,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide
                }),
                        new THREE.MeshBasicMaterial({
                    color: 0xff00ff,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide
                }),
                        new THREE.MeshBasicMaterial({
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide
                }),
            ];

            // Create a MeshFaceMaterial, which allows the cube to have different materials on each face 
            var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

            var i = 0;
            for (i; i < vm.shapes.length; i++) {
                var cube = new THREE.Mesh(geometry, cubeMaterial);

                var positX = vm.shapes[i].left;
                var positY = vm.shapes[i].top;

                cube.position.set(0 - i, 0.5, 0 + i);

                vm.scene.add(cube);

            };

        };

        function addCylinder() {
            var geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
            var material = new THREE.MeshBasicMaterial({
                color: 0xaa8cc5,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide

            });
            var cylinder = new THREE.Mesh(geometry, material);

            cylinder.position.set(1.75, 0.5, 1.75);
            vm.scene.add(cylinder);

        };

        function addObject() {

            vm.setShapes();

            vm.addBox();

            vm.addCylinder();

            vm.addPrism();

        };

    };
})();
