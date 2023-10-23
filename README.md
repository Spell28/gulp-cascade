
# Gulp cascade
My base gulp project for static websites.


## Features
- Web server with live reload via browser-sync
- Scss transpile support
- HTML pages by elements splitting
- Minification support (scss, js, html)
- Image optimization (avif, webp, jpg, png, svg)
- Cache for images
- Fonts optimization (ttf to woff and woff2)
- Asking the user via prompt if a user wants file optimization

## Installation

- Install gulp cli
```bash
npm install --global gulp-cli
```
- Clone this repository
- Enter to the project directory 
```bash
cd gulp-cascade
```
- Install dependencies
```bash
  npm install
```
- Run the project
```bash
  gulp
```
- Or build
```bash
  gulp build
```
- Enjoy

## Project tree
    .
    ├── dist                                # Transpiled and optimized files
    |    └── index.html                     # HTML Entry point
    |    └── assets                         # Css, Js, Images, Fonts
    |    |   ├── css                        # All css files
    |    |   ├── js                         # All js files
    |    |   ├── images                     # All images
    |    |   └── fonts                      # All fonts
    ├── gulpfile.esm.js                     # Gulp folder
    |    └── tasks                          # Tasks folder
    |    |   ├── fonts.js                   # Fonts task file
    |    |   ├── html.js                    # HTML task file
    |    |   ├── images.js                  # Images task file
    |    |   ├── optimize.js                # Optimization task file
    |    |   ├── scripts.js                 # Scripts task file
    |    |   ├── serve.js                   # Server task file
    |    |   └── styles.js                  # Styles task file
    |    ├── index.js                       # Gulp entry point file
    |    └── paths.js                       # All paths to directories for gulp configs
    ├── src                                 # Source files
    |    └── scss                           # Scss files
    |    |   ├── main.scss                  # Main scss file
    |    |   ├── _vars.scss                 # Scss variables
    |    |   ├── _mixines.scss              # Scss mixines
    |    |   └── _fonts.scss                # Project font-faces
    |    ├── elements                       # HTML elements for including into the pages
    |    ├── fonts                          # Fonts folder
    |    ├── images                         # Image folder
    |    ├── scripts                        # Js folder
    |    |   └── main.js                    # Main js file
    |    └── index.html                     # Entry point
    ├── package.json                        # Dependency list, ...etc
    ├── README.md                           # About project
    └── .gitignore                          # Ignoring files for git


## Docs
 - [Gulp official docs](https://gulpjs.com/docs/en/)
 - [Sass official docs](https://sass-lang.com/documentation/)


## Gulp plugins used
- gulp-sass
- gulp-autoprefixer
- gulp-sourcemaps
- gulp-minify-css
- gulp-uglify
- gulp-htmlmin
- gulp-file-include
- gulp-webp
- gulp-avif
- gulp-imagemin
- gulp-newer
- gulp-flatten
- gulp-if
- gulp-prompt
- gulp-fonter (With paths fix version)
- gulp-ttf2woff2


## TODO
- Search, install, and approval of standard javascript libraries


## Author
- [Spell](https://www.github.com/spell28)

