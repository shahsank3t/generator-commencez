generator-commencez
======================

Yeoman generator for initial setup of web application's UI framework using backbone, marionette and various other javascript libraries

Stack
-------
- Client: 
    * Backbone: http://backbonejs.org/
    * Marionette: https://github.com/marionettejs/backbone.marionette
    * jQuery: http://jquery.com/
    * Require: http://requirejs.org/
    * Underscore: http://underscorejs.org
    * Handlebars: http://handlebarsjs.com
    * Bootstrap
    * Bootbox
    * Font-Awesome
- Tooling: 
    * Yeoman: http://yeoman.io/
    * Bower: http://bower.io/
    * Grunt: http://gruntjs.com/



Install
-------
First make sure you have Node, Npm, Yeoman, Bower and Grunt installed.

Visit nodejs.org to install node and NPM


To install Yeoman, Bower and Grunt run: 

    $ npm install -g yo grunt-cli bower


Install commencez generator

    $ npm install -g generator-commencez


Bootstrap project
-----------------
To bootstrap a new project:

First, create your project directory:
    
    $ mkdir demo-app

Go to your project directory:
    
    $ cd demo-app

Now simply run:

    $ yo commencez

To install bower components:

    $ bower install

To install dev-dependencies:
	
	$ npm install

To copy bower components in libs directory:

    $ grunt bowercopy
