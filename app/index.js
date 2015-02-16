var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = Generator;

function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.templateFramework = 'handlebars';

  this.on('end', function () {
    if (['app', 'backbone', 'marionette'].indexOf(this.generatorName) >= 0) {
      this.installDependencies({
        skipInstall: this.options['skip-install']
      });
    }
  });
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
    '\n     _-----_' +
    '\n    |       |' +
    '\n    |' + chalk.red('--(o)--') + '|   .--------------------------.' +
    '\n   `---------´  |    ' + chalk.yellow.bold('Welcome to Yeoman') + ',    |' +
    '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |   ' + chalk.yellow.bold('ladies and gentlemen!') + '  |' +
    '\n    /___A___\\   \'__________________________\'' +
    '\n     ' + chalk.yellow('|  ~  |') +
    '\n   __' + chalk.yellow('\'.___.\'') + '__' +
    '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n';

  console.log(welcome);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js, Marionette, Handlebars and Require.');


  this.isFullApp = true;
  this.bowerDirectory = 'bower_components';
  //dummy vars for legacy
  this.includeRequireJS = true;

  cb();
};

Generator.prototype.git = function git() {
  if (this.isFullApp) {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  }
};

Generator.prototype.bower = function bower() {
  this.template('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
  if (this.isFullApp) {
    this.copy('jshintrc', '.jshintrc');
  }
};

Generator.prototype.editorConfig = function editorConfig() {
  if (this.isFullApp) {
    this.copy('editorconfig', '.editorconfig');
  }
};

Generator.prototype.gruntfile = function gruntfile() {
  this.copy('Gruntfile.js','Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.setupEnv = function setupEnv() {
  var _rootDir = this.isFullApp ? 'WebContent/' : '';

  // templates
  this.mkdir(_rootDir + 'scripts/templates');

  //html
  this.template('app/index.html', _rootDir + 'index.html');

  // create dir
  this.mkdir(_rootDir + 'scripts');
  this.mkdir(_rootDir + 'scripts/router');
  this.mkdir(_rootDir + 'scripts/helpers');
  this.mkdir(_rootDir + 'styles');
  this.mkdir(_rootDir + 'images');
  this.mkdir(_rootDir + 'libs');
  this.mkdir(_rootDir + 'templates');
  this.mkdir(_rootDir + 'META-INF');
  this.mkdir(_rootDir + 'WEB-INF');

  var _mainJsDir = 'WebContent/scripts/fs/';

  this.mkdir(_mainJsDir);
  this.mkdir(_mainJsDir + 'models');
  this.mkdir(_mainJsDir + 'collection');
  this.mkdir(_mainJsDir + 'views');
  this.mkdir(_mainJsDir + 'utils');
  this.mkdir(_mainJsDir + 'modules');
  this.mkdir(_mainJsDir + 'rest');

  this.copy('app/main.js', _rootDir + 'scripts/main.js');
  this.copy('app/App.js', _rootDir + 'scripts/App.js');
  this.copy('app/Router.js', _rootDir + 'scripts/router/Router.js');
  this.copy('app/default.css', _rootDir + 'styles/default.css');
  this.copy('app/404.html', _rootDir + '404.html');
  this.copy('app/robots.txt', _rootDir + 'robots.txt');
  this.copy('app/htaccess', _rootDir + '.htaccess');

  this.copy('scripts/collection/FSBaseCollection.js', _mainJsDir + 'collection/FSBaseCollection.js');
  
  this.copy('scripts/models/FSBaseModel.js', _mainJsDir + 'models/FSBaseModel.js');
  
  this.copy('scripts/utils/FSGlobals.js', _mainJsDir + 'utils/FSGlobals.js');
  this.copy('scripts/utils/FSLangSupport.js', _mainJsDir + 'utils/FSLangSupport.js');
  this.copy('scripts/utils/FSOverrides.js', _mainJsDir + 'utils/FSOverrides.js');
  this.copy('scripts/utils/FSUtils.js', _mainJsDir + 'utils/FSUtils.js');
  this.copy('scripts/helpers/FSHelpers.js', _mainJsDir + 'utils/FSHelpers.js');

  this.copy('scripts/modules/Vent.js', _mainJsDir + 'modules/Vent.js');
  this.copy('scripts/modules/FSAcl.js', _mainJsDir + 'modules/FSAcl.js');
  
};