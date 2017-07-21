// http://pugofka.com/blog/technology/the-prepared-starting-package-front-end-development-on-gulp/

var dest = "./build";
var src = "./src";

var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminPngquant = require('imagemin-pngquant');
var imageminGifsicle = require('imagemin-gifsicle');
var imageminSvgo = require('imagemin-svgo');

var paths = { 
    src: {
        html: 'src/*.jade',
        jade: ['src/**/*.jade', '!src/components-collection/**/*.jade'],
        css: 'src/main.css',
        cssLayout: 'src/scss/layout/',
        cssComponents: 'src/scss/components/',
        concatscss: 'src/scss/concat-scss/',
        scss: 'src/scss/main.scss',
        jsVendor: 'src/js/vendor.js',
        jsJquery: 'src/js/jquery-1.12.4.min.js',
        jsApp: 'src/js/app.js',
        jsBalance: 'src/js/balance.js',
        jsMap: 'src/js/map.js',
        jsLegacy: 'src/js/legacy.js',
        fonts: ['src/fonts/**/*.*'],
        images: ['src/img/**/*.*', '!src/img/sprite/**/*.*', '!src/img/sprite-2x/**/*.*', '!src/img/svg/*.svg'],
        webp: ['build/img/**/*.jpg', 'build/img/**/*.png'],
        sprites: ['src/img/sprite/**/*.png', 'src/img/sprite-2x/**/*.png'],
        sprites2x: 'src/img/sprite-2x/**/*@2x.png',
        styleSprites: 'src/scss/partials',
        svg: 'src/img/svg/*.svg',
        favicons: 'src/favicons/*'
    },

    dest: { 
        html: dest,
        jade: dest,
        css: dest + '/css',
        scss: dest + '/css',
        jsVendor: dest + '/js',
        jsApp: dest + '/js',
        jsBalance: dest + '/js',
        jsJquery: dest + '/js',
        jsMap: dest + '/js',
        jsLegacy: dest + '/js',
        fonts: dest + '/fonts',
        images: dest + '/img',
        sprites: 'src/img',
        svgSprite: 'src/templates',
        favicons: dest + '/favicons'
    },
    

    watch: {
        scss: ['src/scss/**/*.scss', '!src/scss/concat-scss/*.scss', '!src/scss/partials/_sprites.scss'],
        js: 'src/js/**/*.js',
        img: ['src/img/**/*.*', '!src/img/sprite.png', '!src/img/sprite-2x.png'],
        svg: 'src/img/svg/*.svg',
        jade: 'src/**/*.jade',
        fonts: ['src/fonts/**/*.*']
    }
};

module.exports = {

    html: {
        src: paths.src.html,
        dest: paths.dest.html
    },

    jade: {
        src: paths.src.jade,
        dest: paths.dest.jade
    },

    htmlPrettify: {
        'unformatted': [ 'pre', 'code', 'textarea' ],
        'indent_with_tabs': true,
        'preserve_newlines': true,
        'brace_style': 'expand',
        'end_with_newline': true
    },

    scss: {
        src: paths.src.scss,
        dest: paths.dest.scss,
        cssLayout: paths.src.cssLayout,
        cssComponents: paths.src.cssComponents,
        concatscss: paths.src.concatscss
    },

    postcss: [
            require('postcss-normalize'),
            // https://github.com/yisibl/postcss-unprefix - remove all prefixes
            require('postcss-unprefix'),
            // https://github.com/10up/flexibility - begin with -js-display: ie flex fallback
            // require('postcss-flexibility'), 
            // https://github.com/bfred-it/object-fit-images - add object-fit - ie fallback
            // require('postcss-object-fit-images'),
            // https://www.npmjs.com/package/postcss-csssimple
            // require('postcss-csssimple'),
    ],

    uncss: {
        html: ['index.html'],
        ignore: [/\.browser-upgrade/, /\.is-active/, /\.active/]
    },

    js: {
        src: {
            vendor: paths.src.jsVendor,
            app: paths.src.jsApp,
            map: paths.src.jsMap,
            balance: paths.src.jsBalance,
            jquery: paths.src.jsJquery,
        },
        dest: {
            vendor: paths.dest.jsVendor,
            app: paths.dest.jsApp,
            map: paths.dest.jsMap,
            balance: paths.dest.jsBalance,
            jquery: paths.dest.jsJquery
        },
    },

    jsLegacy: {
        src: paths.src.jsLegacy,
        dest: paths.dest.jsLegacy
    },

    images: {
        src: paths.src.images,
        dest: paths.dest.images
    },

    imagemin: {
        images: [
            imageminGifsicle({
                interlaced: true,
                optimizationLevel: 3
            }),
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 70
            }),
            imageminPngquant({ quality: '75-85' }),
            imageminSvgo({
                plugins: [
                    { removeViewBox: false }
                ]
            })
        ]
    },

    webp: {
        src: paths.src.webp,
        dest: paths.dest.webp
    },

    sprites: {
        src: paths.src.sprites,
        src2x: paths.src.sprites2x,
        dest: {
            css: paths.src.styleSprites,
            img: paths.dest.sprites,
        },
        dest2x: {
            css: paths.src.styleSprites,
            img: paths.dest.sprites2x,
        },
    },

    sprites2x: {
        src: paths.src.sprites2x
    },

    svg: {
        src: paths.src.svg,
        dest: paths.dest.svg
    },

    svgSprite: {
        src: paths.src.svgSprite,
        dest: paths.dest.svgSprite
    },

    favicons: {
        src: paths.src.favicons,
        dest: paths.dest.favicons
    },

    fonts: {
        src: paths.src.fonts,
        dest: paths.dest.fonts
    },

    browsersync: {
        server: {
            baseDir: dest
        },
        tunnel: false,
        open: "local",
        host: 'localhost',
        port: 3000,
        logPrefix: "webserver"
    },

    watch: {
        scss: paths.watch.scss,
        js: paths.watch.js,
        img: paths.watch.img,
        svg: paths.watch.svg,
        jade: paths.watch.jade,
    },

    // https://habrahabr.ru/post/259225/
    // https://gist.github.com/a1ip/d6f25c31dacb3b96c8cc
    wrapPipe: function(taskFn) {
        return function(done) {
            var onSuccess = function() {
                done();
            };
            var onError = function(err) {
                done(err);
            }
            var outStream = taskFn(onSuccess, onError);
            if(outStream && typeof outStream.on === 'function') {
                outStream.on('end', onSuccess);
            }
        }
    }
};

// https://www.mikestreety.co.uk/blog/advanced-gulp-file
// https://makina-corpus.com/blog/metier/2015/make-your-gulp-modular
// https://www.freshconsulting.com/how-to-organize-your-gulp-js-development-builds-for-multiple-environments
