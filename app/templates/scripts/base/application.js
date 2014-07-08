
(function(){
    'use strict';
    //Extensions to the Marionette Application object
    _.extend(Backbone.Marionette.Application.prototype,{

        //App.navigate should be called over direct calls to the Backbone.history object
        navigate: function(route, options){
            var ops = options || {};
            window.scrollTo(0, 0); //make sure we snap to the top of the page
            Backbone.history.navigate(route, ops);
        },

        //Return the current route
        getCurrentRoute: function(){
            var frag = Backbone.history.fragment;

            //fragment does not handle optional or wildcard routes
            //so we manually tack in the search
            //lifted and simplified from https://github.com/jhudson8/backbone-query-parameters/blob/master/backbone.queryparams.js
            if(Backbone.history.location.search && frag && frag.indexOf(unescape(Backbone.history.location.search)) < 0){
                frag = frag + Backbone.history.location.search;
            }

            if(_.isEmpty(frag)){
                return '';
            }else{
                return frag;
            }
        },

       

        /**
         * Centralized Ajax function for the AppName 
         * application. This avoids having different
         * implementations, strategies etc scattered 
         * all over the application. This simply proxies
         * over to a util class which then uses jQuery
         * @param {string} url     Url that the request will be sent to
         * @param {object} options jQuery ajax options hash
         */
        ajax: function(url, options){
            return util.Xhr.ajax(url, options);
        },

        getJson: function(url){
            
            url = util.UrlHelper.updateUrl(url);
            return $.ajax({
              dataType: 'jsonp',
              url: url
            }).fail(this._reportXhrError);
        },
        /**
         * Report an xhr error.
         */
        _reportXhrError: function(jqXhr, textStatus, jqXhrErrorThrown){
            // for now just log this out
            console.error('XHR Error: ' + textStatus + ' ' + jqXhrErrorThrown  );
            throw 'xhr error!';

        },

        //Simple wrapper for starting the history
        startHistory: function(){
            if(Backbone.history){
                console.log('Hisotry Started w/o push state');
                //todo: add check for pushstate support
                Backbone.history.start({ pushState: false });
            }
        }


        
    });
})();
