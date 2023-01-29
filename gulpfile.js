/**
 * -----------------------------------------------------------------------------
 * 👮‍ GENERAL
 * -----------------------------------------------------------------------------
 */
// #region
const {
  src, dest, watch, series, parallel,
} = require('gulp');

const browserSync = require('browser-sync').create();
const changed     = require('gulp-changed');
const gulpif      = require('gulp-if');
const plumber     = require('gulp-plumber');
const size        = require('gulp-size');
const sourcemaps  = require('gulp-sourcemaps');
const yargs       = require('yargs').alias('p', 'production');

// Look for the --p flag
const PRODUCTION  = !!(yargs.argv.production);

// Config
const root = {
  src: './src',
  dest: './dist',
};

const paths = {
  css: {
    src: `${root.src}/style.scss`,
    watch: `${root.src}/**/*.scss`,
    tmp: `${root.src}/css/`,
    dest: `${root.dest}/css/`,
  },

  markup: {
    src: [
      `${root.src}/pages/**/*.pug`,
      `!${root.src}/pages/**/_*.pug`,
      `!${root.src}/pages/base/*.pug`,
      `!${root.src}/pages/notes/*.pug`,
    ],
    watch: `${root.src}/**/*.pug`,
    toMin: `${root.dest.site}/**/*.html`,
    dest: `${root.dest}`,
  },

  img: {
    src: {
      graphics: [
        `${root.src}/**/*.{jpg,png,gif,svg}`,
        `!${root.src}/base/graphics/sprite/*.svg`,
        `!${root.src}/img/**/*`,
      ],
      content: `${root.src}/img/**/*.{jpg,png,gif,svg,webp}`,
    },
    watch: [
      `${root.src}/**/*.{jpg,png,gif,svg}`,
      `!${root.src}/base/graphics/sprite/*.svg`,
    ],
    dest: `${root.dest}/img/`,
  },

  svg: {
    src: `${root.src}/base/graphics/sprite/*.svg`,
    dest: `${root.src}/base/graphics`,
  },

  js: {
    src: {
      main: [
        `${root.src}/**/*.js`,
        `!${root.src}/add-ons/**/*.js`,
        `!${root.src}/js/vendor/*.js`,
      ],
    },
    backup: `${root.src}/_arj/main.js`,
    dest: `${root.dest}/js/`,
  },

  video: {
    src: [
      `${root.src}/**/*.mp4`,
    ],
    dest: `${root.dest}/video`,
  },

  rootFiles: {
    src: [
      './*.html',
      './CNAME',
      './favicon.ico',
      './site.webmanifest',
    ],
    dest: `${root.dest}`,
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
    `${paths.css.dest}/**/*.css`,
    `${paths.js.dest}/**/*.js`,
    `${paths.img.dest}/**/*.img`,
    // `!${paths.js.dest}/vendor/*.js`,
  ]);
}

