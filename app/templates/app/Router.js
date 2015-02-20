define([
	'jquery',
	'underscore',
	'backbone',
	'App'
], function($, _, Backbone, App) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Define some URL routes
			"": 'dashboardAction',

			// Default
			'*actions': 'defaultAction'
		},

		initialize: function() {
			this.showRegions();
			this.listenTo(this, "route", this.postRouteExecute, this);
		},

		showRegions: function() {
			require(['views/site/Header','views/site/Footer'],function(HeaderView,FooterView){
				App.rHeader.show(new HeaderView());
				App.rFooter.show(new FooterView());
			});
		},

		/**
		 * @override
		 * Execute a route handler with the provided parameters. This is an
		 * excellent place to do pre-route setup or post-route cleanup.
		 * @param  {Function} callback - route handler
		 * @param  {Array}   args - route params
		 */
		execute: function(callback, args) {
			this.preRouteExecute();
			if (callback) callback.apply(this, args);
			this.postRouteExecute();
		},

		preRouteExecute: function() {
			console.log("Pre-Route Change Operations can be performed here !!");
		},

		postRouteExecute: function(name, args) {
			console.log("Post-Route Change Operations can be performed here !!");
			console.log("Route changed: ", name);
		},

		/**
		 * Define route handlers here
		 */
		dashboardAction: function() {
			require(['views/site/Dashboard'],function(DashboardView){
				App.rContent.show(new DashboardView());
			});
		},
		defaultAction: function(actions) {
			// We have no matching route, lets just log what the URL was
			console.log('No route:', actions);
		}
	});

	return AppRouter;

});