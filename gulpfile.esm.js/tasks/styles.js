import {src, dest} from 'gulp';
import gulpIf from 'gulp-if';
import flatten from 'gulp-flatten';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import minifyCSS from 'gulp-minify-css';

// Local imports
import paths from '../paths';
import { shouldOptimize } from './optimize';


const sass = gulpSass(sassCompiler); // Select gulp-sass compiler


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

export default styles;
