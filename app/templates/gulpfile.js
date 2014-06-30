var gulp = require('gulp');

var inlinesource = require('gulp-inline-source');
var inlineCss = require('gulp-inline-css');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

var paths = {
  html: '*.html',
  styles: 'styles/*.css',
  images: 'images/*',
  dist: 'build/',
};

gulp.task('inline', function() {
  return gulp.src(paths.html)
    .pipe(inlinesource())
    .pipe(inlineCss({
      preserveMediaQueries: true,
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('imagemin', function() {
  gulp.src(paths.images)
    .pipe(imagemin({
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(paths.dist + 'images'));
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

gulp.task('clean', require('del').bind(null, [paths.dist]));

gulp.task('build', ['inline', 'imagemin']);

gulp.task('default', ['connect', 'watch']);

