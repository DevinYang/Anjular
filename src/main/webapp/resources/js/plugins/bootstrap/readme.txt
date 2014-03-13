http://angular-ui.github.io/bootstrap/#/getting_started

Dependencies
This repository contains a set of native AngularJS directives based on Bootstrap's markup and CSS. As a result no dependency on jQuery or Bootstrap's JavaScript is required. The only required dependencies are:

AngularJS (minimal version 1.0.8)
Bootstrap CSS (tested with version 3.0.3). This version of the library (0.10.0) works only with Bootstrap CSS in version 3.x. 0.8.0 is the last version of this library that supports Bootstrap CSS in version 2.3.x.
Files to download
Build files for all directives are distributed in several flavours: minified for production usage, un-minified for development, with or without templates. All the options are described and can be downloaded from here.

Alternativelly, if you are only interested in a subset of directives, you can create your own build.

Whichever method you choose the good news that the overall size of a download is very small: <20kB for all directives (~5kB with gzip compression!)

Installation
As soon as you've got all the files downloaded and included in your page you just need to declare a dependency on the ui.bootstrap module:
angular.module('myModule', ['ui.bootstrap']);
You can fork one of the plunkers from this page to see a working example of what is described here.

CSS
Original Bootstrap's CSS depends on empty href attributes to style cursors for several components (pagination, tabs etc.). But in AngularJS adding empty href attributes to link tags will cause unwanted route changes. This is why we need to remove empty href attributes from directive templates and as a result styling is not applied correctly. The remedy is simple, just add the following styling to your application:

.nav, .pagination, .carousel, .panel-title a { cursor: pointer; }