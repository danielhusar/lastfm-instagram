'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var templateCache = require('gulp-angular-templatecache');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var prefix = require('gulp-autoprefixer');
var stylish = require('jshint-stylish');
var rename = require('gulp-rename');
var wait = require('gulp-wait')
var spawn = require('child_process').spawn;
var node;

//less
gulp.task('less', function () {
  gulp.src('less/style.less')
    .pipe(less())
    .pipe(prefix('last 2 version', 'ie 8', 'ie 9')).pipe(gulp.dest('public/css'))
    .pipe(gulp.dest('./public/css'));
});

//minify css
gulp.task('cssmin', function () {
  gulp.src(['public/css/style.css']).pipe(cssmin({
    expand: true,
    keepSpecialComments: 0,
    noAdvanced: true
  })).pipe(rename({
    suffix: '.min',
    extname: '.css'
  })).pipe(gulp.dest('public/css'));
});

//lint javascript
gulp.task('lint', function () {
  gulp.src(['app/**/*.js', 'public/js/*.js', 'public/js/**/*.js', '!public/js/*.min.js', '!public/js/**/*.min.js', '!public/components/**/**'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//concatenate & minify JS
gulp.task('scripts', function () {
  gulp.src('public/views/*.html')
    .pipe(templateCache({
      root: '/views',
      module: 'app'
    }))
    .pipe(gulp.dest('public/views'));
  //wait for templates files
  setTimeout(function(){
    gulp.src([
      'public/components/angular/angular.js',
      'public/components/angular-route/angular-route.js',
      'public/components/angular-animate/angular-animate.js',
      'public/components/angular-slugify/angular-slugify.js',
      'public/js/app.js',
      'public/js/controllers/*.js',
      'public/js/services/*.js',
      'public/views/templates.js'
    ])
      .pipe(concat('app.min.js'))
      .pipe(ngmin())
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
  }, 500);

});

//watch Files For Changes
gulp.task('server', function () {
  node = spawn('node', ['app.js'], {stdio: 'inherit'});
  gulp.watch(['less/*.less', 'less/**/*.less', 'less/**/**/*.less', 'less/**/**/**/*.less'], ['less']);
});

//tasks aliases
gulp.task('default', ['scripts', 'less', 'cssmin']);
