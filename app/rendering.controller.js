(function () {

    'use strict';

    angular
        .module('cdde')
        .controller('renderingController', renderingController);

    renderingController.$inject = ['$log', 'mainService', 'threeService'];

    function renderingController($log, mainService, threeService) {

        var vm = this;

        vm.rd = 'Rendering';

        vm.activate = activate;
        vm.threeStuff = threeStuff;
        vm.addObject = addObject;

        vm.activate();

        function activate() {
            $log.info('Activated - Rendering');
            vm.threeStuff();
        };

        function threeStuff() {

            var scene = threeService.newScene();
            //var scene = new THREE.Scene();
            vm.scene = scene;
            //var camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
            var camera = threeService.newCamera();

            var container = document.getElementById('rendering');
            document.body.appendChild(container);

            //var renderer = new THREE.WebGLRenderer();
            var renderer = threeService.newRenderer();
            renderer.setSize(500, 500);
            document.body.appendChild(renderer.domElement);

            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                wireframe: false
            });

            var cube = new THREE.Mesh(geometry, material);
            //            scene.add(cube);

            var geometry = new THREE.PlaneGeometry(10, 10, 10);
            var material = new THREE.MeshBasicMaterial({
                color: 0x708090,
                side: THREE.DoubleSide
            });
            var plane = new THREE.Mesh(geometry, material);
            scene.add(plane);

            var dirLight = new THREE.DirectionalLight(0xffffff, 1);
            dirLight.position.set(100, 100, 50);
            scene.add(dirLight);

            var pointLight = new THREE.PointLight(0xffffff, 1);
            scene.add(pointLight);

            // Add the orbit controls
            var controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.target = new THREE.Vector3(0, 0, 0);

            //Give the camera some distance
            camera.position.z = -7;

            var render = function () {
                requestAnimationFrame(render);

                //                cube.rotation.x += 0.001;
                //                cube.rotation.y += 0.001;
                //                plane.rotation.y += 0.0001;

                renderer.render(scene, camera);
                controls.update();
            };
            vm.render = render;

            render();

        };

        function addObject(object) {

            var geometry = new THREE.BoxGeometry(1, 1, 1);

            // for (var i = 0; i < geometry.faces.length; i++) {
            //
            //     var face = geometry.faces[i];
            //     face.color.setHex(Math.random() * 0xffffff);
            //
            // };

            var material = new THREE.MeshBasicMaterial({
                color: Math.random() * 0xffffff,
                wireframe: false
            });

            // var material = new THREE.MeshBasicMaterial({
            //     vertexColors: THREE.FaceColors
            // });


            //var cube = new THREE.Mesh(geometry, material);
            var cube = new THREE.Mesh(geometry, material);

            var positX = Math.random() * 10;
            var positY = Math.random() * 10;

            cube.position.set(positX, positY, 0);
            vm.scene.add(cube);

        };

    };
})();
