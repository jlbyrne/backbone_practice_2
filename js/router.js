define([
  'jquery',
  'underscore',
  'backbone',
  'views/HomeView'
], function($, _, Backbone, HomeView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {      
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){
    var app_router = new AppRouter;
    app_router.on('route:defaultAction', function (actions) {
      console.log("router.js is being loaded!");
        var homeView = new HomeView({el: $("#main")});
        console.log(homeView);
        homeView.render();
    });
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});