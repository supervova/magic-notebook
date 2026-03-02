// -----------------------------------------------------------------------------
// #region: 👮‍ GENERAL
// -----------------------------------------------------------------------------

import gulp from 'gulp';
import { PassThrough } from 'node:stream';

import * as sass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import gulpSass from 'gulp-sass';
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
import yargs from 'yargs/yargs';
import { deleteAsync } from 'del';
import { hideBin } from 'yargs/helpers';

const sassCompiler = gulpSass(sass);

const bsInstance = browserSync.create();
const argv = yargs(hideBin(process.argv)).parse();
const IS_PRODUCTION = Boolean(argv.p);

const { src, dest, watch, series, parallel } = gulp;

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
    src: ['./*.html', './CNAME', './favicon.ico', './manifest.json'],
    dest: `${root.dest}`,
  },
};
// #endregion

// -----------------------------------------------------------------------------
// #region: 🛠 UTILITIES
// -----------------------------------------------------------------------------

const clean = () =>
  deleteAsync([
    `${paths.css.dest}/**/*.css`,
    `${paths.js.dest}/**/*.js`,
    `${paths.img.dest}/**/*`,
  ]);
const cleanSrc = () => deleteAsync([`${root.src}/**/*.css`]);

let imageminModulePromise = null;
const loadImagemin = () => {
  if (!imageminModulePromise) {
    imageminModulePromise = import('gulp-imagemin');
  }
  return imageminModulePromise;
};
// #endregion

// -----------------------------------------------------------------------------
// #region: 💾 SCRIPTS
// -----------------------------------------------------------------------------

const js = () => {
  const mode = IS_PRODUCTION ? 'production' : 'development';
  return src(paths.js.src)
    .pipe(changed(paths.js.dest))
    .pipe(plumber())
    .pipe(webpack({ mode, output: { filename: '[name].js' } }))
    .pipe(dest(paths.js.dest))
    .pipe(bsInstance.stream());
};
// #endregion

// -----------------------------------------------------------------------------
// #region: 👯‍♀️ COPY
// -----------------------------------------------------------------------------

const copyVideo = () =>
  src(paths.video.src, { allowEmpty: true, encoding: false })
    .pipe(changed(paths.video.dest))
    .pipe(dest(paths.video.dest));
const copyRootFiles = () =>
  src(paths.rootFiles.src, { encoding: false })
    .pipe(changed(paths.rootFiles.dest))
    .pipe(dest(paths.rootFiles.dest));
// #endregion

// -----------------------------------------------------------------------------
// #region: 🖼 IMAGES
// -----------------------------------------------------------------------------

const imgTasks = (source, subtitle) => {
  const out = new PassThrough({ objectMode: true });

  loadImagemin()
    .then(({ default: imagemin }) => {
      const stream = src(source, { encoding: false })
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

      stream.on('error', (err) => out.emit('error', err));
      stream.pipe(out);
    })
    .catch((err) => out.emit('error', err));

  return out;
};

const imgGraphics = () => imgTasks(paths.img.src.graphics, 'graphics');

const imgContent = () => imgTasks(paths.img.src.content, 'content');

// OPTIMIZE
const img = parallel(imgGraphics, imgContent);
// #endregion

// -----------------------------------------------------------------------------
// #region: 🎨 STYLES
// -----------------------------------------------------------------------------

const cssTasks = (source, subtitle, uncssHTML, destination, link = true) =>
  src(source)
    .pipe(changed(paths.css.dest))
    .pipe(plumber())
    .pipe(gulpif(!IS_PRODUCTION, sourcemaps.init()))
    .pipe(
      sassCompiler({
        precision: 4,
        includePaths: ['.'],
        ...(IS_PRODUCTION
          ? {}
          : {
              logger: sass.Logger.silent,
              quietDeps: true,
            }),
      }).on('error', function onSassError(err) {
        // eslint-disable-next-line no-console
        console.error('Error compiling Sass:', err.message);
        this.emit('end');
      })
    )
    // autoprefixer (browserslist) has been set in package.json
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulpif(!IS_PRODUCTION, sourcemaps.write()))
    .pipe(dest(paths.css.tmp))
    .pipe(
      gulpif(
        IS_PRODUCTION,
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
    .pipe(gulpif(IS_PRODUCTION, cleanCSS()))
    .pipe(size({ title: `styles: ${subtitle}` }))
    .pipe(dest(destination))
    .pipe(bsInstance.stream());

const css = () =>
  cssTasks(
    paths.css.src,
    'main',
    [`${root.src}/pages/uncss/*.html`],
    paths.css.dest
  );
// #endregion

// -----------------------------------------------------------------------------
// #region: ❤️ SVG SPRITES
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// #region: 📰 MARKUP
// -----------------------------------------------------------------------------

const buildPug = () =>
  src(paths.markup.src)
    .pipe(plumber())
    .pipe(pug({ doctype: 'html', pretty: true, basedir: root.src }))
    .pipe(size({ title: 'html' }))
    .pipe(dest(paths.markup.dest))
    .pipe(bsInstance.stream());
// #endregion

// -----------------------------------------------------------------------------
// #region: 📶 SERVER
// -----------------------------------------------------------------------------

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
  bsInstance.init(
    {
      listen: '127.0.0.1',
      server: { baseDir: root.dest },
      port: 9000,
      notify: false,
      open: false,
    },
    (err) => {
      if (err) {
        done(err);
        return;
      }

      watchFiles();
      done();
    }
  );
};
// #endregion

// -----------------------------------------------------------------------------
// #region: 🏗️ BUILD AND SERVE
// -----------------------------------------------------------------------------

const build = series(
  clean,
  parallel(img, buildPug, css, js, copyVideo, copyRootFiles)
);

const s = series(build, serve);

// #endregion

// -----------------------------------------------------------------------------
// #region: ☑️ TASKS
// -----------------------------------------------------------------------------

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

// #endregion
