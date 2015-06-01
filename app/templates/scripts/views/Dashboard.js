define(['require', 'models/VModel', 'hbs!tmpl/site/dashboard'], function(require, VModel, tmpl){
  'use strict';

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
