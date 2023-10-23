import {src, dest} from 'gulp';
import gulpIf from 'gulp-if';
import flatten from 'gulp-flatten';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import minifyCSS from 'gulp-minify-css';
import concat from 'gulp-concat';

// Local imports
import paths from '../paths';
import libraries from '../libraries';
import { shouldOptimize } from './optimize';


const sass = gulpSass(sassCompiler); // Select gulp-sass compiler


// Compile SCSS, autoprefix, generate sourcemaps, and minify CSS
function styles() {
  const librariesCollection = libraries()
  let srcPathes = [paths.src.scss, '!src/scss/_*.scss', ...librariesCollection.css]

  return src(srcPathes)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpIf(shouldOptimize, minifyCSS()))
    .pipe(concat('main.css'))
    .pipe(gulpIf(shouldOptimize, sourcemaps.write('.')))
    .pipe(flatten())
    .pipe(dest(paths.dist.css))
    .pipe(browserSync.stream());
}

export default styles;
