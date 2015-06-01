define(['require', 'hbs!tmpl/site/header'], function(require, tmpl){
  'use strict';

  var vHeader = Marionette.LayoutView.extend({
    template: tmpl,
    templateHelpers: function() {},
    regions: {},
    events: {},
    initialize: function(options) {
      console.log('Initialized vHeader');
    },
    onRender: function(){}
  });
  return vHeader;
});