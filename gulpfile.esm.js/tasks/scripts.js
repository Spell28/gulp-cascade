import {src, dest} from 'gulp';
import gulpIf from 'gulp-if';
import flatten from 'gulp-flatten';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';


// Local imports
import paths from '../paths';
import libraries from '../libraries';
import { shouldOptimize } from './optimize';


// Minify JavaScript
function scripts() {
  const librariesCollection = libraries()
  let srcPathes = [paths.src.js, ...librariesCollection.js]

  return src(srcPathes)
    .pipe(gulpIf(shouldOptimize, uglify()))
    .pipe(concat('main.js'))
    .pipe(flatten())
    .pipe(dest(paths.dist.js))
    .pipe(browserSync.stream());
}

export default scripts;
