/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
    this.AppName = {};
}

(function () {

  'use strict';
  
  
  AppName.module('HomeModule.Show', function (Show, App, Backbone, Marionette, $, _) {
          

    Show.InfoModel = Backbone.Model.extend({});
    /**
     * Home controller for the main page of the application
     */
    Show.Controller = App.Controllers.Base.extend({ 

      initialize: function(options){
        var self = this;
        //having a page name can be useful...
        this.pageName = 'page:home:show';

        //Add application logic to spin up the page. 
        //Usually this involves fetching models, and initializing views
        //
        //since we have two areas on this "page" of the app
        //we use a layout - so let's create that first and keep a 
        //reference to it
        this.layout = new Show.Layout();
        //Since we extend from our Controller.Base, we have access
        //to the main region automatically as this.region. Let's tell
        //it to show (aka render) the layout.
        this.region.show(this.layout);

        // ---------------------
        // Map View
        // ---------------------
        //Now let's create our mapview. It's a very simple view
        //with no logic - infact it's really just a div
        this.mapview = new Show.MapView();
        //we attach an event handler to it's show event, which let's us 
        //hook in additional behavior after the template has been added to 
        //the DOM
        this.mapview.on('show', function(){
          //in this case, we start up the map.
          self.startMap();
        });


        //We also setup a handler for the views beforeDestroy event
        //which allows us to detroy the map so we don't have zombie 
        //maps consuming resources.
        this.mapview.on('beforeDestroy', function(){
          App.vent.trigger('map:destroy');
        });

        //With all that our of the way, we tell the layout's mapRegion 
        //to show the mapview
        this.layout.mapRegion.show(this.mapview);

        // ---------------------
        // Information Window
        // ---------------------
        //First we create a new instance of an InfoModel. It's empty
        //but that's ok
        this.infoModel = new Show.InfoModel();
        //what we really want is a reference to a model that we
        //pass into the InfoView when it's created, and then when
        //we make changes to that model, the InfoView will 
        //automatically update
        this.infoview = new Show.InfoView({model:this.infoModel});
        //finally, we tell the layout's infoRegion to show the infoView.
        this.layout.infoRegion.show(this.infoview);

      },


      /**
       * Start up the map
       * then call helper methods to add in the layers 
       * our app cares about
       */
      startMap: function(){
        var self = this;
        //instead of creating the map directly in this controller, we use
        //the Request system built into Marionette. This allows the controller to 
        //be relatively ignorant of the details of the "map"
        var mapOptions = {
          mapdiv:'map', 
          basemap: 'Gray', 
          center: [40,-95], 
          zoom:5 
        };
        //The request returns a jQuery promise, so we chain off this via .then
        App.request('map:create', mapOptions ).then(function(){
          //and add our feature layers
          self._addPerimeterLayer();
          self._addFireLayer();
        });
      },
      
      /**
       * Add Clustered Fire Layer
       */
      _addFireLayer: function(){
        var self = this;
        //As you can see from the code below, this controller "knows" quite a bit about
        //the map implementation - i.e. we could not simply re-implement the MapController
        //using the Esri JS API and have this code work. If this is a concern or use-case you need
        //to support, I'd recommend pushing more of this logic into the MapController itself.
        //i.e. createing a method like "addWildfirePoints(url)" which would abstract these details
        App.execute('map:add:clustered-feature-layer','wildfire-points', 'http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Wildfire_Activity/MapServer/0',{
          where: "ACTIVE='Y' AND LOCATION <> ''",
          showCoverageOnHover: false,
          zoomToBoundsOnClick: false,
          pointToLayer: function (geojson, latlng) {
            return L.marker(latlng, {
              icon: L.icon({
                iconUrl: 'images/active-fire.png',
                iconSize: [32, 32],
                iconAnchor: [8, 8],
                popupAnchor: [0, -11],
              })
            });
          },
        });

        //While we are setting things up, we want to get notified when these
        //features are clicked. So we setup a handler on the global "vent"
        //event bus. This event will be raised out of the mapController, 
        //and is an abstraction between our application, and details of the
        //map canvas.
        App.vent.on('map:layer:wildfire-points:click', function(feature){
          //setting the feature properties hash to the 
          //info model will update the view
          self.infoModel.set(feature.properties);
        });


      },

      _addPerimeterLayer: function(){
        //
         App.execute('map:add:feature-layer','wildfire-perimeters', 'http://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Wildfire_Activity/MapServer/2',{
          simplifyFactor: 0.75,
          style: function(feature) { 
              return {color:'red', weight:1,opacity:.8,fillColor:'#FF0000',fillOpacity:.2 };
          }
        });
      }

    });
  });
})();
