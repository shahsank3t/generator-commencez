define(['require'], function(require){
  'use strict';
  var tmpl = '<center> Dashboard Here !!! </center>';
  var vDashboard = Marionette.LayoutView.extend({
    template: tmpl,
    templateHelpers: function() {},
    regions: {},
    events: {},
    initialize: function(options) {
      console.log('Initialized vDashboard');
    },
    onRender: function(){}
  });
  return vDashboard;
});