const { src, dest, series, task, watch } = require("gulp"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass")(require("sass")),
  postcss = require("gulp-postcss"),
  cssnano = require("cssnano"),
  autoprefixer = require("autoprefixer"),
  { createGulpEsbuild } = require("gulp-esbuild"),
  gulpEsbuild = createGulpEsbuild({ incremental: true }),
  uglify = require("gulp-uglify"),
  gulpif = require("gulp-if");

const proxyLocal = "localhost:3000"; // Proxy from local flywheel

let distro = false;

// CSS Task
function cssTask() {
  return (
    src("./assets/scss/**/*.scss", { sourcemaps: true })
      .pipe(
        sass({ includePaths: ["./node_modules"] }).on("error", sass.logError)
      )
      .pipe(gulpif(!distro, dest(".", { sourcemaps: "." })))
      // distro only
      .pipe(gulpif(distro, postcss([cssnano(), autoprefixer()])))
      .pipe(gulpif(distro, dest("./dist")))
  );
}
exports.CSS = cssTask;

// JS Task
function jsTask() {
  return (
    src("./assets/js/Script.js")
      .pipe(
        gulpEsbuild({
          outfile: "Script.js",
          bundle: true,
        })
      )
      .pipe(gulpif(!distro, dest(".")))
      // distro only
      .pipe(gulpif(distro, uglify()))
      .pipe(gulpif(distro, dest("./dist")))
  );
}
exports.JS = jsTask;

// Copy to Distro
function copyToDist() {
  return src(["./LICENSE", "./screenshot.png", "./*.php"]).pipe(
    dest("./dist/")
  );
}

// Reload Browser
function syncBrowser(done) {
  browserSync.reload();
  done();
}

// Watch Task
task("watch", () => {
  // Init browserSync
  browserSync.init({
    injectChanges: true,
    notify: false,
    open: false,
    proxy: proxyLocal,
    ghostMode: false,
    browser: "firefox",
    reloadDelay: 1000,
  });

  watch("./**/*.php", series(syncBrowser));
  watch("./assets/scss/**/*.scss", series(cssTask, syncBrowser));
  watch("./assets/js/**/*.js", series(jsTask, syncBrowser));
});

const deploy = () => {
  distro = true;

  cssTask(deploy);
  jsTask(deploy);
  copyToDist();

  return console.log(">>>>>>>>>> Distro is ready!");
};
exports.deploy = deploy;
