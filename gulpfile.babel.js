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
import gulpif from 'gulp-if';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import imageminGIF from 'imagemin-gifsicle';
import imageminJPG from 'imagemin-mozjpeg';
import imageminPNG from 'imagemin-pngquant';
import imageminSVG from 'imagemin-svgo';
import newer from 'gulp-newer';
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
const { argv } = yargs(hideBin(process.argv));
const PRODUCTION = argv.p;

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
    src: [`${root.src}/pages/**/*.pug`, `!${root.src}/pages/pug/*.pug`],
    watch: `${root.src}/**/*.pug`,
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
    src: `${root.src}/main.js`,
    dest: `${root.dest}/js/`,
  },
  video: {
    src: [`${root.src}/**/*.mp4`, `!${root.src}/_arj/**/*.mp4`],
    dest: `${root.dest}/video`,
  },
  rootFiles: {
    src: ['./*.html', './CNAME', './favicon.ico', 'manifest.json'],
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
const clean = () =>
  deleteAsync([
    `${paths.css.dest}/**/*.css`,
    `${paths.js.dest}/**/*.js`,
    `${paths.img.dest}/**/*.img`,
  ]);
const cleanSrc = () => deleteAsync([`${root.src}/**/*.css`]);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 💾 SCRIPTS
 * -----------------------------------------------------------------------------
 */
// #region
const js = () => {
  const mode = PRODUCTION ? 'production' : 'development';
  return src(paths.js.src)
    .pipe(changed(paths.js.dest))
    .pipe(plumber())
    .pipe(webpack({ mode, output: { filename: '[name].js' } }))
    .pipe(dest(paths.js.dest))
    .pipe(bsInstance.stream());
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 👯‍♀️ COPY
 * -----------------------------------------------------------------------------
 */
// #region
const copyVideo = () =>
  src(paths.video.src, { encoding: false })
    .pipe(changed(paths.video.dest))
    .pipe(dest(paths.video.dest));
const copyRootFiles = () =>
  src(paths.rootFiles.src, { encoding: false })
    .pipe(changed(paths.rootFiles.dest))
    .pipe(dest(paths.rootFiles.dest));
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🖼 IMAGES
 * -----------------------------------------------------------------------------
 */
// #region
const imgTasks = (source, subtitle) =>
  src(source, { encoding: false })
    .pipe(newer(paths.img.dest))
    .pipe(
      imagemin(
        [
          imageminGIF({ interlaced: true, optimizationLevel: 3 }),
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
    .pipe(size({ title: `images: ${subtitle}` }));

const imgGraphics = (done) => {
  imgTasks(paths.img.src.graphics, 'graphics');
  done();
};

const imgContent = (done) => {
  imgTasks(paths.img.src.content, 'content');
  done();
};

// OPTIMIZE
const img = parallel(imgGraphics, imgContent);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🎨 STYLES
 * -----------------------------------------------------------------------------
 */
// #region
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

const css = (done) => {
  cssTasks(
    paths.css.src,
    'main',
    [`${root.src}/pages/uncss/*.html`],
    paths.css.dest
  );
  done();
};
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
 * 📰 MARKUP
 * -----------------------------------------------------------------------------
 */
// #region
const buildPug = () =>
  src(paths.markup.src)
    .pipe(plumber())
    .pipe(pug({ doctype: 'html', pretty: true, basedir: root.src }))
    .pipe(size({ title: 'html' }))
    .pipe(dest(paths.markup.dest))
    .pipe(bsInstance.stream());
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📶 SERVER
 * -----------------------------------------------------------------------------
 */
// #region
const reload = (done) => {
  bsInstance.reload();
  done();
};

const watchFiles = () => {
  watch(paths.css.watch, series(css));
  watch(paths.js.src, series(js));
  watch(paths.markup.watch, series(buildPug));
  watch(paths.img.watch, series(img, reload));
  watch(paths.rootFiles.src, series(copyRootFiles, reload));
};

const serve = (done) => {
  bsInstance.init({
    server: { baseDir: root.dest },
    port: 9000,
    notify: false,
  });
  watchFiles();
  done();
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🏗️ BUILD AND SERVE
 * -----------------------------------------------------------------------------
 */
// #region
const build = series(
  clean,
  parallel(img, buildPug, css, js, copyVideo, copyRootFiles)
);

const s = series(build, serve);

// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📤 DEPLOY
 * -----------------------------------------------------------------------------
 */
// #region
// USE DEPLOY.SH INSTEAD
// import ghPages from 'gulp-gh-pages';
// const deploy = () => src(`${root.dest}/**/*`).pipe(ghPages());
// #endregion

/**
 * -----------------------------------------------------------------------------
 * ☑️ TASKS
 * -----------------------------------------------------------------------------
 */

export {
  cleanSrc,
  clean,
  copyVideo as copy,
  copyRootFiles,
  buildPug as pug,
  sprite,
  img,
  js,
  css,
  s,
  serve,
  watchFiles,
};

export default build;
