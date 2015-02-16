define(['require', 'fs/utils/FSUtils'], function (require, FSUtils) {
  'use strict';

var FSBaseModel = Backbone.Model.extend(
	/** @lends FSBaseModel.prototype */
	{
		/**
		 * FSBaseModel's initialize function
		 * @augments Backbone.Model
		 * @constructs
		 */
		initialize : function() {
			
		},
		bindErrorEvents :function(){
			this.bind("error", FSUtils.defaultErrorHandler);
		},
		/**
		 * toString for a model. Every model should implement this function.
		 */
		toString : function() {
			throw new Error('ERROR: toString() not defined for ' + this.modelName);
		},

		/**
		 * Silent'ly set the attributes. ( do not trigger events )
		 */
		silent_set: function(attrs) {
			return this.set(attrs, {
				silent: true
			});
		}
	},{

		/**
		 * [nonCrudOperation description]
		 * @param  {[type]} url           [description]
		 * @param  {[type]} requestMethod [description]
		 * @param  {[type]} options       [description]
		 * @return {[type]}               [description]
		 */
		nonCrudOperation : function(url, requestMethod, options){
			return Backbone.sync.call(this, null, this, _.extend({
				url: url,
				type: requestMethod
			}, options));
		}
	});

	return FSBaseModel;
});
