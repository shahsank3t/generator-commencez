generator-commencez
======================

Yeoman generator for initial setup of web application's UI framework using backbone, marionette and various other javascript libraries

Stack
-------
- Server: 
    * Node: http://nodejs.org/
- Client: 
    * Backbone: http://backbonejs.org/
    * Marionette: https://github.com/marionettejs/backbone.marionette
    * jQuery: http://jquery.com/
    * Require: http://requirejs.org/
    * Handlebars: 
        - http://handlebarsjs.com/
        - https://github.com/SlexAxton/require-handlebars-plugin
    * SASS-Bootstrap:
        - http://twitter.github.io/bootstrap
        - https://github.com/thomas-mcdonald/bootstrap-sass
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

    $ npm install (-g) generator-commencez


Bootstrap project
-----------------
To bootstrap a new project simply run:

    $ yo commencez

To install dependencies:
	
	$ npm install

To start the app run:

    $ grunt