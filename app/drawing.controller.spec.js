describe('Drawing controller test suite', function () {
    var scope,
        $controller,
        mainService,
        $rootScope,
        $compile,
        fabric;

    beforeEach(module('cdde'));

    beforeEach(inject(function (_$rootScope_, _$controller_, _mainService_) {

        $rootScope = _$rootScope_;

        scope = $rootScope.$new();

        fabricService = {
            newCanvas: function (elem) {
                return {
                    isDrawingMode: false
                };

            }
        };

        $controller = _$controller_('drawingController', {
            $scope: scope,
            mainService: _mainService_,
            fabricService: fabricService
        });

        spyOn(fabricService, 'newCanvas').and.callThrough();

    }));

    it('Should be defined', function () {

        expect($controller).toBeDefined();
    });


});
