/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
    this.AppName = {};
}

(function () {

  'use strict';
  
  AppName.module('Components.Basemaps', function (Basemaps, App, Backbone, Marionette, $, _) {

    Basemaps.BasemapModel = Backbone.Model.extend({});

    Basemaps.BasemapCollection = Backbone.Collection.extend({
      model: Basemaps.BasemapModel
    });

    Basemaps.ItemView = Backbone.Marionette.ItemView.extend({
      tagName: 'li',
      template: 'basemaps/basemap-item-view.jst.html',
      initialize: function(options){
        console.log('basemap itemview init...');
      },
      events: {
          'click'    : '_onClick'
      },
      _onClick: function(evt){
        evt.preventDefault();
        App.execute('map:set:basemap', this.model.toJSON());

      }
      //on click, raise the event
    });

    Basemaps.View = Backbone.Marionette.CollectionView.extend({
      childView: Basemaps.ItemView,
      //tagName: 'ul',
      //className: 'dropdown-menu',

      initialize: function(options){
        //this.el = '#basemap-list-region';
        //create the collection from the options
        //this.col = new Basemaps.BasemapCollection({collection: options.basemaps});
        console.log('Basemaps.View init');
      }
    });



  });

})();