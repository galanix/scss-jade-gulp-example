var gulp  = require('gulp'),
    browsersync = require('browser-sync'),
    config = require('../../config'),
    watch = require('gulp-watch');

gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('jade-watch', ['jade'], function (done) {
    browsersync.reload();
    done();
});

gulp.task('scss-watch', ['scss'], function (done) {
    browsersync.reload();
    done();
});

gulp.task('js-watch', ['js'], function (done) {
    browsersync.reload();
    done();
});

gulp.task('images-watch', ['images'], function (done) {
    browsersync.reload();
    done();
});

gulp.task('svg-watch', ['svg'], function (done) {
    browsersync.reload();
    done();
});

// https://www.browsersync.io/docs/gulp
gulp.task('watch', ['setWatch'], function() {
    browsersync(config.browsersync);
    gulp.watch(config.watch.scss, ['scss-watch']);
    gulp.watch(config.watch.js, ['js-watch']);
    gulp.watch(config.watch.img, ['images']);
    gulp.watch(config.watch.svg, ['svg-watch']);
    gulp.watch(config.watch.jade, ['jade-watch']);
});


