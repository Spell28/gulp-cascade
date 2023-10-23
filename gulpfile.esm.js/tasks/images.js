import {src, dest} from 'gulp';
import browserSync from 'browser-sync';
import webp from 'gulp-webp';
import avif from 'gulp-avif';
import imageMin from 'gulp-imagemin';
import newer from 'gulp-newer';

// Local imports
import paths from '../paths';


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
    .pipe(imageMin({silent: true}))

    .pipe(dest(paths.dist.images))
    .pipe(browserSync.stream());
}

export default images;
