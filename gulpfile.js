const { series, parallel, src, dest, watch } = require('gulp');
const gulpSass = require('gulp-sass');
const sassCompiler = require('sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const minifyCSS = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const htmlmin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const flatten = require('gulp-flatten');
const gulpIf = require('gulp-if');
const prompt = require('gulp-prompt');
const fonter = require('gulp-fonter-2');
const ttf2woff2 = require('gulp-ttf2woff2');


// Paths for source and distribution files
const paths = {
  src: {
    scss: 'src/scss/**/*.scss',
    js: 'src/scripts/**/*.js',
    html: 'src/**/*.html',
    htmlElements: 'src/elements/**/*.html',
    images: 'src/images/*',
    fonts: 'src/fonts/*.*',
  },
  dist: {
    css: 'dist/assets/css',
    js: 'dist/assets/js',
    html: 'dist',
    images: 'dist/assets/images',
    fonts: 'dist/assets/fonts',
  },
};

const sass = gulpSass(sassCompiler);
let shouldOptimize = true;

// Ask the user about files optimization
function optimizePrompt() {
  return src('.')
    .pipe(prompt.prompt({
      type: 'input',
      name: 'optimize',
      message: 'Do you want to optimize files (yes/no)?',
    }, function(response) {
      shouldOptimize = response.optimize.toLowerCase() === 'yes' || response.optimize.toLowerCase() === 'y';
    }))
}

// Compile SCSS, autoprefix, generate sourcemaps, and minify CSS
function styles() {
  return src([paths.src.scss, '!src/scss/_*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpIf(shouldOptimize, minifyCSS()))
    .pipe(gulpIf(shouldOptimize, sourcemaps.write('.')))
    .pipe(flatten())
    .pipe(dest(paths.dist.css))
    .pipe(browserSync.stream());
}

// Minify JavaScript
function scripts() {
  return src(paths.src.js)
    .pipe(gulpIf(shouldOptimize, uglify()))
    .pipe(flatten())
    .pipe(dest(paths.dist.js))
    .pipe(browserSync.stream());
}

// Minify HTML
function html() {
  return src([paths.src.html, `!${paths.src.htmlElements}`])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulpIf(shouldOptimize, htmlmin({ collapseWhitespace: true })))
    .pipe(flatten())
    .pipe(dest(paths.dist.html))
    .pipe(browserSync.stream());
}

// Optimize images
function images() {
  return src([paths.src.images, `!${paths.src.images}.svg`])
    .pipe(newer(paths.dist.images))
    .pipe(avif({ quality: 50 }))

    .pipe(src(paths.src.images))
    .pipe(newer(paths.dist.images))
    .pipe(webp())

    .pipe(src(paths.src.images))
    .pipe(newer(paths.dist.images))
    .pipe(imagemin({silent: true}))

    .pipe(dest(paths.dist.images))
    .pipe(browserSync.stream());
}

// Convert all .ttf fonts to woff/woff2 and place them to assets folder
function fonts() {
  return src(paths.src.fonts)
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src(`${paths.dist.fonts}*.ttf`))
    .pipe(ttf2woff2())
    .pipe(flatten())
    .pipe(dest(paths.dist.fonts))
    .pipe(browserSync.stream());
}

// Serve the site and watch for file changes
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    port: 3000,
  });

  watch(paths.src.scss, styles);
  watch(paths.src.js, scripts);
  watch(paths.src.images, images);
  watch(paths.src.fonts, fonts);
  watch(paths.src.html, html).on('change', browserSync.reload);
}

// Build task
exports.build = series(
  optimizePrompt,
  parallel(
    styles,
    scripts,
  ),
  html,
  images,
  fonts,
);

// Default task
exports.default = series(
  parallel(
    styles,
    scripts,
  ),
  html,
  images,
  fonts,
  serve,
);
