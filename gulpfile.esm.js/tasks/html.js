import {src, dest} from 'gulp';
import gulpIf from 'gulp-if';
import flatten from 'gulp-flatten';
import browserSync from 'browser-sync';
import htmlMin from 'gulp-htmlmin';
import fileInclude from 'gulp-file-include';

// Local imports
import paths from '../paths';
import { shouldOptimize } from './optimize';


// Minify HTML
function html() {
  return src([paths.src.html, `!${paths.src.htmlElements}`])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulpIf(shouldOptimize, htmlMin({ collapseWhitespace: true })))
    .pipe(flatten())
    .pipe(dest(paths.dist.html))
    .pipe(browserSync.stream());
}

export default html;
