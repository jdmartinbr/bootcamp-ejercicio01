const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css');

gulp.task('browser', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});

gulp.watch('index.html').on('change', function(){
    browserSync.reload();
});

gulp.task('minJS', function(){
    return gulp.src('assets/js/script.js')
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/script.min.js'))
});

gulp.task('minCSS', function(){
    return gulp.src('assets/css/style.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/css/style.min.css'));
});

