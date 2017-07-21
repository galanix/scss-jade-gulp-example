var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gcmq = require('gulp-group-css-media-queries'),
    // uncss = require('gulp-uncss'),
    config = require('../../config');


// Combine styles in Layout folder
gulp.task('concat-desktop-layout', function() {

    return gulp.src(config.scss.cssLayout + '*/*.desktop.scss')
        .pipe($.concat('layout.desktop.scss'))
        .pipe(gulp.dest(config.scss.concatscss))
});

gulp.task('concat-tablet-layout', function() {

    return gulp.src(config.scss.cssLayout + '*/*.tablet.scss')
        .pipe($.concat('layout.tablet.scss'))
        .pipe(gulp.dest(config.scss.concatscss))
});

gulp.task('concat-mobile-layout', function() {

    return gulp.src(config.scss.cssLayout + '*/*.mobile.scss')
        .pipe($.concat('layout.mobile.scss'))
        .pipe(gulp.dest(config.scss.concatscss))
});


// Combine styles in Components folder
gulp.task('concat-desktop-components', function() {

    return gulp.src(config.scss.cssComponents + '*/*.desktop.scss')
        .pipe($.concat('components.desktop.scss'))
        .pipe(gulp.dest(config.scss.concatscss))
});

gulp.task('concat-tablet-components', function() {

    return gulp.src(config.scss.cssComponents + '*/*.tablet.scss')
        .pipe($.concat('components.tablet.scss'))
        .pipe(gulp.dest(config.scss.concatscss))
});

gulp.task('concat-mobile-components', function() {

    return gulp.src(config.scss.cssComponents + '*/*.mobile.scss')
        .pipe($.concat('components.mobile.scss'))
        .pipe(gulp.dest(config.scss.concatscss))
});


gulp.task('scss', ['concat-desktop-layout', 'concat-tablet-layout', 'concat-mobile-layout', 
    'concat-desktop-components', 'concat-tablet-components', 'concat-mobile-components'], config.wrapPipe(function(success, error) {

    return gulp.src(config.scss.src)
        // .pipe($.sourcemaps.init())
        .pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
        // .pipe($.sourcemaps.write())
        .pipe($.postcss(config.postcss))
        .pipe($.autoprefixer())
        // .pipe(gcmq())
        // .pipe($.csso())
        // .pipe($.uncss(config.uncss))
        .pipe(gulp.dest(config.scss.dest))
}));

