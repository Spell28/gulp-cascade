import { watch } from 'gulp';
import browserSync from 'browser-sync';


// Local imports
import paths from '../paths';
import styles from './styles';
import scripts from './scripts';
import html from './html';
import images from './images';
import fonts from './fonts';

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

export default serve;
