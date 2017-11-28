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

            },
            newRectangle: function () {

                return {};
            },
            newCircle: function () {

                return {};
            },
            newTriangle: function () {

                return {};
            },
            removeFromCanvas: function (c) {
                return;
            }
        };

        mainService = {

            clear: function () {
                return;
            },
            addForm: function (form) {

                return;
            },
            removeForm: function (form) {

                return;
            }
        }

        $controller = _$controller_('drawingController', {
            $scope: scope,
            mainService: mainService,
            fabricService: fabricService
        });

        spyOn(fabricService, 'newCanvas').and.callThrough();

        $controller.canvas = {

            clear: function () {
                return;
            }
        }

    }));

    it('Should be defined', function () {

        expect($controller).toBeDefined();
    });

    it('Should create Rectangle object', function () {

        spyOn($controller, 'addRect');

        $controller.drawingTool = 'Square';
        $controller.createObject();

        expect($controller.addRect).toHaveBeenCalled();

    });

    it('Should create Circle object', function () {

        spyOn($controller, 'addCircle');

        $controller.drawingTool = 'Circle';
        $controller.createObject();

        expect($controller.addCircle).toHaveBeenCalled();

    });

    it('Should create Triangle object', function () {

        spyOn($controller, 'addTriangle');

        $controller.drawingTool = 'Triangle';
        $controller.createObject();

        expect($controller.addTriangle).toHaveBeenCalled();

    });

    it('Should add a Rect', function () {

        spyOn(fabricService, 'newRectangle');

        $controller.canvas = {

            add: function () {

                return;
            }
        }

        $controller.addRect();

        expect(fabricService.newRectangle).toHaveBeenCalled();

    });

    it('Should add a Rect with parameters', function () {

        spyOn(fabricService, 'newRectangle');

        $controller.canvas = {

            add: function () {

                return;
            }
        }
        var c = '#FFFFFF';
        var left = 0;
        var top = 0;

        $controller.addRect(c, left, top);

        expect(fabricService.newRectangle).toHaveBeenCalled();

    });


    it('Should add a Circle', function () {

        spyOn(fabricService, 'newCircle');

        $controller.canvas = {

            add: function () {

                return;
            }
        }

        $controller.addCircle();

        expect(fabricService.newCircle).toHaveBeenCalled();

    });

    it('Should add a Circle with parameters', function () {

        spyOn(fabricService, 'newCircle');

        $controller.canvas = {

            add: function () {

                return;
            }
        }

        var c = '#FFFFFF';
        var left = 0;
        var top = 0;

        $controller.addCircle(c, left, top);

        expect(fabricService.newCircle).toHaveBeenCalled();

    });

    it('Should add a Triangle', function () {

        spyOn(fabricService, 'newTriangle');

        $controller.canvas = {

            add: function () {

                return;
            }
        }

        $controller.addTriangle();

        expect(fabricService.newTriangle).toHaveBeenCalled();

    });

    it('Should add a Triangle with parameters', function () {

        spyOn(fabricService, 'newTriangle');

        $controller.canvas = {

            add: function () {

                return;
            }
        }

        var c = '#FFFFFF';
        var left = 0;
        var top = 0;

        $controller.addTriangle(c, left, top);

        expect(fabricService.newTriangle).toHaveBeenCalled();

    });

    it('Should update color', function () {

        var c = 'ffffff'

        $controller.updateColor(c);

        expect($controller.objectColor).toBe('#FFFFFF');

    });

    it('Should clear main service', function () {

        spyOn(mainService, 'clear');

        $controller.clear();

        expect(mainService.clear).toHaveBeenCalled();
    });

    it('Should clear canvas', function () {

        $controller.canvas = {
            clear: function () {

                return;
            }
        }

        spyOn($controller.canvas, 'clear');

        $controller.clear();

        expect($controller.canvas.clear).toHaveBeenCalled();
    });

    it('Should delete an object', function () {

        $controller.canvas = {
            getActiveObject: function () {
                return {
                    type: 'rect'
                }
            }
        }

        spyOn(mainService, 'removeForm');
        $controller.deleteObject();
        expect(mainService.removeForm).toHaveBeenCalled();

    });

});
