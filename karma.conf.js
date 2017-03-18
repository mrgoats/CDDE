module.exports = function (config) {
    config.set({

        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',

            'app/*.module.js',
            'app/*.controller.js',

            'app/*.spec.js'

        ],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-jasmine',
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
