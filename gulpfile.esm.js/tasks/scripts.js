import {src, dest} from 'gulp';
import gulpIf from 'gulp-if';
import flatten from 'gulp-flatten';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';


// Local imports
import paths from '../paths';
import { shouldOptimize } from './optimize';


// Minify JavaScript
function scripts() {
  return src(paths.src.js)
    .pipe(gulpIf(shouldOptimize, uglify()))
    .pipe(flatten())
    .pipe(dest(paths.dist.js))
    .pipe(browserSync.stream());
}

export default scripts;
