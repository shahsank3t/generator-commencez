define(['require'], function(require){
  'use strict';
  var tmpl = '<div><center><h1> Header here !!! </h1></center></div>';
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