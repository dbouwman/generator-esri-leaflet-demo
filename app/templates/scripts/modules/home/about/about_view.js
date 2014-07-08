/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
  this.AppName = {};
}
(function () {
  'use strict';
  AppName.module('HomeModule.About', function (About, App, Backbone, Marionette, $, _) {

    /*
     * Home/About/View
     */
    About.View = Backbone.Marionette.ItemView.extend({
      
      template: 'home/about/about_view.jst.html',

      /*
      Initializer called when the view is created
       */
      initialize: function(options){
        console.log('HomeModule.About.View initializing');
      }

    });


  });
})();