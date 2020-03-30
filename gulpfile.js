const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const reload = browserSync.reload;

gulp.task('css', function() {
  return gulp
    .src('./scss/main.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('browse', function() {
  // Serve files from the root of this project
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./views/**/*.pug').on('change', gulp.series('html'));
  gulp.watch('./js/**/*.js').on('change', reload);
  gulp.watch('./scss/**/*.scss', gulp.series('css'));
});

gulp.task('html', function() {
  return gulp
    .src('./views/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'))
    .on('end', reload);
});

gulp.task('default', gulp.series('browse', 'html', 'css'));
