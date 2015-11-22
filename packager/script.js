// This script requires watchify!
// Install via "npm install -g watchify"
//
// To monitor this file for changes and rebuild automatically, type:
// watchify -v -t brfs script.js -o assets/js/script.js

var fs = require('fs');

// Set up drawer
var drawer = $('#drawer'),
    main = $('#main'),
    handle = drawer.find('.handle');

handle.click(function(){
  var classname = 'expanded';
  drawer
    .toggleClass(classname)
    .animate({ height : drawer.hasClass(classname) ? 300 : 30 });

  main
    .animate({ bottom : drawer.hasClass(classname) ? 300 : 30 });
});
