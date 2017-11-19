(function () {

    "use strict";

    angular
        .module("cdde")
        .service("mainService", mainService);

    mainService.$inject = ["$log"];

    function mainService($log) {

        var vm = this;

        vm.values = [];
        vm.projectData = [];

        var service = {

            addForm: addForm,
            getForms: getForms,
            removeForm: removeForm,
            clear: clear,
            setProjectData: setProjectData,
            getProjectData: getProjectData

        };

        return service;

        function getForms() {

            return vm.values;

        }

        function addForm(obj) {

            vm.values.push(obj);

        }

        function removeForm(obj) {

            var index = vm.values.indexOf(obj);

            if (index !== -1) {
                vm.values.splice(index, 1);
            }

            $log.debug(vm.values);
        }

        function clear() {

            vm.values = [];

        }

        function setProjectData(projectData) {

            vm.projectData = projectData;

        }

        function getProjectData() {

            return vm.projectData;

        }

    }

})();
