var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    config = require('../../config');
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminGifsicle = require('imagemin-gifsicle'),
    imageminSvgo = require('imagemin-svgo'),

gulp.task('webp', ['images'], function () {
     return gulp.src(['src/img/*.jpg', 'src/img/*.png'])
         .pipe($.cached('src/img'))
         .pipe($.webp())
         .pipe(gulp.dest('build/img'))
});

gulp.task('images', ['sprites'], config.wrapPipe(function(success, error) {
    return gulp.src(config.images.src)
        .pipe($.newer(config.images.dest))
        .pipe($.imagemin(config.imagemin.images))
        .pipe(gulp.dest(config.images.dest))
}));
