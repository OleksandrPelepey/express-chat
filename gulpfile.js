'use strict';

var gulp           = require('gulp');
var scss           = require('gulp-sass');
var imagemin       = require('gulp-imagemin');
var concat         = require('gulp-concat');
var clean          = require('gulp-clean');
var uglifyJs       = require('gulp-uglifyjs');
var mainBowerFiles = require('main-bower-files');

var browserSync    = require('browser-sync').create();
var reload         = browserSync.reload;


var imageExts = '(jpg|jpeg|png|ico|gif)';
var bowerJs   = mainBowerFiles('**/*.js');
var paths = {
  html: ['src/**/*.html'],
  scss: ['src/**/*.scss'],
  mainScss: ['src/style.scss'],
  js: bowerJs.concat(['src/main.js', 'src/js/**/*.js']),
  images: ['src/**/*.@' + imageExts],
  production: 'public/'
};

gulp.task('clean-html', function() {
  return gulp.src(paths.production + '**/*.html', {read: false})
    .pipe(clean());
});

gulp.task('clean-css', function() {
  return gulp.src(paths.production + '**/*.css', {read: false})
    .pipe(clean());
});

gulp.task('clean-js', function() {
  return gulp.src(paths.production + '**/*.js', {read: false})
    .pipe(clean());
});

gulp.task('clean-images', function() {
  return gulp.src(paths.production + '**/*.@' + imageExts, {read: false})
    .pipe(clean());
});

gulp.task('html', ['clean-html'], function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.production));
});

gulp.task('scss', ['clean-css'], function() {
  return gulp.src(paths.mainScss)
    .pipe(scss({includePaths: ['bower_components/']})
      .on('error', scss.logError))
    .pipe(gulp.dest(paths.production));
});

gulp.task('js', ['clean-js'], function() {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    // .pipe(uglifyJs())
    .pipe(gulp.dest(paths.production));
});

gulp.task('images', ['clean-images'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.production));
});

gulp.task('serve', function() {
  browserSync.init({
    startPath: '/',
    proxy: {
      target: 'localhost:3000',
      ws: true
    },
    port: 7000,
    files: paths.production
  });
});

gulp.task('build', ['html', 'scss', 'js', 'images']);

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scss, ['scss']);
  gulp.watch(paths.js,  ['js']);
  gulp.watch(paths.images,  ['images']);
});

gulp.task('default', ['watch', 'serve', 'build']);
