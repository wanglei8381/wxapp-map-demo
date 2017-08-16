var gulp = require('gulp');
var px2rpx = require('./gulp-px2rpx');
var alias = require('./gulp-alias');
var watch = require('./watch');
var del = require('del');
var config = require('./config');

var jsPath = './src/**/*.js'
var cssPath = './src/**/*.wxss'
var jsonPath = './src/**/*.json'
var xmlPath = './src/**/*.wxml'

gulp.task('js', function () {
  return gulp.src(jsPath)
    .pipe(watch(jsPath))
    .pipe(alias(config.alias))
    .pipe(gulp.dest('./dist'))
});

gulp.task('wxss', function () {
  return gulp.src(cssPath)
    .pipe(watch(cssPath))
    .pipe(px2rpx())
    .pipe(gulp.dest('./dist'))
});

gulp.task('wxml', function () {
  return gulp.src(xmlPath)
    .pipe(watch(xmlPath))
    .pipe(gulp.dest('./dist'))
});

gulp.task('json', function () {
  return gulp.src(jsonPath)
    .pipe(watch(jsonPath))
    .pipe(gulp.dest('./dist'))
});

gulp.task('move', function () {
  return gulp.src(['./src/images/*.*'
  ]).pipe(gulp.dest('./dist/images'))
});

gulp.task('default', ['js', 'wxss', 'wxml', 'json', 'move'])

gulp.task('dev', ['default'])

gulp.task('build', function () {
  del.sync('./dist')
  gulp.run(['default'])
})
