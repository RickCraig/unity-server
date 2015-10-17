'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  bump = require('gulp-bump'),
  tag = require('gulp-tag-version'),
  logger = require('./lib/services/logger'),
  config = require('./lib/config'),
  pm2 = require('pm2'),
  runSequence = require('run-sequence');

var paths = {
  scripts: ['lib/*.js', 'index.js'],
  packages: [
    'package.json'
  ]
};

gulp.task('test', function (done) {

});

gulp.task('patch', function() {
  return gulp.src(paths.packages)
    .pipe(bump({type: 'patch'}))
    .pipe(gulp.dest('./'));
});

gulp.task('minor', function() {
  return gulp.src(paths.packages)
    .pipe(bump({type: 'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('major', function() {
  return gulp.src(paths.packages)
    .pipe(bump({type: 'major'}))
    .pipe(gulp.dest('./'));
});

gulp.task('tag', function() {
  return gulp.src(paths.packages[0])
    .pipe(tag());
});

gulp.task('release', function() {
  runSequence('lint', 'test');
});

gulp.task('release-patch', function() {
  runSequence('lint', 'test', 'patch', 'tag');
});

gulp.task('release-minor', function() {
  runSequence('lint', 'test', 'minor', 'tag');
});

gulp.task('release-major', function() {
  runSequence('lint', 'test','major', 'tag');
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('pm2', function() {
  pm2.connect(function() {

    pm2.restart('Unityserver', function(err, instance) {
      if (!err && instance) {
        pm2.disconnect();
        return logger.info('Unityserver instance restarted');
      }

      pm2.stop('Unityserver', function() {
        logger.info('Stopped all Unityserver Processes');
        pm2.delete('Unityserver', function() {
          logger.info('Deleted all Unityserver Processes');
          // Start a new set of instances if none exist
          pm2.start({
            name: 'Unityserver',
            script    : './',
            exec_mode : 'cluster',
            instances : 1,
            max_memory_restart : '100M',
            port: config.port
          }, function(err, apps) {
            for (var process in apps) {
              var app = apps[process];
              logger.info('Server instance started: ' + process);
              logger.info('id: %s, state: %s, name: %s', app.id, app.state, app.pm2_env.name);
            }
            pm2.disconnect();
          });// End of Start
        });// End of Delete
      });// End of Stop
    });// End of Reload
  });// End of Connect
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'pm2']);
});

gulp.task('default', ['pm2', 'watch', 'lint']);
