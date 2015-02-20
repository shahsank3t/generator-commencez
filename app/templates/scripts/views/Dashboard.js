define(['require', 'models/VModel'], function(require, VModel){
  'use strict';
  var tmpl = '<div><center><h1>Dashboard Template !!!</h1></center></div>';
  var vDashboard = Marionette.LayoutView.extend({

    template: tmpl,

    templateHelpers: function() {},

    regions: {},

    events: {},

    ui: {},

    initialize: function (options) {
      console.log('Initialized vDashboard');
    },

    onRender: function () {},
  });
  return vDashboard;
});
