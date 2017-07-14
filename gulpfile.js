'use strict';

var gulp           = require('gulp');
var scss           = require('gulp-sass');
var imagemin       = require('gulp-imagemin');
var concat         = require('gulp-concat');
var clean          = require('gulp-clean');
var uglifyJs       = require('gulp-uglifyjs');
var mainBowerFiles = require('main-bower-files');
var rename         = require('gulp-rename');

var browserSync    = require('browser-sync').create();
var reload         = browserSync.reload;

// Defining paths
var bowerJs   = mainBowerFiles('**/*.js');
var imageExts = '(jpg|jpeg|png|ico|gif)';

var basePaths = {
  app: 'app-frontend-src',
  dist:  'public'
};

var paths = {
  app: {
    html: {
      main: basePaths.app + '/index.html',
      partials: basePaths.app + '/?*/**/*.html',
    },
    js: {
      libs: bowerJs,
      app: [
        basePaths.app + '/app.js',
        basePaths.app + '/app.config.js', 
        basePaths.app + '/?*/**/*.js'
      ]
    },
    styles: {
      main: basePaths.app + '/style.scss'
    },
    images: basePaths.app + '/**/*.@' + imageExts
  },
  dist: {
    folders: {
      html: {
        main: basePaths.dist,
        partials: basePaths.dist + '/partials'
      },
      styles: {
        main: basePaths.dist
      },
      js: basePaths.dist + '/js',
      images: basePaths.dist
    },
    files: {
      html: basePaths.dist + '/**/*.html',
      styles: basePaths.dist + '/**/*.css',
      js: basePaths.dist + '/**/*.js',
      images: basePaths.dist + '/**/*.@' + imageExts,
    }
  },
  
};

/**
 * Tasks
 */

// Html
gulp.task('clean-html', function() {
  return gulp.src(paths.dist.files.html, {read: false})
    .pipe(clean());
});

// Extract all html partials and save them into one folder
gulp.task('html-partials', function() {
  return gulp.src(paths.app.html.partials)
    .pipe( rename( function(path) {
      path.dirname = '';
    } ) )
    .pipe(gulp.dest(paths.dist.folders.html.partials));
});

gulp.task('html-main', function() {
  return gulp.src(paths.app.html.main)
    .pipe(gulp.dest(paths.dist.folders.html.main));
});

gulp.task('html', ['clean-html', 'html-partials', 'html-main']);


// Styles
gulp.task('clean-css', function() {
  return gulp.src(paths.dist.files.styles, {read: false})
    .pipe(clean());
});

gulp.task('scss', function() {
  return gulp.src(paths.app.styles.main)
    .pipe(scss({includePaths: ['bower_components/']})
      .on('error', scss.logError))
    .pipe(gulp.dest(paths.dist.folders.styles.main))
    .pipe(browserSync.stream());
});

gulp.task('styles', ['clean-css', 'scss']);


// JS
gulp.task('clean-js', function() {
  return gulp.src(paths.dist.files.js, {read: false})
    .pipe(clean());
});

gulp.task('js-libs', function() {
  return gulp.src(paths.app.js.libs)
    .pipe(concat('libs.js'))
    // .pipe(uglifyJs())
    .pipe(gulp.dest(paths.dist.folders.js));
});

gulp.task('js-app', function() {
  return gulp.src(paths.app.js.app)
    .pipe(concat('app.js'))
    // .pipe(uglifyJs())
    .pipe(gulp.dest(paths.dist.folders.js));
});

gulp.task('js', ['clean-js', 'js-libs', 'js-app']);

// Images
gulp.task('clean-images', function() {
  return gulp.src(paths.dist.files.images, {read: false})
    .pipe(clean());
});

gulp.task('images', ['clean-images'], function() {
  return gulp.src(paths.app.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.folders.images));
});

// build
gulp.task('build', ['html', 'styles', 'js', 'images']);


// browser sync
gulp.task('reload-browser', function() {
  return browserSync.reload();
});

gulp.task('browser-sync-init', function() {
  browserSync.init({
    proxy: {
      target: 'localhost:3000',
      ws: true
    },
    port: 7000
  });
});

gulp.task('serve', ['browser-sync-init'], function() {
  gulp.watch([paths.app.html.main, paths.app.html.partials], ['html', 'reload-browser']);
  gulp.watch(basePaths.app + '/**/*.scss', ['scss']);
  gulp.watch(paths.app.js.app,  ['js-app', 'reload-browser']);
  gulp.watch(paths.app.images,  ['images', 'reload-browser']);
});

// default task
gulp.task('default', ['build', 'serve']);