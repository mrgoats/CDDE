module.exports = function (config) {
    config.set({

        basePath: '',
        logLevel: config.LOG_DEBUG,
        singleRun: true,
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/fabric/dist/fabric.js',
            'node_modules/three/build/three.min.js',

            'app/**/*.module.js',
            'app/**/*.factory.js',
            'app/**/*.service.js',
            'app/**/*.controller.js',

            'app/**/*.spec.js'

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
