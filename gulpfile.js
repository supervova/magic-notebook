/**
 * -----------------------------------------------------------------------------
 * 👮‍ GENERAL
 * -----------------------------------------------------------------------------
 */
// #region

const browserSync = require('browser-sync').create();
const changed     = require('gulp-changed');
const gulp        = require('gulp');
const gulpif      = require('gulp-if');
const plumber     = require('gulp-plumber');
const size        = require('gulp-size');
const sourcemaps  = require('gulp-sourcemaps');
const yargs       = require('yargs').alias('p', 'production');

// Look for the --p flag
const PRODUCTION  = !!(yargs.argv.production);

// Config
const config = {
  src: './src',
  dest: './dist',
};

const settings = {
  server: {
    html: {
      server: {
        baseDir: config.dest,
      },
      port: 9000,
      notify: false,
    },
  },

  css: {
    src: `${config.src}/style.scss`,
    watch: `${config.src}/**/*.scss`,
    tmp: `${config.src}/css/`,
    dest: `${config.dest}/css/`,
  },

  markup: {
    watch: `${config.dest}/index.html`,
  },

  img: {
    src: {
      graphics: [
        `${config.src}/**/*.{jpg,png,gif,svg}`,
        `!${config.src}/base/icons/sprite/*.svg`,
        `!${config.src}/img/**/*`,
      ],
      content: `${config.src}/img/**/*.{jpg,png,gif,svg,webp}`,
    },
    watch: [
      `${config.src}/**/*.{jpg,png,gif,svg}`,
      `!${config.src}/base/icons/sprite/*.svg`,
    ],
    dest: `${config.dest}/img/`,
  },

  svg: {
    src: `${config.src}/base/icons/sprite/*.svg`,
    dest: `${config.src}/base/icons`,
    options: {
      mode: {
        symbol: {
          dest: '.', // Mode specific output directory
          sprite: 'sprite.svg', // Sprite path and name
          prefix: '.', // Prefix for CSS selectors
          dimensions: '', // Suffix for dimension CSS selectors
          example: true, // Create an HTML example document
        },
      },
      svg: {
        xmlDeclaration: false, // strip out the XML attribute
        doctypeDeclaration: false, // don't include the !DOCTYPE declaration
      },
    },
  },

  js: {
    src: {
      main: [
        `${config.src}/**/*.js`,
        `!${config.src}/add-ons/**/*.js`,
        `!${config.src}/js/vendor/*.js`,
      ],
      plugins: [
        // `${config.src}/js/vendor/popper.min.js`,
        './node_modules/bootstrap/js/dist/util.js', // Required for carousel
        './node_modules/bootstrap/js/dist/carousel.js',
        './node_modules/bootstrap/js/dist/modal.js',
      ],
    },
    dest: `${config.dest}/js/`,
  },

  video: {
    src: [
      `${config.src}/**/*.mp4`,
    ],
    dest: `${config.dest}/video`,
  },

  rootFiles: {
    src: [
      './*.html',
      './CNAME',
      './favicon.ico',
      './site.webmanifest',
    ],
    dest: `${config.dest}`,
  },
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🛠 UTILITIES
 * -----------------------------------------------------------------------------
 */
// #region

// CLEAN
const del = require('del');

function clean() {
  return del([
    `${settings.css.dest}/**/*.css`,
    `${settings.js.dest}/**/*.js`,
    `!${settings.js.dest}/vendor/*.js`,
  ]);
}

function cleanSrc() {
  return del([`${config.src}/**/*.css`]);
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 💾 SCRIPTS
 * -----------------------------------------------------------------------------
 */
// #region

const babel  = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Common scripts function
const jsTasks = (src, file, compiler) => gulp.src(src)
  .pipe(plumber())
  .pipe(changed(settings.js.dest))
  .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
  .pipe(gulpif(compiler, babel({ presets: ['@babel/preset-env'] })))
  .pipe(concat(`${file}.js`))
  .pipe(uglify())
  .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
  .pipe(size({ title: `styles: ${file}` }))
  .pipe(gulp.dest(settings.js.dest))
  .pipe(browserSync.stream());

// Plugins
function jsPlugins(done) {
  jsTasks(
    settings.js.src.plugins, // src
    'plugins', // file
  );
  done();
}

// Main
function jsMain(done) {
  jsTasks(
    settings.js.src.main, // src
    'main', // file
    true,
  );
  done();
}

// SCRIPTS BUILD
const js = gulp.series(
  jsMain,
  jsPlugins,
);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 👯‍♀️ COPY
 * -----------------------------------------------------------------------------
 */
// #region
function video() {
  return gulp.src(settings.video.src)
    .pipe(changed(settings.video.dest))
    .pipe(gulp.dest(settings.video.dest));
}

function docs() {
  return gulp.src(settings.rootFiles.src)
    .pipe(changed(settings.rootFiles.dest))
    .pipe(gulp.dest(settings.rootFiles.dest));
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🖼 IMAGES
 * -----------------------------------------------------------------------------
 */
// #region

const imagemin    = require('gulp-imagemin');
const imageminGIF = require('imagemin-gifsicle');
const imageminJPG = require('imagemin-mozjpeg');
const imageminPNG = require('imagemin-pngquant');
const imageminSVG = require('imagemin-svgo');

// Common images function
const imgTasks = (src, subtitle) => gulp.src(src)
  .pipe(changed(settings.img.dest))
  .pipe(
    imagemin(
      [
        imageminGIF({
          interlaced: true,
          optimizationLevel: 3,
        }),
        imageminJPG({ quality: 85 }),
        imageminPNG([0.85, 0.95]),
        imageminSVG({
          plugins: [
            { removeViewBox: false },
            { cleanupIDs: false },
          ],
        }),
      ],
      { verbose: true },
    ),
  )
  .pipe(gulp.dest(settings.img.dest))
  .pipe(size({ title: `styles: ${subtitle}` }));

// Graphics
function imgGraphics(done) {
  imgTasks(
    settings.img.src.graphics, // src
    'graphics', // subtitle
  );
  done();
}

function imgContent(done) {
  imgTasks(
    settings.img.src.content, // src
    'content', // subtitle
  );
  done();
}

// OPTIMIZE
const img = gulp.parallel(
  imgGraphics,
  imgContent,
);

// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🎨 STYLES
 * -----------------------------------------------------------------------------
 */
// #region

const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const sass         = require('gulp-sass');
const unCSS        = require('gulp-uncss');

// COMMON STYLES FUNCTION
const cssTasks = (src, subtitle, uncssHTML, dest, link = true) => gulp.src(src)
  .pipe(plumber())
  // .pipe(changed(settings.css.dest))
  .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
  .pipe(sass({
    precision: 4,
    includePaths: ['.'],
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
  .pipe(gulp.dest(settings.css.tmp))
  .pipe(
    gulpif(
      PRODUCTION,
      gulpif(link, unCSS({

        // In case of an error, try to add the array brackets
        html: uncssHTML,

        // CSS Selectors for UnCSS to ignore
        ignore: [

          // Bootstrap & Magnific Popup
          /* eslint-disable max-len */
          /\w\.in/, /(#|\.)navbar(-[a-zA-Z]+)?/, /(#|\.)modal(-[a-zA-Z]+)?/, /(#|\.)dropdown(-[a-zA-Z]+)?/, /(#|\.)carousel(-[a-zA-Z]+)?/, /(#|\.)(open)/, /\.fade/, /\.collaps/, /\.in/, /\.mfp/,

          // Custom
          /#user-login .captcha/, /#views-exposed-form-projects-page/, /\.breadcrumb-item/, /\.d-lg-block/, /\.edit-captcha-response/, /\.form-submit/, /\.form-wrapper/, /\.has-icon.event::before/, /\.has-outstanding-article-body .article-body/, /\.has-rail/, /\.hidden/, /\.hlaquo-h1/, /\.media-wrapper.has-lg-img/, /\.metric.fluid/, /\.metric.wide/, /\.mosaic.fits-to-container/, /\.mosaic.outstanding/, /\.page-header-map-wrapper/, /\.page-header-preloader/, /\.pager-first/, /\.pager-last/, /\.pager-previous/, /\.pic-deputy.col-md-3/, /\.play-it/, /\.rail/, /\.search-cancel/, /\.search-headline/, /\.search-reset/, /\.search-toggler/, /\.sec-illustrated-l img/, /\.sec-illustrated-r img/, /\.section-news/, /\.slaquo-h1/, /\.snuggled-right/, /\.vk/, /\.vr-friendly/, /div.left/, /figure.small-portrait/, /iframe/, /img.left/, /li:nth-child(n+6)/, /\.mt-lg-18/, /\.pb-lg-16/, /\.pb-42/, /\.pt-36/, /\.pt-18/, /\.pt-33/, /\.pt-lg-0/, /\.pt-lg-14/, /\.pt-lg-67/, /\.pt-lg-67/,
          /* eslint-enable max-len */
        ],
      })),
    ),
  )
  .pipe(gulpif(PRODUCTION, cleanCSS({ level: { 1: { specialComments: 0 } } })))
  .pipe(size({ title: `styles: ${subtitle}` }))
  .pipe(gulp.dest(dest))
  .pipe(browserSync.stream());

// MAIN settings.css.src
function cssMain(done) {
  cssTasks(
    settings.css.src, // src
    'main', // subtitle
    // uncssHTML; use array syntax for normal results
    [`${config.dest}/index.html`],
    settings.css.dest,
  );
  done();
}

// #endregion

/**
 * -----------------------------------------------------------------------------
 * ❤️ SVG SPRITES
 * -----------------------------------------------------------------------------
 */
// #region

const svgSprite = require('gulp-svg-sprite');

function svg() {
  return gulp.src(settings.svg.src)
    .pipe(svgSprite(settings.svg.options))
    .pipe(size({ title: 'Main sprite' }))
    .pipe(gulp.dest(settings.svg.dest));
}

const sprite = gulp.series(
  svg,
  cssMain,
  imgGraphics,
);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📶 SERVER
 * -----------------------------------------------------------------------------
 */
// #region

// const { reload } = browserSync;
function reload(done) {
  browserSync.reload();
  done();
}

// WATCHERS
function watch() {
  gulp.watch(settings.css.watch, gulp.series(cssMain));
  gulp.watch(settings.js.src.main, gulp.series(jsMain));
  gulp.watch(settings.svg.src, gulp.series(sprite, reload));
  // Don't use arrays here
  gulp.watch(settings.img.watch, gulp.series(img, reload));
  gulp.watch(settings.rootFiles.src, gulp.series(docs, reload));
}

function server(done) {
  browserSync.init(settings.server.html);
  done();
  watch();
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🏗️ DEFAULT TASK
 * -----------------------------------------------------------------------------
 */
// #region
const build = gulp.series(
  clean,
  svg,
  img,
  gulp.parallel(cssMain, js, video, docs),
);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📤 DEPLOY
 * -----------------------------------------------------------------------------
 */
// #region

const ghPages = require('gulp-gh-pages');

function deploy() {
  return gulp.src(`${config.dest}/**/*`)
    .pipe(ghPages());
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * ☑️ TASKS
 * -----------------------------------------------------------------------------
 */

/* eslint-disable no-multi-spaces */

exports.cleanSrc = cleanSrc;
exports.clean    = clean;
exports.video    = video;
exports.copy     = docs;
exports.svg      = svg;
exports.img      = img;
exports.sprite   = sprite;
exports.js       = js;
exports.css      = cssMain;
exports.w        = watch;
exports.deploy   = deploy;
exports.s        = server;
exports.default  = build;
