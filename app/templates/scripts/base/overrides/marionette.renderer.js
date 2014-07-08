(function(){

    //Override the Marionette Renderer to lookup JST templates 
    _.extend(Marionette.Renderer, {

        //Paths to search for templates
        lookups: ['scripts/modules/', 'scripts/components/'],

        //actual render function
        render: function(template, data){
            if(template !== false){
                templateFuct = this.getTemplate(template);
                if(!templateFuct){
                    throw('Template ' + template + ' not found!');
                }else{
                    return templateFuct(data);
                }
            }
        },

        //Return a JST template by looking it up in the JST hash
        getTemplate: function(template){
            //inject the 'templates'
            //unclear why this could not be chained, but...
            var compiledTemplate;
            if(template){
                var ar = template.split('/');
                ar.splice(-1, 0, 'templates');
                var path = ar.join('/');
                
                //this gets called hundreds of times - short circuiting the search by using _.some instead of _.each below
                _.some(this.lookups, function(item, key){
                    if(JST[item + path]){
                        compiledTemplate = JST[item+path];
                        return true;
                    }
                },this);
            }
            return compiledTemplate;
        }

    });
})();