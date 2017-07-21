var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    babel = require('babelify'),
    fileinclude = require('gulp-file-include'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    vinylSourceStream = require('vinyl-source-stream'),
    es = require('event-stream'),
    config = require('../../config');

gulp.task('js', ['js-vendor', 'js-map', 'js-app', 'js-jquery', 'js-balance']);

// Vendor scripts
gulp.task('js-vendor', config.wrapPipe(function(success, error) {

    return gulp.src(config.js.src.vendor)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }).on('error', error))
        .pipe(gulp.dest(config.js.dest.vendor))
}));

// Scripts/polyfills for legacy browsers
gulp.task('js-legacy', config.wrapPipe(function(success, error) {

    return gulp.src(config.jsLegacy.src)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }).on('error', error))
        .pipe(gulp.dest(config.jsLegacy.dest))
}));

// Map on contacts page
gulp.task('js-map', config.wrapPipe(function(success, error) {

    return gulp.src(config.js.src.map)
        .pipe(uglify().on('error', error))
        .pipe(gulp.dest(config.js.dest.map))
}));

gulp.task('js-balance', config.wrapPipe(function(success, error) {

    return gulp.src(config.js.src.balance)
        .pipe(uglify().on('error', error))
        .pipe(gulp.dest(config.js.dest.balance))
}));

gulp.task('js-jquery', config.wrapPipe(function(success, error) {

    return gulp.src(config.js.src.jquery)
        .pipe(uglify().on('error', error))
        .pipe(gulp.dest(config.js.dest.jquery))
}));


// User scripts
gulp.task('js-app', config.wrapPipe(function(success, error) {

    return gulp.src(config.js.src.app)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }).on('error', error))
        // .pipe(sourcemaps.init())
        .pipe(uglify().on('error', error))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.js.dest.app))
}));

gulp.task('browserify', function () {
  var files = [
    'app.js',
    'map.js'
  ];
  var tasks = files.map(function (entry) {
    return browserify({
      entries: ['build/js/' + entry],
      debug: true
    })
      .transform(babel)
      .bundle()
      .on('error', $.notify.onError({
        title: "Scripts Error",
        message: "<%= error.message %>"
      }))
      .pipe(vinylSourceStream(entry))
      // .pipe($.rename({
      //   extname: '.js'
      // }))
      .pipe(gulp.dest('build/js'))
  });
  return es.merge.apply(null, tasks);
});


gulp.task('lint', () => {
  return gulp.src('build/js/app.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});


