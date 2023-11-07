const { src, dest, series, parallel, task, watch} = require('gulp'),
browserSync = require('browser-sync').create(),
sass = require('gulp-sass')(require('sass')),
postcss = require('gulp-postcss'),
cssnano = require('cssnano'),
autoprefixer = require('autoprefixer'),
{createGulpEsbuild} = require('gulp-esbuild'),
gulpEsbuild = createGulpEsbuild({ incremental: true }),
uglify = require('gulp-uglify');;

// Reload Browser
browserSync.init({
  injectChanges: true,
  notify: false,
  open: false,
  proxy: 'xxx.local',    // Proxy from local flywheel
  ghostMode: false,
  browser: '-browser "firefox_dev"',
  reloadDelay: 1000
});

function syncBrowser(done) {
  browserSync.reload(); 
  done();
}

// CSS Task
function cssTask() {
  return src('./assets/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
    // .pipe(postcss([ cssnano(), autoprefixer() ]))    // for dist
    .pipe(dest('.', { sourcemaps: '.' }));
};

// JS Task
function jsTask() {
  return src('./assets/js/Script.js')
    .pipe(gulpEsbuild({
        outfile: 'Script.js',
        bundle: true,
    }))
    .pipe(uglify())
    .pipe(dest('.'))
}

exports.syncBrowser = syncBrowser;
exports.PHP = syncBrowser;
exports.CSS = cssTask;
exports.JS = jsTask;

// Watch Task
task('watch', () => {
  watch('./**/*.php', series('PHP'));
  watch('./assets/scss/**/*.scss', series('CSS', 'syncBrowser'));
  watch('./assets/js/**/*.js', series('JS', 'syncBrowser'));
});