/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
    this.AppName = {};
}
(function () {
    'use strict';
    /** @module AppName.Controllers.Base */
    AppName.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _){
        
        /**
         * Base for the controllers in the app.
         * @class
         * @constructor
         * @memberOf AppName
         * @extends Backbone.Marionette.Controller
         * @param  {object=} [options] 
         */
        Controllers.Base = Backbone.Marionette.Controller.extend(
        {

            /**
             * Constuctor
             * Inject any global logic you want to add to all constructors here
             */
            constructor: function(options){
                if(!options){
                    options= {};
                }
                //default the region parameter to the app default region if it's not passed in
                this.region = options.region || App.request('default:region');
                 
                var args = Array.prototype.slice.call(arguments);
                Backbone.Marionette.Controller.prototype.constructor.apply(this, args); 
            },

            /**
             * Close the controller with passed optional options
             * @param  {object=} [options]
             */
            close: function(options){
                //delete this.region;
                delete this.options;
                Marionette.Controller.prototype.close.apply(this, options); 
                
            },

            




     /**
       * Proxy call to App.execute
       * @return {[type]} [description]
       */
      _execMapClearGraphics: function () {        
        App.execute('map:selection:clear-graphics');
      },


      /**
       * Wrapper for the App.execute call - mainly to streamline testing
       * @param  {Dataset}   datasetModel Dataset model
       * @param  {Function} callback      callback function
       */
      _execAddDataset: function(datasetModel, callback){
        App.execute('map:add:dataset', datasetModel, callback);
      },


        _execMapReset: function(){
          App.execute('map:reset');
        },

        _execHideSearchLayer: function(){
            App.execute('map:search:layer:hide');
        },

        _execShowSearchLayer: function(){
            App.execute('map:search:layer:show');
        },


        _execHideOverlay: function(){
          App.execute('mapbar:close:overlay');
        },
        _execShowOverlay: function(){
            App.execute('mapbar:show:overlay');
        },

        _execHideMapBar: function(){
          App.execute('map:bar:hide');
        },


        _execShowSearch: function(){
          App.execute('title:search:show');
        },

        /**
        * Remove a dataset from the map
        * @param  {[type]} datasetModel [description]
        */
        _execRemoveDataset: function(datasetId){
            App.execute('map:remove:dataset', datasetId);
        },

        // Execute for hiding progress bar
        _execHideProgress: function () {
            this._execUpdateProgress(1);
            App.execute('mapbar:progress:hide');
        },

        // Execute for showing progress bar
        _execShowProgress: function () {
            App.execute('mapbar:progress:show');
        },

        // Execute for hiding progress bar
        _execUpdateProgress: function ( val ) {
            App.execute('mapbar:progress:update', val);
        },


        /**
         * Remove all other datasets with the exception
         * of the one passed in.
         * @param  {string} datasetId Optional string of a dataset to keep
         */
        _execRemoveOtherDatasets:function(datasetId){
            App.execute('map:remove:datasets', datasetId);
        },
        /**
        * Proxy call to App.execute
        * @return {[type]} [description]
        */
        _execHideInfoWindow: function () {        
            App.execute('info-window:hide');
        }
            


        });

    });
})();
