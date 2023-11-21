# Wordpress Theme Template
A template to buil Wordpress themes in combination with Local by Flywheel and Gulp.

## Structure
```bash
.
├── 404.php
├── assets
│   ├── js
│   │   ├── modules
│   │   │   └── Test.js
│   │   └── Script.js
│   └── scss
│       ├── base
│       │   ├── _colors.scss
│       │   ├── _fonts.scss
│       │   ├── _functions.scss
│       │   ├── _global.scss
│       │   └── _mixins.scss
│       ├── modules
│       └── style.scss
├── footer.php
├── functions.php
├── gulpfile.js
├── header.php
├── index.php
├── readme.md
├── screenshot.png
└── single.php
```

## Dependencies 
**jquery** / **normilize.css** (CSS)
 
### Dev
- **gulp** (automation)
- **browserSync** (browser reload)
- **SASS** / **autoprefixer** / **cssnano** (CSS)
- **esbuild** / **uglify** (JS)

## Gulp Tasks
**CSS** - Bundle css (without autoprefixer and nano) and creates .map.

**JS** - Bundle js (without uglify).

**watch** - Watch to CSS, JS and PHP and reload browser.

**deploy** - Runs the CSS (with autoprefixer and nano) and JS (with uglify) task and copies everything needed into the new folder <code>/dist</code>.


