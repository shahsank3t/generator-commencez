require.config({
  /* starting point for application */

  /**
   * Requested as soon as the loader has processed the configuration. It does
   * not block any other require() calls from starting their requests for
   * modules, it is just a way to specify some modules to load asynchronously
   * as part of a config block.
   * @type {Array} An array of dependencies to load.
   */
  deps: ['backbone.marionette', 'globalize', 'fs/utils/FSLangSupport'],

  /**
   * The number of seconds to wait before giving up on loading a script.
   * @default 7 seconds
   * @type {Number}
   */
  waitSeconds: 30,


  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    underscore: {
      exports: '_'
    },
    backgrid: {
      deps: ['backbone']
    },
    'backgrid-paginator': {
      deps: ['backbone', 'backgrid']
    },
    'backgrid-filter': {
      deps: ['backbone', 'backgrid', ]
    },
    'backbone-forms.templates': {
      deps: ['backbone-forms.list', 'backbone-forms']
    },
    'Backbone.BootstrapModal': {
      deps: ['jquery', 'underscore', 'backbone']
    },
    'bootstrap-editable': {
      deps: ['bootstrap']
    },
    'jquery-toggles': {
      deps: ['jquery']
    },
    'tag-it': {
      deps: ['jquery', 'jquery-ui'],
    },
    'jquery-ui': {
      deps: ['jquery'],
    },
    'jquery-timeago': {
      deps: ['jquery'],
    },
    globalize: {
      exports: 'Globalize'
    },
    pnotify: {
      deps: ['jquery'],
      exports: 'pnotify'
    },
    moment: {
      deps: ['jquery'],
      exports: 'moment'
    }
  },

  paths: {
    'jquery': '../libs/bower/jquery/js/jquery',
    'backbone': '../libs/bower/backbone/js/backbone',
    'underscore': '../libs/bower/underscore/js/underscore',
    'backbone.marionette': '../libs/bower/backbone.marionette/js/backbone.marionette',
    'backbone.wreqr': '../libs/bower/backbone.wreqr/js/backbone.wreqr',
    'backbone.babysitter': '../libs/bower/backbone.babysitter/js/backbone.babysitter',
    'backbone-forms': '../libs/bower/backbone-forms/js/backbone-forms',
    'backbone-forms.list': '../libs/bower/backbone-forms/js/list',
    'backbone-forms.templates': '../libs/bower/backbone-forms/js/bootstrap',
    'Backbone.BootstrapModal': '../libs/bower/backbone.bootstrap-modal/js/backbone.bootstrap-modal',
    'backbone.paginator': '../libs/bower/backbone.paginator/js/backbone.paginator',
    'backgrid': '../libs/bower/backgrid/js/backgrid',
    'backgrid-paginator': '../libs/bower/backgrid-paginator/js/backgrid-paginator',
    'backgrid-filter': '../libs/bower/backgrid-filter/js/backgrid-filter',    
    'bootstrap-editable': '../libs/bower/x-editable/js/bootstrap-editable',
    'jquery-toggles': '../libs/bower/jquery-toggles/js/toggles.min',
    'tag-it': '../libs/bower/tag-it/js/tag-it',
    'jquery-ui': '../libs/bower/jquery-ui/js/jquery-ui-1.10.3.custom',
    'jquery-timeago': '../libs/bower/jquery-timeago/js/jquery.timeago',
    'globalize': '../libs/bower/globalize/js/globalize',
    'gblMessages' : '../../scripts/globalize',
    'pnotify': '../libs/bower/pines-notify/js/jquery.pnotify.min',
    'moment': '../libs/bower/moment/js/moment-with-langs.min',
    'handlebars': '../libs/bower/handlebars/js/handlebars',
    'i18nprecompile': '../libs/bower/require-handlebars-plugin/js/i18nprecompile',
    'json2': '../libs/bower/require-handlebars-plugin/js/json2',
    'hbs': '../libs/bower/require-handlebars-plugin/js/hbs',
    'requirejs.text': '../libs/bower/requirejs-text/js/text',
    'bootbox': '../libs/bower/bootbox/js/bootbox',
    'tmpl': '../templates'
  },

  hbs: {
    disableI18n: true, // This disables the i18n helper and doesn't require the json i18n files (e.g. en_us.json)
    // (false by default)
    disableHelpers: false, // When true, won't look for and try to automatically load
    // helpers (false by default)
    helperPathCallback: // Callback to determine the path to look for helpers
      function(name) { // ('/template/helpers/'+name by default)
        return "helpers/FSHelpers";
      },
    templateExtension: "html", // Set the extension automatically appended to templates
    // ('hbs' by default)
    compileOptions: {} // options object which is passed to Handlebars compiler
  },

  /**
   * If set to true, an error will be thrown if a script loads that does not
   * call define() or have a shim exports string value that can be checked.
   * To get timely, correct error triggers in IE, force a define/shim export.
   * @type {Boolean}
   */
  enforceDefine: true
});

/**
 * To detect errors that are not caught by local errbacks, you can override
 * requirejs.onError()
 * @param  {[type]} err - The error object contain two custom
 * properties:
 * 1. requireType: A string value with a general classification, like
 * "timeout", "nodefine", "scripterror".
 * 2. requireModules: an array of module
 * names/URLs that timed out.
 */
require.onError = function(err) {
  console.log('modules: ', err.requireModules, ', error: ' + err.requireType);
  if (err.requireType === 'timeout') {
    console.log('timeout modules: ', err.requireModules);
    throw err;
  }
};

require(["App"], function(App) {
  App.initialize();
});