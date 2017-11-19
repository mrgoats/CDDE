(function () {

    'use strict';

    angular
        .module('cdde')
        .service('fabricService', fabricService);

    fabricService.$inject = ['fabric', '$log'];

    function fabricService(fabric, $log) {

        var service = {
            newCanvas: newCanvas,
            newRectangle: newRectangle,
            addToCanvas: addToCanvas,
            removeFromCanvas: removeFromCanvas
        }

        return service;

        function newCanvas(element) {
            return new fabric.Canvas(element);

        }

        function newRectangle(options) {
            return new fabric.Rect(options);

        }

        function addToCanvas(canvas, object) {
            return canvas.add(object);

        }

        function removeFromCanvas(canvas) {
            return canvas.remove(canvas.getActiveObject());
        }
    }

})();
