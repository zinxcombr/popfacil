"use strict";
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const beautify = require('gulp-beautify');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    files: ["css/*.css", "**/*.html"],
    bsFiles: ["css/*.css", "**/*.html"],
    startPath: "index.html",
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}

// CSS
function css() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest("css/"))
}

// PUG
function build() {
  return gulp
  	.src(['pug/**/*.pug', '!pug/utilities/**'])
    .pipe(pug({
        basedir: "pug/"
    }))
    .pipe(gulp.dest('./'))
}

// Beautify HTML
function beautify_html() {
  return gulp
    .src('html/**/*.html')
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest('./'))
};

// Beautify CSS
function beautify_css() {
  return gulp
    .src('css/**/*.css')
    .pipe(beautify.css({ indent_size: 10 }))
    .pipe(gulp.dest('css/'))
};

// Watch files
function watchFiles() {
  gulp.watch("scss/**/*.scss", css);
  gulp.watch("pug/**/*.pug", build);
}

const watch = gulp.parallel(watchFiles, browserSync);
const beautifier = gulp.series(beautify_html, beautify_css);

exports.css = css;
exports.beautifier = beautifier;
exports.watch = watch;
exports.default = watch;