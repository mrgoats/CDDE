(function () {

    'use strict';

    angular
        .module('cdde')
        .service('threeService', threeService);

    threeService.$inject = ['three', '$log'];

    function threeService(three, $log) {

        var service = {
            newScene: newScene,
            newCamera: newCamera,
            newRenderer: newRenderer,
            newMesh: newMesh,
            newControls: newControls,
            newBox: newBox,
            newPrism: newPrism,
            newCylinder: newCylinder

        };

        return service;

        function newScene() {
            return new THREE.Scene();

        };

        function newCamera(options) {
            return new THREE.PerspectiveCamera(
                60, // Field of view
                window.innerWidth / window.innerHeight, // Aspect ratio
                0.1, // Near clipping pane
                1000 // Far clipping pane
            );

        };

        function newRenderer() {
            return new THREE.WebGLRenderer({
                antialias: true
            });

        };

        function newMesh() {

            return new THREE.Mesh(
                new THREE.PlaneGeometry(5, 5, 5, 5),
                new THREE.MeshBasicMaterial({
                    color: 0x393839,
                    wireframe: true
                })
            );

        };


        function newControls(camera, renderer) {
            return new THREE.OrbitControls(camera, renderer.domElement);

        };

        function newBox() {

            var geometry = new THREE.BoxGeometry(1, 1, 1);

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
                })
            ];

            // Create a MeshFaceMaterial, which allows the cube to have different materials on each face 
            var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

            return new THREE.Mesh(geometry, cubeMaterial);
        };

        function newPrism() {

            var geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 3);
            var material = new THREE.MeshBasicMaterial({
                color: 0xaa0cc0,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide

            });

            return new THREE.Mesh(geometry, material);

        };

        function newCylinder() {

            var geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
            var material = new THREE.MeshBasicMaterial({
                color: 0xaa8cc5,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide

            });
            return new THREE.Mesh(geometry, material);
        };


    };
})();
