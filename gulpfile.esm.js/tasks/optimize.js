import { src } from 'gulp';
import prompt from 'gulp-prompt';


export let shouldOptimize = true; // Default setting for file optimization

// Ask the user about files optimization
export function optimize() {
  return src('.')
    .pipe(prompt.prompt({
      type: 'input',
      name: 'optimize',
      message: 'Do you want to optimize Scss, Js, HTML files? (Y/N)',
    }, function(response) {
      shouldOptimize = response.optimize.toLowerCase() === 'yes' || response.optimize.toLowerCase() === 'y';
    }))
}
