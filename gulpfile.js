var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');
var minify = require('gulp-minify');

//gulp.task('js-fef', function () {
//    //return gulp.src(['file1.js', 'file2.js', 'file3.js'])
//    return gulp.src('app/drawing.controller.js', 'app/main.controller.js', 'app/rendering.controller.js')
//        .pipe(gp_concat('concat.js'))
//        .pipe(gulp.dest('dist'))
//        .pipe(gp_rename('uglify.js'))
//        .pipe(gp_uglify())
//        .pipe(gulp.dest('dist'));
//});

gulp.task('concat-modules', function () {

    gulp.src('app/**/*.module.js')
        .pipe(concat('amodules.js'))
        .pipe(gulp.dest('dist'))

    //        .pipe(rename('ugly-controllers.min.js'))
    //        .pipe(uglify())
    //        .pipe(gulp.dest('dist'));

});


gulp.task('concat-controllers', function () {

    gulp.src('app/**/*.controller.js')
        .pipe(concat('dcontrollers.js'))
        .pipe(gulp.dest('dist'))

});

gulp.task('concat-services', function () {

    gulp.src('app/**/*.service.js')
        .pipe(concat('cservices.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('concat-factories', function () {

    gulp.src('app/**/*.factory.js')
        .pipe(concat('bfactories.js'))
        .pipe(gulp.dest('dist'))
});


gulp.task('minify', function () {
    gulp.src('dist/app.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js', '-spec.js']
        }))
        .pipe(gulp.dest('dist'))
});


gulp.task('concat', function () {

    gulp.start('concat-modules');
    gulp.start('concat-controllers');
    gulp.start('concat-services');
    gulp.start('concat-factories');

});

gulp.task('compress', function () {

    gulp.src('dist/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['concat', 'compress', 'minify'], function () {});
