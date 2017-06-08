'use strict';

let gulp = require('gulp');
let scss = require('gulp-sass');
let imagemin = require('gulp-imagemin');
let concat = require('gulp-concat');
let clean = require('gulp-clean');

let paths = {
  html: ['src/**/*.html'],
  scss: ['src/style.scss'],
  js: ['src/main.js', 'src/js/**/*.js'],
  images: ['src/**/*.@(jpg|jpeg|png|ico|gif)'],
  production: 'public/'
};

gulp.task('clean', function() {
  return gulp.src(paths.production + '**/*.*', {read: false})
    .pipe(clean());
});

gulp.task('html', ['clean'], function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.production))
});

gulp.task('scss', ['clean'], function() {
  return gulp.src(paths.scss)
    .pipe(scss({includePaths: ['bower_components/']})
      .on('error', scss.logError))
    .pipe(gulp.dest(paths.production))
});

gulp.task('js', ['clean'], function() {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.production));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.production));
});

gulp.task('build', ['html', 'scss', 'js', 'images']);
