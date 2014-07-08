
$(function () {
    'use strict';
    AppName.create({
        rootroute: '',
        map:{

        },
        basemaps: [
          {
            id:'gray',
            name: 'Esri Gray Canvas',
            type: 'wk-esri',
            key: 'Gray'
          },
          {
            id:'dark-grey',
            name: 'Esri Dark Gray Canvas',
            type: 'wk-esri',
            key: 'DarkGray '
          },
          {
            id:'water-color',
            name: 'Stamen Water Color',
            url: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            attribution: 'Stamen',
            subdomains: ['a','b','c','d'],
            type: 'TileLayer'
          },
          {
            id:'mapbox-space',
            name: 'MapBox Space',
            url: 'http://{s}.tiles.mapbox.com/v3/eleanor.ipncow29/{z}/{x}/{y}.jpg',
            attribution: 'MapBox',
            subdomains: ['a','b','c','d'],
            type: 'TileLayer'
          },
          {
            id:'nat-geo',
            name: 'National Geographic',
            type: 'wk-esri',
            key: 'NationalGeographic '
          },
          
          {
            id:'topo',
            name: 'Esri Topographic',
            type: 'wk-esri',
            key: 'Topographic '
          }
        ]
    });
});
