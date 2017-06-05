var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

//gulp.task('js-fef', function () {
//    //return gulp.src(['file1.js', 'file2.js', 'file3.js'])
//    return gulp.src('app/drawing.controller.js', 'app/main.controller.js', 'app/rendering.controller.js')
//        .pipe(gp_concat('concat.js'))
//        .pipe(gulp.dest('dist'))
//        .pipe(gp_rename('uglify.js'))
//        .pipe(gp_uglify())
//        .pipe(gulp.dest('dist'));
//});

gulp.task('minify', function () {

    return gulp.src('app/*.controller.js')
        .pipe(concat('my-controllers.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('ugly-controllers.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['minify'], function () {});
