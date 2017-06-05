module.exports = function (config) {
    config.set({

        basePath: '',
        logLevel: config.LOG_DEBUG,
        singleRun: true,
        frameworks: ['jasmine'],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/fabric/dist/fabric.min.js',
            'bower_components/threejs/build/three.min.js',

            'app/*.module.js',
            'app/*.factory.js',
            'app/*.service.js',
            'app/*.controller.js',

            'app/*.spec.js'

        ],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-jasmine',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],
        reporters: ['progress', 'coverage'],

        preprocessors: {

            'app/!(*spec).js': ['coverage']
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }

    });
}
