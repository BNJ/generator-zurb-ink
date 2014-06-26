var gulp = require('gulp');

var inlinesource = require('gulp-inline-source');
var inlineCss = require('gulp-inline-css');

var paths = {
  html: '*.html',
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

