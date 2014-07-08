this["JST"] = this["JST"] || {};

this["JST"]["scripts/components/basemaps/templates/basemap-item-view.jst.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<a href>' +((__t = ( name )) == null ? '' : __t) +'</a>';}return __p};

this["JST"]["scripts/modules/home/about/templates/about_view.jst.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="container">\n  <div class="row">\n    <div class="col-m-12">\n    <h1>Bootstrap+Backbone+Marionette+Esri-Leaflet</h1>\n\n    <p class="lead">Hello! This little site was generated using yeoman, and serves as an example for how to build out non-trivial web applications with maps.</p>\n\n    <h2>Overview</h2>\n\n\n    <h2>Extenting</h2>\n</div>\n  </div>\n</div>\n\n';}return __p};

this["JST"]["scripts/modules/home/show/templates/fire_info_view.jst.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '\n<h3>' +((__t = ( FIRE_NAME )) == null ? '' : __t) +', ' +((__t = ( STATE )) == null ? '' : __t) +'</h3>\n<ul>\n  <li><strong>Size:</strong> ' +((__t = ( AREA_ )) == null ? '' : __t) +' ' +((__t = ( AREA_MEAS)) == null ? '' : __t) +'</li>\n  <li><strong>Percent Contained: </strong> ' +((__t = ( PER_CONT)) == null ? '' : __t) +'%</li>\n  <li><strong>Location: </strong> ' +((__t = ( LOCATION )) == null ? '' : __t) +'</li>\n  <li><strong>Incident: </strong> ' +((__t = ( INC_NUM )) == null ? '' : __t) +'</li>\n</ul> \n<a href="' +((__t = ( HOTLINK)) == null ? '' : __t) +'" class="btn btn-default" target="_blank">More Info <span class="glyphicon glyphicon-new-window"></span></a>\n';}return __p};

this["JST"]["scripts/modules/home/show/templates/fire_intro_view.jst.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '\n<h3>Active Wildfires</h3>\n<p>Click a fire to get information about it</p>';}return __p};

this["JST"]["scripts/modules/home/show/templates/show_layout.jst.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div id="info-region"></div>\n<div id="map-region"></div>';}return __p};

this["JST"]["scripts/modules/home/show/templates/show_mapview.jst.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div id="map"></div>';}return __p};