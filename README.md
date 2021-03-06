## generator-esri-leaflet-demo

Hello! This little site was generated using yeoman, and serves as an example for how to build out non-trivial web applications with maps.

## Overview
So - here's the thing - you're gonna look at this app and be all "Wha? This is a mountain of files, for a very very simple one page thing!". And you are completely correct. 

However, the upside of this particular pattern is that you can build out a very complex application using this same, relatively simple structure. Put another way: Spagetti Code Does Not Scale.



## Starting the App

Once you're run the scaffolder, start it up by running grunt serve. This will start up a local node (express) server to host your app. It will also start a bunch of watch tasks, which will tell the browser to reload when you save any file. Handy when developing in a single browser, but priceless when debugging across 3 local browsers, and a few mobile devices.

## Separation of Concerns
One key patter is the separation of concerns around the application, and in particular separating the map logic and details from the applicatin logic. We do this
by putting all the map-specific behavior into a Map Controller. The other modules in the application do not have direct refernces to the Map Controller. Instead, they use the Marionette event system to request map actions. Similarly, the Marionette event system is used by the Map Controller to raise map related events into the application. Care should be taken to avoid implementation-specific details `leaking` into the main application. That said, it does happen from time to time, but it's something we try to avoid (while also not going insane over-engineering demo apps!)
      
## Automated Tests

This demo skipped over getting tests running, but the infrastructure is in place. Simply cd into the test folder, then run bower install. This will bring down a few
test dependencies, including grunt-contrib-jasmine.

With that in place, you can run grunt jasmine, and that will execute the single spec that is setup for home_module.js. From there, check out <a href="http://jasmine.github.io/2.0/introduction.html">Jasmine Documentation</a> for more details on writing tests.
    


## License

MIT
