var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
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
