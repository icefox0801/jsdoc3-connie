var gulp = require('gulp');
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

gulp.task('js_clean', function () {
    return gulp.src('static/scripts/')
        .pipe(clean({force: true}));
});

gulp.task('js_copy', function () {
    gulp.src(['bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('static/scripts/'));
});

gulp.task('ui_clean', function () {
    return gulp.src('static/ui/')
        .pipe(clean({force: true}));
});

gulp.task('ui_copy', function () {
    gulp.src(['bower_components/semantic/dist/**/*'])
        .pipe(gulp.dest('static/ui/'));
});

gulp.task('css_clean', function () {
    return gulp.src('static/styles')
        .pipe(clean({force: true}));
});

gulp.task('css_build', function () {
    gulp.src('scss/connie.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('static/styles'));
});

gulp.task('js', ['js_clean', 'js_copy']);

gulp.task('ui', ['ui_clean', 'ui_copy']);

gulp.task('css', ['css_clean', 'css_build']);

gulp.task('default', ['ui', 'js', 'css']);