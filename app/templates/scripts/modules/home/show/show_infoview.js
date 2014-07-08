/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
  this.AppName = {};
}
(function () {
  'use strict';
  AppName.module('HomeModule.Show', function (Show, App, Backbone, Marionette, $, _) {


    /*
     * Home/Show/InfoView
     */
    Show.InfoView = Backbone.Marionette.ItemView.extend({
      //Backbone views will be wrapped in a <div> by default
      //specifying a className simply appends that as well
      className:'info-wrapper',

      //Instead of providing a template string, we implement the
      //getTemplage function. This is an easy way to switch templates
      //based on the state of a model.
      getTemplate: function(){
        //in this case we just check to see if the model has
        //a FIRE_NAME property defined...
        if(this.model.get('FIRE_NAME')){
          //if so, use the actual info view
          return 'home/show/fire_info_view.jst.html';
        }else{
          //otherwise, show the intro
          return 'home/show/fire_intro_view.jst.html';
        }
        
      },
      /*
      Initializer called when the view is created
       */
      initialize: function(options){
        var self = this;
        //hold a reference to the model passed in
        this.model = options.model;
        //Since we want the view to re-render when the 
        //model changes, we setup an event handler to force that.
        this.model.on('change', function(){
          self.render();
        });
      }

    });


  });
})();