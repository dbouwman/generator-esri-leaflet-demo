/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
  this.AppName = {};
}
(function () {
  'use strict';
  AppName.module('HomeModule.Show', function (Show, App, Backbone, Marionette, $, _) {

  Show.Layout = Backbone.Marionette.LayoutView.extend({

      //initalize the layout
      initialize: function() {
        
      },

      //Assign an id - not for css targeting but just so we know
      //which div this created
      id: 'show-layout',

      //jst template
      template: 'home/show/show_layout.jst.html',

      //assign the regions
      regions: function(options){
        return {
          mapRegion:'#map-region',
          infoRegion: "#info-region"
        };        
      }
    });


  });
})();
