define(['marionette'], function(Marionette) {
  var App = new Marionette.Application();

  App.addRegions({
    rHeader : '#header',
    rFooter : '#footer',
    rContent : '#content'
  });

  App.addInitializer(function() {
    Backbone.history.start();
  });

  return App;
});