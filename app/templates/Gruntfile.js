'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: '<%= templateFramework %>'

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

    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },

      livereload: {
        files: [

          '<%= yeoman.app %>/*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,**/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,**/}*.js',
          '{.tmp,<%= yeoman.app %>}/templates/{,**/}*.hbs',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',

          'test/spec/{,**/}*.js'
        ],
        tasks: ['exec'],
        options: {
          livereload: true
        }
      }
    },

    // testing server
    connect: {
      testserver: {
        options: {
          port: 1234,
          base: '.'
        }
      }
    },

    // open app and test page
    open: {
      server: {
        path: 'http://localhost:<%= express.options.port %>'
      }
    },

    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // require
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` is set by grunt-usemin
          baseUrl: '.tmp/scripts',
          optimize: 'none',
          paths: {
            'templates': '../../.tmp/scripts/templates'
          },
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
          pragmasOnSave: {
            //removes Handlebars.Parser code (used to compile template strings) set
            //it to `false` if you need to parse template strings even after build
            excludeHbsParser: true,
            // kills the entire plugin set once it's built.
            excludeHbs: true,
            // removes i18n precompiler, handlebars and json2
            excludeAfterBuild: true
          },
        }
      }
    },

    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.app %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/{,*/}*.{css}'
          ]
        }]
      },
      prepareRequirejs: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp',
          src: [
            'libs/bower/requirejs/js/require.js',
            'templates/{,*/}*.js',
            'templates/{,*/}*.html',
            'libs/bower/jquery/js/jquery.min.js',
            'libs/bower/underscore-amd/js/underscore.js',
            'libs/bower/backbone-amd/js/backbone.js',
            'libs/bower/bootstrap/js/bootstrap.js',
            'libs/fsOverrides/BBFOverrides.js',
            'libs/other/backgrid/backgrid.js',
            'libs/bower/backgrid-paginator/js/backgrid-paginator.js',
            'libs/bower/backgrid-filter/js/backgrid-filter.js',
            'libs/bower/tag-it/js/tag-it.js',
            'libs/other/jquery-ui/js/jquery-ui-1.10.3.custom.js',
            'libs/other/datepicker/js/bootstrap-datepicker.js',
            'libs/bower/backbone.marionette/js/backbone.marionette.js',
            'libs/bower/backbone-forms/js/bootstrap.js',
            'libs/bower/backbone-forms/js/backbone-forms.js',
            'libs/bower/backbone-pageable/js/backbone-pageable.js',
            'libs/bower/backbone.bootstrap-modal/js/backbone.bootstrap-modal.js',
            'libs/bower/backbone-forms/js/list.js',
            'libs/bower/backbone.babysitter/js/backbone.babysitter.js',
            'libs/bower/backbone.localstorage/backbone.localStorage.js',
            'libs/bower/backbone.wreqr/js/backbone.wreqr.js',
            'libs/bower/backgrid-filter/js/backgrid-filter',
            'libs/bower/backgrid-paginator/js/backgrid-paginator.js',
            'libs/bower/bootbox/js/bootbox.js',
            'libs/bower/globalize/lib/globalize.js',
            'libs/bower/jquery-toggles/js/toggles.min.js',
            'libs/bower/Tag-Handler/js/jquery.taghandler.js',
            'libs/bower/pines-notify/js/jquery.pnotify.min.js',
            'libs/bower/jquery-timeago/js/jquery.timeago.js',
            'libs/bower/select2/select2.js',
            'libs/bower/moment/js/moment-with-langs.min.js',
            'libs/bower/requirejs-text/js/text.js',
            'libs/bower/require-handlebars-plugin/js/Handlebars.js',
            'libs/bower/require-handlebars-plugin/js/i18nprecompile.js',
            'libs/bower/require-handlebars-plugin/js/json2.js',
            'libs/bower/require-handlebars-plugin/js/hbs.js',
            'libs/bower/requirejs-text/js/text.js',
            'libs/bower/x-editable/js/bootstrap-editable.js',
            'scripts/{,*/}*.js',
            'scripts/routers/{,*/}/{,*/}*.js',
            'scripts/helpers/{,*/}/{,*/}*.js',
            'scripts/fs/{,*/}/{,*/}*.js',
          ]
        }]
      }
    },

    bower: {
      install: {
        options: {
          targetDir: 'WebContent/libs/bower',
          layout: 'byComponent',
          install: true,
          verbose: true,
          cleanTargetDir: false,
          cleanBowerDir: false
        },
      },
      all: {}
    },

    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'WebContent/libs/bower'
        },
        files: {
          'jquery/dist/jquery.js': 'jquery/js/jquery.js',
          'jquery/dist/jquery.min.js': 'jquery/js/jquery.min.js',
          'jquery/dist/jquery.min.map': 'jquery/js/jquery.min.map'
        }
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: 'JST',
          amd: true
        },
        files: {
          '.tmp/scripts/templates.js': ['templates/**/*.hbs']
        }
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function() {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  // starts express server with live testing via testserver
  grunt.registerTask('default', function(target) {

    // what is this??
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.option('force', true);

    grunt.task.run([
      'clean:server'
    ]);
  });

  // todo fix these
  grunt.registerTask('test', [
    'clean:server',
    'createDefaultTemplate',
    'handlebars'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'createDefaultTemplate',
    'handlebars',
    'useminPrepare',
    'copy:prepareRequirejs',
    'requirejs',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'copy',
    'usemin'
  ]);

  grunt.registerTask('default', [
    //'jshint', 
    'test',
    'build'
  ]);
};