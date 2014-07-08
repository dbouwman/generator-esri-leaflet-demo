/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
    this.AppName = {};
}
(function () {
  //'use strict';
  /**
   * Central manager for interactions with the Map
   * All interactions with the map are through this component
   * and ideally through commands / requests. This allows
   * us to keep the application very decoupled from the Map
   */
  AppName.module('Components.MapController', function (MapController, App, Backbone, Marionette, $, _) {

    MapController.addInitializer(function (options) {
        //boot up the map controller as soon as the module loads
        App.MapController = new MapController.Controller(options);          
    });

    //===========  M A P    F U N C T I O N S ========================
    /**
     * create a new map and optionally load it
     */
    App.reqres.setHandler('map:create', function( options ){
        return App.MapController.createMap( options );
    });

    /**
     * Destroy the map
     */
    App.commands.setHandler('map:destroy', function(){
        App.MapController.destroy();
    });

    /**
     * Set the basemap
     * @param  {string} basemap Name of the basemap
     */
    App.commands.setHandler('map:set:basemap', function(options){
        App.MapController._setBasemap(options);
    });


    /**
     * Add a feature layer to the map
     */
    App.commands.setHandler('map:add:feature-layer', function(name, url, options){
        App.MapController._addFeatureLayer(name, url, options);
    });

    /**
     * Add a clustered feature layer to the map
     */
    App.commands.setHandler('map:add:clustered-feature-layer', function(name, url, options){
        App.MapController._addClusteredFeatureLayer(name, url, options);
    });

    //The controller - nothing should make calls directly to this, rather the calls
    //should be proxied through the App event busses - commands or requests
    MapController.Controller = Marionette.Controller.extend({

      mapType: 'leaflet',

      initialize: function(options){
        //leaflet does not have a simple way to ask the map for a layer
        //so, we manage a hash of layers
        this._layers = {};        
      },

      /**
       * Destroy the map if it exists
       */
      destroy: function(){
        if (this._map) {
          this._map.remove();
        }
      },

      //====== P U B L I C   H A N D L E R S =======
    

      /**
       * Create the map
       * @param  {object} options           options hash
       * Returns a promise
       */
      createMap: function( options ) {
        var deferred = $.Deferred();
        var self = this; 
        if(!options){
            options = {
              mapdiv : 'map',
              basemap: 'Topographic',
              center: [40,-95], 
              zoom:5
            };
        }
        //make sure we have a div in the page  
        //this._injectMapDiv(options); 

        this._map = L.map(options.mapdiv, {
          touchZoom:false,
          scrollWheelZoom: false
        });

        //set up handler so we can resolve the deferred when
        //the map is actually ready.
        this._map.on('load', function(e){
          deferred.resolve();
        });
        //add the basemap
        this._layers.basemap = L.esri.basemapLayer(options.basemap).addTo(this._map);
        //set the view
        this._map.setView(options.center, options.zoom);

        return deferred.promise();
      },
      
    

      //-------- P R I V A T E   F U N C T I O N S --------
      
 
      _addFeatureLayer: function(name, url, options){
        //allow the same layer name to be added repeatedly, but 
        //actually swap out the underlying layer
        if(this._layers[name]){
          //may want to add more logic to compare urls or options hashes, to avoid 
          //re-creating exactly the same layer
          this._removeLayer(name);
        }

        //create is and add it
        this._layers[name] = L.esri.featureLayer(url, options).addTo(this._map);
        
        //setup handlers that will broadcast events to the app
        this._layers[name].on('click', function(e){
          App.vent.trigger('map:layer:' + name + ':click', e.layer.feature);
        });
      },

      _addClusteredFeatureLayer: function(name,url, options){
        if(this._layers[name]){
          //may want to add more logic to compare urls or options hashes, to avoid 
          //re-creating exactly the same layer
          this._removeLayer(name);
        }

        //create is and add it
        this._layers[name] = L.esri.clusteredFeatureLayer(url, options).addTo(this._map);
        //setup handlers that will broadcast events to the app
        this._layers[name].on('click', function(e){
          //just send the feature
          App.vent.trigger('map:layer:' + name + ':click', e.layer.feature);
        });
      },

      _removeLayer: function(name){
        if(this._layers[name]){
          //remove the layer, then add it again
          this._map.removeLayer(this._layers[name]);
          delete this._layers[name];
        }
      },



      /*
      * Change maps current visible basemap
      */ 
      _setBasemap: function(options) {
        //options will be the json from a basemap model
        //we could toss the basemap model itself over here, 
        //but there is not much value in that and it creates
        //additional coupling. So we just send json

        var self = this;
        //remove existing basemap
        if (this._layers.basemap) {
          this._map.removeLayer(this._layers.basemap);
        }
        //remove basemap labels if we have them
        if (this._layers.basemap_labels) {
          this._map.removeLayer(this._layers.basemap_labels);
          delete this._layers.basemap_labels;
        }

        //suss out the type of the basemap
        switch(options.type){

          case 'wk-esri':
            this._addWellKnownEsriBasemap(options.key);
          break;
          
          case 'TileLayer':
            this._addTileLayerBasemap(options)
          break;

          default:
            console.error('Unknown Basemap type: ' + options.type + ' Using Streets');
            this._addWellKnownEsriBasemap('Streets');
          break;

        }
       
      },

      _addTileLayerBasemap: function(options){
        this._layers.basemap = L.tileLayer(options.url, {subdomains: options.subdomains, attribution: options.attribution});
        this._map.addLayer(this._layers.basemap, true);
      },

      _addWellKnownEsriBasemap: function(name){
        //create the layer
        this._layers.basemap = L.esri.basemapLayer(name);
        //add it to the map, at the bottom
        this._map.addLayer(this._layers.basemap, true);
        //check if we should load labels
        if (name === 'ShadedRelief' || name === 'Oceans' || name === 'Gray' || name === 'DarkGray' || name === 'Imagery' || name === 'Terrain') {
          this._layers.basemap_labels = L.esri.basemapLayer(name + 'Labels');
          this._map.addLayer( this._layers.basemap_labels );
        }
      }

    });

  });
})();
