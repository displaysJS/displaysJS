"use strict";

var browserify = require('browserify');
var babelify   = require('babelify');
var buffer     = require('vinyl-buffer');
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var uglify     = require('gulp-uglify');
var livereload = require('gulp-livereload');
var merge      = require('merge');
var rename     = require('gulp-rename');
var source     = require('vinyl-source-stream');
var sourceMaps = require('gulp-sourcemaps');
var watchify   = require('watchify');

var config = {
    js: {
        src: './displays.js',
        outputDir: './dist/js/',
        mapDir: './maps/',
        outputFile: 'displays.js',
        outputMinFile: 'displays.min.js'
    },
};

function bundle (bundler) {
    bundler
      .bundle()
      .pipe(source(config.js.src))
      .pipe(buffer())
      .pipe(rename(config.js.outputFile))
      .pipe(sourceMaps.init({ loadMaps : true }))
      .pipe(sourceMaps.write(config.js.mapDir))
      .pipe(gulp.dest(config.js.outputDir))
      .pipe(livereload());
}


gulp.task('watch', function () {
    livereload.listen();
    var args = merge(watchify.args, { debug : true});
    var bundler = browserify(config.js.src, args)
                   .plugin(watchify, { ignoreWatch: ['**/node_modules'] })
                   .transform(babelify, { presets : [ 'es2015' ] });

    bundle(bundler);

    bundler.on('update', function () {
      bundle(bundler);
    });
});

gulp.task('bundle', function () {
    var bundler = browserify(config.js.src)
                              .transform(babelify, { presets : [ 'es2015' ] })
    bundle(bundler);
})
