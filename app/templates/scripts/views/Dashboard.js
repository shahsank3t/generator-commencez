define(['require', 'models/VModel', 'hbs!tmpl/site/dashboard', 'utils/Utils'], function(require, VModel, tmpl, Utils){
  'use strict';

  var vDashboard = Marionette.LayoutView.extend({

    template: tmpl,

    templateHelpers: function() {},

    regions: {},

    events: {
      'click #btnSuccess': 'evSuccess',
      'click #btnError': 'evError',
      'click #btnInfo': 'evInfo'
    },

    ui: {},

    initialize: function (options) {
      console.log('Initialized vDashboard');
    },

    evSuccess: function(){
      Utils.notifySuccess("SUCCESS !!!!");
    },
    evError: function(){
      Utils.notifyError("ERROR !!!!");
    },
    evInfo: function(){
      Utils.notifyInfo("INFO !!!!");
    },

    onRender: function () {},
  });
  return vDashboard;
});
