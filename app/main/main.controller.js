(function () {

    'use strict';

    angular
        .module('cdde')
        .controller('mainController', mainController);

    mainController.$inject = ['$log', 'mainService'];

    function mainController($log, mainService) {

        var vm = this;

        vm.activate = activate;
        vm.download = download;
        vm.downloadJSON = downloadJSON;

        vm.activate();

        function activate() {
            $log.info('OK - Main App');

        }

        function download(text, name, type) {
            var a = document.createElement("a");
            var file = new Blob([text], {
                type: type
            });
            a.href = URL.createObjectURL(file);
            a.download = name;
            a.click();
        }

        function downloadJSON() {

            var shapes = mainService.getForms();

            var jsonData = JSON.stringify(shapes);

            vm.download(jsonData, 'project.json', 'application/json');

        }

    }


})();
