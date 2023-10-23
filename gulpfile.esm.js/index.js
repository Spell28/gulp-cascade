import { series, parallel } from 'gulp';

// Local imports
import styles from './tasks/styles';
import scripts from './tasks/scripts';
import html from './tasks/html';
import images from './tasks/images';
import fonts from './tasks/fonts';
import { optimize } from './tasks/optimize';
import serve from './tasks/serve';


// Build task
exports.build = series(
  optimize,
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
