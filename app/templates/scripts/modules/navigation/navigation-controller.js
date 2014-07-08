/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
    this.AppName = {};
}

(function () {

  'use strict';
  
  
  AppName.module('Navigation', function (Navigation, App, Backbone, Marionette, $, _) {

    //add initializer hooks into the start-up system
    //since Navigation is not "routable", we don't have to setup
    //routes, and we don't wait for a route to fire to
    //spin up the controller
    Navigation.addInitializer(function (options) {
        console.log('HomeModule adding router to initializer...');
        this.controller = new Navigation.Controller(options);
    });

    Navigation.Controller = App.Controllers.Base.extend({ 

      initialize: function(options){
       console.log('NavigationController starting', options);
       
       this.basemaps = options.basemaps;

       //create the CollectionView
       var col = new App.Components.Basemaps.BasemapCollection(options.basemaps);
       this.basemapListView = new App.Components.Basemaps.View({ collection: col , el:'#basemap-list'});
       this.basemapListView.render();
      
      }
    });
  });
})();
