var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = Generator;

function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

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
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js, Marionette, Underscore and Require.');


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
  this.mkdir(_rootDir + 'scripts/globalize');
  this.mkdir(_rootDir + 'scripts/globalize/message');
  this.mkdir(_rootDir + 'styles');
  this.mkdir(_rootDir + 'images');
  this.mkdir(_rootDir + 'libs');
  this.mkdir(_rootDir + 'templates');
  this.mkdir(_rootDir + 'META-INF');
  this.mkdir(_rootDir + 'WEB-INF');

  var _mainJsDir = 'WebContent/scripts/';

  this.mkdir(_mainJsDir + 'models');
  this.mkdir(_mainJsDir + 'collection');
  this.mkdir(_mainJsDir + 'views');
  this.mkdir(_mainJsDir + 'views/site');
  this.mkdir(_mainJsDir + 'utils');
  this.mkdir(_mainJsDir + 'modules');

  this.copy('app/main.js', _rootDir + 'scripts/main.js');
  this.copy('app/App.js', _rootDir + 'scripts/App.js');
  this.copy('app/Router.js', _rootDir + 'scripts/router/Router.js');
  this.copy('app/default.css', _rootDir + 'styles/default.css');
  this.copy('app/404.html', _rootDir + '404.html');
  this.copy('app/robots.txt', _rootDir + 'robots.txt');
  this.copy('app/htaccess', _rootDir + '.htaccess');

  this.copy('scripts/collection/BaseCollection.js', _mainJsDir + 'collection/BaseCollection.js');
  this.copy('scripts/collection/VModelList.js', _mainJsDir + 'collection/VModelList.js');
  
  this.copy('scripts/models/BaseModel.js', _mainJsDir + 'models/BaseModel.js');
  this.copy('scripts/models/VModel.js', _mainJsDir + 'models/VModel.js');
  
  this.copy('scripts/utils/Globals.js', _mainJsDir + 'utils/Globals.js');
  this.copy('scripts/utils/LangSupport.js', _mainJsDir + 'utils/LangSupport.js');
  this.copy('scripts/utils/Overrides.js', _mainJsDir + 'utils/Overrides.js');
  this.copy('scripts/utils/Utils.js', _mainJsDir + 'utils/Utils.js');
  this.copy('scripts/utils/TableLayout.js', _mainJsDir + 'utils/TableLayout.js');

  this.copy('scripts/modules/Vent.js', _mainJsDir + 'modules/Vent.js');
  this.copy('scripts/modules/Acl.js', _mainJsDir + 'modules/Acl.js');

  this.copy('scripts/views/Dashboard.js', _mainJsDir + 'views/site/Dashboard.js');
  this.copy('scripts/views/Header.js', _mainJsDir + 'views/site/Header.js');
  this.copy('scripts/views/Footer.js', _mainJsDir + 'views/site/Footer.js');

  this.copy('scripts/en.js', _rootDir + 'scripts/globalize/message/en.js');
  
};