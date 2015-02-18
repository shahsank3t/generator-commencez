/*
 * The singleton class for App State model to be used globally
 */

define(['require', 'models/BaseModel'], function (require, BaseModel) {
  'use strict';

  var VAppState = BaseModel.extend({
    defaults: {

    },
    initialize: function() {
      this.modelName = 'VAppState';
    },
  });

  // Make this a singleton!!
  return new VAppState();
});