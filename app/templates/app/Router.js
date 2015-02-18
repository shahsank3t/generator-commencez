define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
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
			// require(['scripts/views/Header','scripts/views/Footer'],function(HeaderView,FooterView){
			// 	new HeaderView().render();
			// 	new FooterView().render();
			// });
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
			// require(['scripts/views/dashboard/DashboardView.js'],function(DashboardView){
			// 	var dashboardView = new DashboardView();
			// 	dashboardView.render();
			// });
		},
		defaultAction: function(actions) {
			// We have no matching route, lets just log what the URL was
			console.log('No route:', actions);
		}
	});

	var initialize = function() {
		var router = new AppRouter();
		Backbone.history.start();
	};
	return {
		initialize: initialize
	};

});