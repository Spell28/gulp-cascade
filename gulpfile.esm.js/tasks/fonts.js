import {src, dest} from 'gulp';
import flatten from 'gulp-flatten';
import browserSync from 'browser-sync';
import fonter from 'gulp-fonter-2';
import ttf2woff2 from 'gulp-ttf2woff2';

// Local imports
import paths from '../paths';


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

export default fonts;