function cleanSrc() {
  return del([`${root.src}/**/*.css`]);
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 💾 SCRIPTS
 * -----------------------------------------------------------------------------
 */
// #region
// Webpack
const webpack = require('webpack-stream');

function js() {
  const mode = (PRODUCTION) ? 'production' : 'development';
  // ⚠️ To use webpack keep main.js in root folder not in js subfolder
  return (
    src(`${root.src}/main.js`)
      .pipe(changed(`${paths.js.dest}/**/*.js`))
      .pipe(plumber())
      .pipe(
        webpack({
          mode,
          entry: `${root.src}/main.js`,
          output: { filename: '[name].js' },
        }),
      )
      .pipe(dest(paths.js.dest))
      .pipe(browserSync.stream())
  );
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 👯‍♀️ COPY
 * -----------------------------------------------------------------------------
 */
// #region
function video() {
  return src(paths.video.src)
    .pipe(changed(paths.video.dest))
    .pipe(dest(paths.video.dest));
}

function docs() {
  return src(paths.rootFiles.src)
    .pipe(changed(paths.rootFiles.dest))
    .pipe(dest(paths.rootFiles.dest));
}

function jsCopy() {
  return src(paths.js.backup)
    .pipe(dest(paths.js.dest));
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
const imgTasks = (source, subtitle) => src(source)
  .pipe(changed(paths.img.dest))
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
  .pipe(dest(paths.img.dest))
  .pipe(size({ title: `styles: ${subtitle}` }));

// Graphics
function imgGraphics(done) {
  imgTasks(
    paths.img.src.graphics, // src
    'graphics', // subtitle
  );
  done();
}

function imgContent(done) {
  imgTasks(
    paths.img.src.content, // src
    'content', // subtitle
  );
  done();
}

// OPTIMIZE
const img = parallel(
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
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const uncss = require('postcss-uncss');

// COMMON STYLES FUNCTION
const cssTasks = (
  source, subtitle, uncssHTML, destination, link = true,
) => src(source)
  .pipe(changed(paths.css.dest))
  .pipe(plumber())
  .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
  .pipe(
    sass({
      precision: 4,
      includePaths: ['.'],
    }).on('error', sass.logError),
  )
// autoprefixer (browserslist) has been set in package.json
  .pipe(autoprefixer({ cascade: false }))
  .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
  .pipe(dest(paths.css.tmp))
  .pipe(
    gulpif(
      PRODUCTION,
      gulpif(
        link,
        postcss([
          uncss({
            html: uncssHTML,
            ignore: [
              /* eslint-disable max-len */
              // Bootstrap
              /\w\.fade/,
              /\w\.show/,
              /\.collapse?(ing)?/,
              /\.carousel(-[a-zA-Z]+)?/,
              /\.modal(-[a-zA-Z]+)?/,

              // Custom
              /\[data-has-shared-alert\]\.is-invalid/,
              /\.[hs]laquo-[a-z0-9]+/,
              /\.[mp][btlrx]-(((sm|md|mdl|lg|xl|xxl)-)*?)[0-9s]+/,
              /\.form__control\.is-textarea\.is-touched/,
              /\.form__control\.is-touched/,
              /\.mx-(.*?)auto+/,
              /\.vk/,
              /\w\.(has-been-validated|has-spinner|is-active|is-on|is-open|is-pressed|is-touched)/,
              /iframe/,
              /* eslint-enable max-len */
            ],
          }),
        ]),
      ),
    ),
  )
  .pipe(gulpif(PRODUCTION, cleanCSS()))
  .pipe(size({ title: `styles: ${subtitle}` }))
  .pipe(dest(destination))
  .pipe(browserSync.stream());

// Main (overview)
function css(done) {
  cssTasks(
    paths.css.src, // src
    'main', // subtitle
    // uncssHTML; use array syntax for normal results
    [`${root.src}/pages/uncss/*.html`],
    paths.css.dest,
  );
  done();
}

// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📰 MARKUP
 * -----------------------------------------------------------------------------
 */
// #region

// PUG
const pug = require('gulp-pug');

function buildPug() {
  return src(paths.markup.src)
    .pipe(plumber())
    .pipe(
      pug({
        doctype: 'html',
        pretty: true,
        basedir: root.src,
      }),
    )
    .pipe(size({ title: 'html' }))
    .pipe(dest(paths.markup.dest))
    .pipe(browserSync.stream());
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
  return src(paths.svg.src)
    .pipe(
      svgSprite({
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
      }),
    )
    .pipe(dest(paths.svg.dest));
}

const sprite = series(svg, parallel(css, imgGraphics));
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
function watchFiles() {
  watch(paths.css.watch, series(css));
  watch(paths.js.src.main, series(js));
  watch(paths.svg.src).on('change', series(sprite, reload));
  watch(paths.img.watch).on('change', series(img, reload));
  watch(paths.markup.watch, series(buildPug));
  watch(paths.rootFiles.src, series(docs, reload));
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: root.dest,
    },
    port: 9000,
    notify: false,
  });
  watchFiles();
  done();
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🏗️ DEFAULT TASK
 * -----------------------------------------------------------------------------
 */
// #region
const build = series(
  clean,
  svg,
  img,
  buildPug,
  parallel(css, js, video, docs),
  // parallel(css, jsCopy, video, docs),
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
  return src(`${root.dest}/**/*`)
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
exports.pug      = buildPug;
exports.svg      = svg;
exports.img      = img;
exports.sprite   = sprite;
exports.jsc      = jsCopy;
exports.js       = js;
exports.css      = css;
exports.w        = watchFiles;
exports.deploy   = deploy;
exports.s        = serve;
exports.default  = build;
