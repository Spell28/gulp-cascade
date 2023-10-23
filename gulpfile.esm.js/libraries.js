import {librariesArr} from './paths';


function libraries () {
  let collectCssUrls = [];
  let collectJsUrls = [];

  if (librariesArr.length > 0) {
    librariesArr.map(library => {
      library.css.length > 0 && library.css.map(cssUrl => collectCssUrls.push(cssUrl))
      library.js.length > 0 && library.js.map(jsUrl => collectJsUrls.push(jsUrl))
    })
  }
  return {
    css: collectCssUrls,
    js: collectJsUrls
  }
}

export default libraries;
