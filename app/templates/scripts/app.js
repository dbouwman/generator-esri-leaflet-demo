if (!this.AppName || typeof this.AppName !== 'object') {
    this.AppName = {};
}

(function () {
    'use strict';

    /**
     * Create the AppName Marionette Application
     */
    AppName = new Backbone.Marionette.Application();


    /**
     * After all the other application initialization has happened
     * (i.e. all the other modules are initialized), we then start up
     * History to manage our routes.
     */
    AppName.on('start', function(){
        console.log('AppName start');
        AppName.startHistory();
        //if the current route is empty, then fire the home route
        if(this.getCurrentRoute() === ''){
            //AppName.log('firing root route...');
            this.navigate(this.rootroute,{trigger:false});
        }

        //ok, app is all spun up, lets check for window.AppNameTelemetryStart, and 
        //compute the total time to 'live'
        if(window.AppNameTelemetryStart){
          var end = window.performance.now();

          var duration = end - window.AppNameTelemetryStart;
          //create a new Took telemetry object
          var t = new AppName.Models.Took({
            eventName   : 'page-load', 
            category    : 'loading',
            label       : 'Env:' + AppName.env + ' Route: ' + this.getCurrentRoute(),
            start       : window.AppNameTelemetryStart,
            end         : end,
            duration    : duration
          });
          t.log();
          //and store it
          t.store();
        }

    });

    AppName.on('before:start', function(){
      console.log('AppName before:start');
      //handle browsers w/o push state by re-directing to the root 
      //route with a # in the path. Not an issue for this starter-kit
      //but if you serve this from a backend like rails, node or asp.net
      //then this may be more of an issue
      if (!Modernizr.history) {
        //if they are using a browser that does not support pushstate
        if (!window.location.hash && window.location.pathname.length > 1) {
          //if there is no hash in the url AND they are not at the baseURL
          //we insert the hash
          var path = window.location.pathname.slice(1);          
          window.location.replace(window.location.href.replace(path, '#' + path));

        }
      }
    });




    /**
     * Setup the main regions. These must be present in ALL static pages 
     */
    AppName.addRegions({
        pageRegion: '#page-region'//,
        //basemapListRegion: '#basemap-list-region'
    });


    /**
     * Handler allowing controller to get the default region from
     * the application, eliminating the need to pass a region into
     * a controller
     */
    AppName.reqres.setHandler('default:region', function(){
        return AppName.pageRegion;
    });
   
    /**
     * Create is called as part of the constructor of a marionette application.
     */
    AppName.create = function( options ){
        
        /**
         * application state
         * @property {object}
         */
        AppName.state = {
          map: {}
        };

        /**
         * Cleanly handle inlined data so we are not
         * accessing globals, but handing it directly
         * into the app.
         */
        this.inlinedData = {};
        if(options.inlinedData){
            this.inlinedData = options.inlinedData;
        }

        /**
         * Retain passed in map extent
         */
        if(options.initialExtent){
          AppName.state.map.initialExtentJson = options.initialExtent;
        }else{
          //the world
          AppName.state.map.initialExtentJson = {'xmin':-35046071,'ymin':-3522218,'xmax':39507548,'ymax':8218509,'spatialReference':{'wkid':102100}};
        }
        
        /**
         * Allow a root route to be passed in, othewise
         * set it to home
         */
        AppName.rootroute = '' || options.rootroute;


        //Default log level
        /**
         * @property {integer}
         */
        AppName.logLevel = options.logLevel || 2;

        //start the actual Marionette Application
        AppName.start( options );

        return AppName; 
    };

})();

