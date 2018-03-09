const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    imageOptimization = require('gulp-image-optimization'),
    imageMin = require('gulp-imagemin');

gulp.task('default', ['browser']);

gulp.task('browser', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});

gulp.watch(['index.html', 'assets/css/style.min.css/style.css', 'assets/js/script.min.js/script.js']).on('change', function(){
    browserSync.reload();
});

gulp.watch(['assets/css/*.css']).on('change', function(){
    console.log('Concat')
    return gulp.src(['./assets/css/style.css', './assets/css/mediastyle.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./assets/css/'));
});

gulp.watch(['assets/css/all.css']).on('change', function(){
    return gulp.src('assets/css/all.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/css/style.min.css'))
});


gulp.task('minJS', function(){
    return gulp.src('assets/js/script.js')
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/script.min.js'))
});

gulp.task('minCSS', function(){
    return gulp.src('assets/css/all.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/css/style.min.css'));
});

gulp.task('optimImages', function() {
    gulp.src('assets/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('assets/images/min'))
});

gulp.task('imagesTest', function(cb) {
    gulp.src(['assets/images/**/*.png','assets/images/**/*.jpg','assets/images/**/*.gif','assets/images/**/*.jpeg'])
        .pipe(imageOptimization({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true}))
        .pipe(gulp.dest('assets/images/min')).on('end', cb).on('error', cb);
});





