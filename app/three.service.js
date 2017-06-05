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
            newRenderer: newRenderer
        };

        return service;

        function newScene() {
            return new THREE.Scene();

        };

        function newCamera(options) {
            return new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);

        };

        function newRenderer() {
            return new THREE.WebGLRenderer();

        };
    };
})();
