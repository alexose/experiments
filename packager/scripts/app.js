var React = require('react');
var ReactDOM = require('react-dom');
var PackageBuilder = require('./packagebuilder.js');

ReactDOM.render(
  <PackageBuilder />,
  document.getElementById('main')
);

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
