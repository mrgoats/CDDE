describe('RENDERING controller test suite', function () {
    var scope,
        $controller,
        mainService,
        threeService;

    beforeEach(module('cdde'));

    beforeEach(inject(function ($rootScope, _$controller_, _mainService_) {

        scope = $rootScope.$new();

        threeService = {
            newScene: function () {

                return {};
            },
            newCamera: function () {

                return {};
            },
            newRenderer: function () {

                return;
            }
        };

        $controller = _$controller_('renderingController', {
            $scope: scope,
            mainService: _mainService_,
            threeService: threeService
        });

        spyOn($controller, 'threeStuff').and.callFake(function () {
            return;
        });

    }));

    it('Should be defined', function () {

        expect($controller).toBeDefined();
    });

});
