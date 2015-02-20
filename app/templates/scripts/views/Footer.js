define(['require'], function(require){
  'use strict';
  var tmpl = '<div><center> &copy Footer Here !!! </center></div>';
  var vFooter = Marionette.LayoutView.extend({
    template: tmpl,
    templateHelpers: function() {},
    regions: {},
    events: {},
    initialize: function(options) {
      console.log('Initialized vFooter');
    },
    onRender: function(){}
  });
  return vFooter;
});