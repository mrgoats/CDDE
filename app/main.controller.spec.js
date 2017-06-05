describe('Initial test suite', function () {
    var scope, $controller;

    beforeEach(module('cdde'));

    beforeEach(inject(function ($rootScope, _$controller_) {

        scope = $rootScope.$new();

        $controller = _$controller_('mainController', {
            $scope: scope
        });

    }));


    it('Should be defined', function () {

        expect($controller).toBeDefined();
    });


});
