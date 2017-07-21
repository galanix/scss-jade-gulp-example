// var gulp = require('gulp'),
//     $ = require('gulp-load-plugins')(),
//     config = require('../../config');

// gulp.task('scss-email', ['style-modules'], config.wrapPipe(function(success, error) {

//     return gulp.src(config.scss.src)
//         .pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
//         .pipe($.postcss([ 
//             require('postcss-unprefix'),
//             require('postcss-csssimple'),
//             ])
//         )
//         .pipe($.autoprefixer())
//         .pipe(gulp.dest(config.scss.dest))
// }));

// gulp.task('inline-css', ['scss-email'], function() {
//     return gulp.src('build/email.html')
//         .pipe($.inlineCss())
//         .pipe(gulp.dest('build/'));
// });


// gulp.task('style-modules', function() {

//     return gulp.src(config.styleModules.src)
//         .pipe($.concat('_modules.scss'))
//         .pipe(gulp.dest(config.styleModules.dest))
// });
