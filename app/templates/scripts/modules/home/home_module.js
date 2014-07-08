/*global AppName */
if (!this.AppName || typeof this.AppName !== 'object') {
    this.AppName = {};
}
(function () {
    
    'use strict';
    //Home Module that controls the / and /home routes
    AppName.module('HomeModule', function (HomeModule, App, Backbone, Marionette, $, _) {
        
        //Router for the module
        HomeModule.Router = Backbone.Marionette.AppRouter.extend({
            appRoutes:{
                '':'show',
                'home': 'show',
                'about': 'about'
            }
        });

        //Add the router during the initialization 
        HomeModule.addInitializer(function (options) {
            console.log('HomeModule adding router to initializer...');
            new HomeModule.Router({controller:HomeModule.API});           
        });

        //Simple API object that provides the implementation for the routes
        HomeModule.API = {
            show: function(options){
                //hold onto the controller so we can access it
                //in the console as AppName.HomeModule.API.showController
                this.showController = new HomeModule.Show.Controller(options);
                
            },

            about: function(options){
                //hold onto the controller so we can access it
                //in the console as AppName.HomeModule.API.showController
                this.aboutController = new HomeModule.About.Controller(options);
                
            }
        };

    });
})();