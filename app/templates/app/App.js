define(['scripts/router/Router.js','marionette'], function(Router, Marionette) {
  var App = new Marionette.Application();

  App.addRegions({
    rHeader : '#header',
    rFooter : '#footer',
    rContent : '#content'
  });

  App.addInitializer(function() {
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  });

  return App;
});