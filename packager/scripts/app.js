var React = require('react');
var ReactDOM = require('react-dom');

var Item = require('./item.js');

var PackageBuilder = React.createClass({

  getInitialState : function(){
    console.log(this.props.model);
    return {
      
    }
  },

  render : function(){
    return (
      <h1>Oh hi!</h1>
    );
  }
});

var model = require('./model.js');

ReactDOM.render(
  <PackageBuilder model={model} />,
  document.getElementById('main')
);

/*
  <ul className="item-list">
    {items} 
  </ul>,
*/

var sortable = require('./sortable.js');

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
