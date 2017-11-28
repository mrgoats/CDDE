describe('Initial test suite', function () {
    var scope, $controller, mainService;

    beforeEach(module('cdde'));

    beforeEach(inject(function ($rootScope, _$controller_) {

        scope = $rootScope.$new();

        mainService = {

            setProjectData: function (content) {

                return;

            },
            getForms: function () {

                return [];
            }
        }

        $controller = _$controller_('mainController', {
            $scope: scope,
            mainService: mainService
        });

    }));


    it('Should be defined', function () {

        expect($controller).toBeDefined();
    });

    it('Should download json', function () {

        spyOn($controller, 'download');

        $controller.downloadJSON();

        expect($controller.download).toHaveBeenCalled();
    });

    it('Should load file content', function () {

        var $fileContent = {};

        spyOn(JSON, 'parse').and.returnValue({});
        spyOn(mainService, 'setProjectData');

        $controller.showContent($fileContent);

        expect(mainService.setProjectData).toHaveBeenCalled();

    });

});
