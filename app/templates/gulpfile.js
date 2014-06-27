var gulp = require('gulp');

var inlinesource = require('gulp-inline-source');
var inlineCss = require('gulp-inline-css');
var connect = require('gulp-connect');

var paths = {
  html: '*.html',
  styles: 'styles/*.css',
  dist: 'build',
};

gulp.task('build', function() {
  return gulp.src(paths.html)
    .pipe(inlinesource())
    .pipe(inlineCss({
      preserveMediaQueries: true,
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('connect', function() {
  connect.server({
    livereload: true,
  });
});

gulp.task('reload', function() {
  gulp.src(paths.html)
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch([paths.html, paths.styles], ['reload']);
});

gulp.task('default', ['connect', 'watch']);

