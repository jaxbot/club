'use strict';

console.log("Hello user! :) I fight for the programs");
// Gulp plugins
var del         = require('del'),
    fs          = require('fs'),
    gulp        = require('gulp'),
    merge       = require('merge-stream'),
    path        = require('path'),
    swig        = require('swig'),
    yaml        = require('js-yaml'),
    symlink     = require('gulp-symlink'),
    browserSync = require('browser-sync'),
    plugins     = require('gulp-load-plugins')({
      rename: { // Make sure these non-standard named gulp plugins load correctly
        'gulp-front-matter': 'frontMatter',
      }
    });

// Plugin configs
var htmlminOpts = {
  removeAttributeQuotes: false,
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: false,
  removeStyleLinkTypeAttributes: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
}

const timestamp = new Date().toISOString().replace(/[^\w]/g, '-');

swig.setDefaults({ cache: false });

// HTML task
gulp.task('html', function() {
  return gulp.src([
    './_src/**/*.html',
    '!./_src/assets/',
    '!./_src/assets/**'
  ])
    .pipe(plugins.plumber())
    .pipe(plugins.frontMatter({ property: 'page', remove: true }))
    .pipe(plugins.data(function(file) {
      return {
        site: yaml.safeLoad(fs.readFileSync('./_data/config.yml', 'utf8')),
        page: file.page
      };
    }))
    .pipe(plugins.tap(function(file) {
      var tpl  = swig.compileFile(file.path),
          data = {
            site: file.data.site,
            page: file.data.page,
            content: file.contents.toString()
          }

      file.contents = new Buffer(tpl(data), 'utf8');
    }))
    .pipe(plugins.htmlmin(htmlminOpts))
    .pipe(plugins.rename('index.html'))
    .pipe(gulp.dest(function(file) {
      if (!file.data.page.homepage) {
        return path.join('./_dist', file.data.page.slug);
      } else {
        return './_dist';
      }
    }))
    .pipe(plugins.size({ title: 'html' }))
    .pipe(browserSync.stream());
});

// Content task
gulp.task('content', function() {
  return gulp.src([
    './_src/**/*.md',
    '!./_src/assets/',
    '!./_src/assets/**'
  ])
    .pipe(plugins.plumber())
    .pipe(plugins.frontMatter({ property: 'page', remove: true }))
    .pipe(plugins.data(function(file) {
      return {
        site: yaml.safeLoad(fs.readFileSync('./_data/config.yml', 'utf8')),
        page: file.page
      };
    }))
    .pipe(plugins.marked())
    .pipe(plugins.tap(function(file) {
      var tpl  = swig.compileFile('./_src/assets/templates/' + file.data.page.template + '.html'),
          data = {
            site: file.data.site,
            page: file.data.page,
            content: file.contents.toString()
          }

      file.contents = new Buffer(tpl(data), 'utf8');
    }))
    .pipe(plugins.htmlmin(htmlminOpts))
    .pipe(plugins.rename('index.html'))
    .pipe(gulp.dest(function(file) {
      return path.join('./_dist', file.data.page.slug);
    }))
    .pipe(plugins.size({ title: 'content' }))
    .pipe(browserSync.stream());
});

// Fonts task
gulp.task('fonts', function() {
  return gulp.src([
    './_src/assets/font/**/*',
  ])
    .pipe(plugins.plumber())
    .pipe(gulp.dest('./_dist/assets/font'))
    .pipe(plugins.size({ title: 'fonts' }))
    .pipe(browserSync.stream());
});

// SCSS task
gulp.task('styles', function() {
  return gulp.src('./_src/assets/scss/styles.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.autoprefixer('last 1 version'))
    .pipe(plugins.rename('styles.min.css'))
    .pipe(gulp.dest('./_dist/assets/css'))
    .pipe(plugins.size({ title: 'styles' }))
    .pipe(browserSync.stream());
});

// Scripts task
gulp.task('scripts', function() {
  var scripts = gulp.src([
      './_src/assets/js/**/*.js',
    ])
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./_dist/assets/js'));

  return scripts.pipe(plugins.plumber())
    .pipe(plugins.size({ title: 'scripts' }))
    .pipe(browserSync.stream());
})

// Optimizes images
gulp.task('images', function() {
  return gulp.src('./_src/assets/img/**/*')
    .pipe(plugins.plumber())
    .pipe(plugins.cache(plugins.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('./_dist/assets/img'))
    .pipe(plugins.size({ title: 'images' }))
    .pipe(browserSync.stream());
});

// Static resources
gulp.task('static', function() {
  return gulp.src('./_src/public/**/*')
    .pipe(plugins.plumber())
    .pipe(gulp.dest('./_dist/'))
    .pipe(plugins.size({ title: 'static' }))
    .pipe(browserSync.stream());
});

// Release create task
gulp.task('release:create', ['build'], function(done) {
  return gulp.src('./_dist/**/*')
    .pipe(gulp.dest('_releases/' + timestamp))
    .on('end', function() {
      return gulp.src('_releases/' + timestamp)
        .pipe(symlink('_releases/current', { force: true }))
        .on('end', done);
    })
});

// Release cleanup task
gulp.task('release:cleanup', ['release:create'], function(done) {
  del([
    '_releases/*',
    '!_releases/' + timestamp,
    '!_releases/current'],
  done);
});

// Clear cache
gulp.task('clear', function(done) {
  return require('gulp-cache').clearAll(done);
});

// Build task
gulp.task('build', ['static', 'html', 'content', 'styles', 'scripts', 'fonts', 'images']);

// Serve task
gulp.task('serve', ['build', 'watch'], function() {
  browserSync.init({
    server: {
      baseDir: './_dist'
    }
  });
});

// Release task
gulp.task('release', ['release:create', 'release:cleanup']);

// Watch task
gulp.task('watch', function() {
  gulp.watch(['./_src/**/*.html', './_src/**/*.md', '_data/*.yml'], ['html', 'content']);
  gulp.watch(['./_src/**/*.xml', './_src/**/*.txt'], ['build']);
  gulp.watch(['./_src/assets/scss/**/*.scss'], ['styles']);
  gulp.watch(['./_src/assets/js/**/*.js'], ['scripts']);
});

// Default task
gulp.task('default', ['build', 'watch']);
