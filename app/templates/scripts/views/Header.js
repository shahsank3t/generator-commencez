define(['require'], function(require){
  'use strict';
  var tmpl = '<header> Header here !!! </header>';
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