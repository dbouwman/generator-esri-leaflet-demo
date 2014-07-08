/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
  this.AppName = {};
}
(function () {
  'use strict';
  AppName.module('HomeModule.Show', function (Show, App, Backbone, Marionette, $, _) {
    /*
     * Home/Show.MapView
     */
    Show.MapView = Backbone.Marionette.ItemView.extend({
      //simple template - controller listens for when this
      //is added to the DOM, and then fires up the map
      template: 'home/show/show_mapview.jst.html',

    });
  });
})();