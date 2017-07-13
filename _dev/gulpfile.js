/**
 * Author : Edgar Valfogo
 *
 * How do I use this:
 * In my projects im using a "_dev" folder in the project root that outputs on "../assets/"
 */

(function () {
  'use strict';

  var gulp    = require('gulp');

  /**
   * Minifies Javascript
   */
  var uglify  = require('gulp-uglify');

  /**
   * Compiles Scss
   */
  var sass    = require('gulp-sass');

  /**
   * Better error displaying
   */
  var plumber = require('gulp-plumber');

  /**
   * Better than gulp.watch, watches the files and does the callback
   */
  var watch   = require('gulp-watch');

  /**
   * Includes JS files with the right syntax
   */
  var include = require('gulp-include');

  /**
   * Notifies the user according with the pipe progress
   */
  var notify  = require("gulp-notify");

  /**
   * SCRIPTS COMPILATION
   */

  /**
   * SCRIPTS
   * Common JS compilation with gulp-include for easier organization and development. Uglify will become optional (flag WIP)
   * For this one you must create a main.js file that includes everything according with the needs
   * The default output is ../assets/js
   */
  gulp.task('scripts', function (){
    console.log('Minifying your JS...');

    gulp.src('./js/main.js')
    .pipe(plumber())
    .pipe(include())
    .pipe(notify("JS is compiled"))
    //.pipe(uglify())
    .pipe(gulp.dest('../assets/js/'));
  });

  /**
   * STYLES
   * SCSS compilation with gulp-sass.
   * For this one you must create a main.scss file that includes everything according with the needs
   */
  gulp.task('styles', function () {
    console.log('Sass is compiling...');

    gulp.src('scss/main.scss')
    .pipe(plumber())
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(notify("Sass is compiled"))
    .pipe(gulp.dest('../assets/css/'));

  });

  /**
   * WATCH : WIP
   * gulp will be watching for changes on JS and SCSS to compile everything.
   */
  gulp.task('watch', function () {
    console.log('Gulp is always watching');

    /**
     *
     */
    watch(['./js/**/*.js'], function(){
      gulp.start("scripts");
    });

    /**
     *
     */
    watch(['./scss/**/*.scss'], function() {
      gulp.start("styles");
    });
  });

  gulp.task(
    'default',
    [
      'scripts',
      'styles',
      'watch'
    ]
  );

}());
