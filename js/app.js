define([
  'jquery', 
  'underscore', 
  'backbone',
  'router', // Request router.js
], function($, _, Backbone, Router){
  var initialize = function(){
    console.log("app.js is being loaded!");
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});