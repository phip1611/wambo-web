const gulp = require('gulp');
const gulp_gzip = require('gulp-gzip');
const gulp_brotli = require('gulp-brotli');

const filePattern = "dist/**/*.{js,css,html,txt,ico,svg,xml,json,webmanifest}";

/*
  Dateien statisch vorkomprimieren, damit der nginx (oder apache)
  sie ausliefern kann.
 */

gulp.task('static_brotli', () => {
  return gulp.src(filePattern)
    .pipe(gulp_brotli.compress({
      quality: 9
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('static_gzip', () => {
  return gulp.src(filePattern)
    .pipe(gulp_gzip({gzipOptions: {
        level: 8,
        extension: 'gz'
      }}))
    .pipe(gulp.dest('dist'));
});

gulp.task('post_prod-build', gulp.parallel('static_brotli', 'static_gzip'));
