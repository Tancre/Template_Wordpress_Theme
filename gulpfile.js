const { src, dest, series, parallel, task, watch} = require('gulp'),
browserSync = require('browser-sync').create(),
sass = require('gulp-sass')(require('sass')),
postcss = require('gulp-postcss'),
cssnano = require('cssnano'),
webpack = require("webpack-stream"),
webpackConfig = require("./webpack.config.js");

// Reload Browser
browserSync.init({
  injectChanges: true,
  notify: false,
  open: false,
  proxy: 'http://localhost:10003/',    // Proxy from local flywheel
  ghostMode: false,
  browser: '-browser "firefox_dev"',
  reloadDelay: 1000
});

function reloadBrowser(done) {
  browserSync.reload(); 
  done();
}

// CSS Task
function cssTask() {
  return src('./assets/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
    //.pipe(postcss([ cssnano() ]))            // for later to minify the css
    .pipe(dest('.', { sourcemaps: '.' }));
};

// JS Task
function jsTask() {
  return src('./assets/js/**/*.js')
  .pipe( webpack(webpackConfig, null, function (err, stats) {
      if (err) { console.log(err); }
  }))
  .pipe(dest('.'));
};

exports.reloadBrowser = reloadBrowser;
exports.PHP = reloadBrowser;
exports.CSS = cssTask;
exports.JS = jsTask;

// Watch Task
task('watch', () => {
  watch('./**/*.php', series('PHP'));
  watch('./assets/scss/**/*.scss', series('CSS', 'reloadBrowser'));
  watch('./assets/js/**/*.js', series('JS', 'reloadBrowser'));
});

