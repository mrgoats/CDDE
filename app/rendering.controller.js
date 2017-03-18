(function () {

    "use strict";

    angular
        .module("cdk")
        .controller("renderingController", renderingController);

    renderingController.$inject = ["$log"];

    function renderingController($log) {

        var vm = this;

        vm.rd = "Rendering";
        vm.threeStuff = threeStuff;

        function activate() {

            $log.info("Activated - Rendering");
            vm.threeStuff();
        };

        activate();


        function threeStuff() {

            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);

            var container = document.getElementById('rendering');
            document.body.appendChild(container);

            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(300, 300);
            document.body.appendChild(renderer.domElement);

            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                wireframe: false
            });

            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            var geometry = new THREE.PlaneGeometry(10, 10, 10);
            var material = new THREE.MeshBasicMaterial({
                color: 0xf0f0f0,
                side: THREE.DoubleSide
            });
            var plane = new THREE.Mesh(geometry, material);
            scene.add(plane);


            //var dirLight = new THREE.AmbientLight(0xffffff, 1);
            //dirLight.position.set(100, 100, 50);
            //scene.add(dirLight);

            var dirLight = new THREE.DirectionalLight(0xffffff, 1);
            dirLight.position.set(100, 100, 50);
            scene.add(dirLight);


            var pointLight = new THREE.PointLight(0xffffff, 1);
            scene.add(pointLight);




            // Add the orbit controls
            var controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.target = new THREE.Vector3(0, 0, 0);

            camera.position.z = 5;

            var render = function () {
                requestAnimationFrame(render);

                /*                
                                cube.rotation.x += 0.01;
                                cube.rotation.y += 0.01;
                                plane.rotation.y += 0.001;
                */

                renderer.render(scene, camera);
                controls.update();
            };

            render();

        };

    };

})();
