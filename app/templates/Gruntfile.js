'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'WebContent',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,

    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'WebContent/libs/bower'
        },
        files: {
          'jquery/js/jquery.js': 'jquery/dist/jquery.js',
          'jquery/js/jquery.min.js': 'jquery/dist/jquery.min.js',
          'jquery/js/jquery.min.map': 'jquery/dist/jquery.min.map',
          'backbone/js/backbone.js': 'backbone/backbone.js',
          'underscore/js/underscore.js': 'underscore/underscore.js',
          'backbone.marionette/js/backbone.marionette.js': 'backbone.marionette/lib/core/backbone.marionette.js',
          'backbone.paginator/js/backbone.paginator.js': 'backbone.paginator/lib/backbone.paginator.js',
          'backbone.wreqr/js/backbone.wreqr.js': 'backbone.wreqr/lib/backbone.wreqr.js',
          'backbone.babysitter/js/backbone.babysitter.js': 'backbone.babysitter/lib/backbone.babysitter.js',
          'backbone-forms/js/backbone-forms.js': 'backbone-forms/distribution/backbone-forms.js',
          'backbone-forms/js/list.js': 'backbone-forms/distribution/editors/list.js',
          'backbone.bootstrap-modal/js/backbone.bootstrap-modal.js': 'backbone.bootstrap-modal/src/backbone.bootstrap-modal.js',
          'backgrid/js/backgrid.js': 'backgrid/lib/backgrid.js',
          'backgrid-paginator/js/backgrid-paginator.js': 'backgrid-paginator/backgrid-paginator.js',
          'backgrid-paginator/css/backgrid-paginator.css': 'backgrid-paginator/backgrid-paginator.css',
          'x-editable/js/bootstrap-editable.js': 'x-editable/dist/bootstrap-editable/js/bootstrap-editable.js',
          'x-editable/css/bootstrap-editable.css': 'x-editable/dist/bootstrap-editable/css/bootstrap-editable.css',
          'x-editable/img/clear.png': 'x-editable/dist/bootstrap-editable/img/clear.png',
          'jquery-toggles/js/toggles.min.js': 'jquery-toggles/toggles.min.js',
          'tag-it/js/tag-it.js': 'tag-it/js/tag-it.js',
          'jquery-ui/js/jquery-ui-1.10.3.custom.js': 'jquery-ui/ui/minified/jquery-ui.min.js',
          'jquery-timeago/js/jquery.timeago.js': 'jquery-timeago/jquery.timeago.js',
          'globalize/js/globalize.js': 'globalize/lib/globalize.js',
          'moment/js/moment-with-langs.min.js': 'moment/min/moment-with-locales.min.js',
          'requirejs/js/require.js': 'requirejs/require.js',
          'requirejs-text/js/text.js': 'requirejs-text/text.js',
          'bootbox/js/bootbox.js': 'bootbox/bootbox.js',
          'backgrid-filter/js/backgrid-filter.js': 'backgrid-filter/backgrid-filter.js',
          'backgrid-filter/css/backgrid-filter.min.css': 'backgrid-filter/backgrid-filter.min.css',
          'bootstrap/js/bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
          'bootstrap/css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
          'bootstrap/font/glyphicons-halflings-regular.ttf': 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'bowercopy'
  ]);
};