/*
 * The singleton class for App State model to be used globally
 */

define(['require', 'fs/models/FSBaseModel'], function (require, FSBaseModel) {
  'use strict';

  var VAppState = FSBaseModel.extend({
    defaults: {

    },
    initialize: function() {
      this.modelName = 'VAppState';
    },
  });

  // Make this a singleton!!
  return new VAppState();
});