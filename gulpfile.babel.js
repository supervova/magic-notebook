/**
 * -----------------------------------------------------------------------------
 * 👮‍ GENERAL
 * -----------------------------------------------------------------------------
 */
// #region
import { src, dest, watch, series, parallel } from 'gulp';

import * as sass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import cleanCSS from 'gulp-clean-css';
import ghPages from 'gulp-gh-pages';
import gulpSass from 'gulp-sass';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import imageminGIF from 'imagemin-gifsicle';
import imageminJPG from 'imagemin-mozjpeg';
import imageminPNG from 'imagemin-pngquant';
import imageminSVG from 'imagemin-svgo';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import pug from 'gulp-pug';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import svgSprite from 'gulp-svg-sprite';
import uncss from 'postcss-uncss';
import webpack from 'webpack-stream';
import yargs from 'yargs';
import { deleteAsync } from 'del';
import { hideBin } from 'yargs/helpers';

const sassCompiler = gulpSass(sass);
const bsInstance = browserSync.create();

// Look for the --p flag
const { argv } = yargs(hideBin(process.argv));
const PRODUCTION = argv.p;

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
    src: [`${root.src}/**/*.mp4`],
    dest: `${root.dest}/video`,
  },

  rootFiles: {
    src: ['./*.html', './CNAME', './favicon.ico', './site.webmanifest'],
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
function clean() {
  return deleteAsync([
    `${paths.css.dest}/**/*.css`,
    `${paths.js.dest}/**/*.js`,
    `${paths.img.dest}/**/*.img`,
    // `!${paths.js.dest}/vendor/*.js`,
  ]);
}

function cleanSrc() {
  return deleteAsync([`${root.src}/**/*.css`]);
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 💾 SCRIPTS
 * -----------------------------------------------------------------------------
 */
// #region
// Webpack

function js() {
  const mode = PRODUCTION ? 'production' : 'development';
  // ⚠️ To use webpack keep main.js in root folder not in js subfolder
  return src(`${root.src}/main.js`)
    .pipe(changed(`${paths.js.dest}/**/*.js`))
    .pipe(plumber())
    .pipe(
      webpack({
        mode,
        entry: `${root.src}/main.js`,
        output: { filename: '[name].js' },
      })
    )
    .pipe(dest(paths.js.dest))
    .pipe(bsInstance.stream());
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
  return src(paths.js.backup).pipe(dest(paths.js.dest));
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🖼 IMAGES
 * -----------------------------------------------------------------------------
 */
// #region

// Common images function
const imgTasks = (source, subtitle) =>
  src(source)
    .pipe(changed(paths.img.dest))
    .pipe(
      imagemin(
        [
          imageminGIF({
            interlaced: true,
            optimizationLevel: 3,
          }),
          imageminJPG({ quality: 85 }),
          imageminPNG({ quality: [0.85, 0.95] }),
          imageminSVG({
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
              {
                name: 'cleanupIds',
                params: {
                  remove: false,
                  minify: false,
                  preserve: [],
                  preservePrefixes: [],
                  force: false,
                },
              },
            ],
          }),
        ],
        { verbose: true }
      )
    )
    .pipe(dest(paths.img.dest))
    .pipe(size({ title: `styles: ${subtitle}` }));

// Graphics
function imgGraphics(done) {
  imgTasks(
    paths.img.src.graphics, // src
    'graphics' // subtitle
  );
  done();
}

function imgContent(done) {
  imgTasks(
    paths.img.src.content, // src
    'content' // subtitle
  );
  done();
}

// OPTIMIZE
const img = parallel(imgGraphics, imgContent);

// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🎨 STYLES
 * -----------------------------------------------------------------------------
 */
// #region

// COMMON STYLES FUNCTION
const cssTasks = (source, subtitle, uncssHTML, destination, link = true) =>
  src(source)
    .pipe(changed(paths.css.dest))
    .pipe(plumber())
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(
      sassCompiler({
        precision: 4,
        includePaths: ['.'],
      }).on('error', (err) => {
        // eslint-disable-next-line no-console
        console.error('Error compiling Sass:', err.message);
        this.emit('end');
      })
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
          ])
        )
      )
    )
    .pipe(gulpif(PRODUCTION, cleanCSS()))
    .pipe(size({ title: `styles: ${subtitle}` }))
    .pipe(dest(destination))
    .pipe(bsInstance.stream());

// Main (overview)
function css(done) {
  cssTasks(
    paths.css.src, // src
    'main', // subtitle
    // uncssHTML; use array syntax for normal results
    [`${root.src}/pages/uncss/*.html`],
    paths.css.dest
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

function buildPug() {
  return src(paths.markup.src)
    .pipe(plumber())
    .pipe(
      pug({
        doctype: 'html',
        pretty: true,
        basedir: root.src,
      })
    )
    .pipe(size({ title: 'html' }))
    .pipe(dest(paths.markup.dest))
    .pipe(bsInstance.stream());
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * ❤️ SVG SPRITES
 * -----------------------------------------------------------------------------
 */
// #region

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
      })
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

// const { reload } = bsInstance;
function reload(done) {
  bsInstance.reload();
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
  bsInstance.init({
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
  parallel(css, js, video, docs)
  // parallel(css, jsCopy, video, docs),
);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📤 DEPLOY
 * -----------------------------------------------------------------------------
 */
// #region

function deploy() {
  return src(`${root.dest}/**/*`).pipe(ghPages());
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * ☑️ TASKS
 * -----------------------------------------------------------------------------
 */

/* eslint-disable no-multi-spaces */

export {
  cleanSrc,
  clean,
  video,
  docs as copy,
  buildPug as pug,
  svg,
  img,
  sprite,
  jsCopy as jsc,
  js,
  css,
  watchFiles as w,
  deploy,
  serve as s,
};

export default build;
