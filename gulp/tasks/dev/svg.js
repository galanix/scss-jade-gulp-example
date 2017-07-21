var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    config = require('../../config');

gulp.task('svg', function () {
  return gulp
    .src(config.svg.src)
    .pipe($.svgmin({
      plugins: [
        {
          removeAttrs: {
            attrs: ['fill']
          }
        }
      ]
    }))
    .pipe($.svgstore({inlineSvg: true}))
    .pipe($.svg2string())
    .pipe(gulp.dest('src/js/partials'));
});
