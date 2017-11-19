(function () {

    'use strict';

    angular
        .module('cdde')
        .controller('mainController', mainController);

    mainController.$inject = ['$log', 'mainService', '$scope', '$timeout'];

    function mainController($log, mainService, $scope, $timeout) {

        var app = this;

        app.isFileLoaded = false;

        app.activate = activate;
        app.download = download;
        app.downloadJSON = downloadJSON;
        app.showContent = showContent;
        app.loadProjectData = loadProjectData;

        app.activate();

        function activate() {
            $log.info('OK - Main App');

        }

        function showContent($fileContent) {

            app.content = JSON.parse($fileContent);

            $log.debug(app.content);

            mainService.setProjectData(app.content);

            app.isFileLoaded = true;

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

            app.download(jsonData, 'project.json', 'application/json');

        }

        function loadProjectData() {

            $timeout(function () {
                var loader = document.getElementById('projectLoader');
                loader.click();

            });

        }

    }


})();
