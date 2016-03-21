var React = require('react')
var ReactDOM = require('react-dom');

var Nav = require('./nav.jsx');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var History = require('react-router').browserHistory;

var Home = require('./home.jsx'); 
var About = require('./about.jsx'); 

var Searchkit = require('searchkit');
var config = require('../../config.js');
var sk = new Searchkit.SearchkitManager(config.elastic.host);

// List of navigable elements
var tabList = [
  {
    name : '/',
    display : 'Home',
    component : <Home />
  },
  {
    name : '/',
    display : 'About',
    component : <About />
  }
];

var App = React.createClass({
  getInitialState: function(){
    return { tab : tabList[0] };
  },
  render : function(){
    return this.props.children;
  }
});

ReactDOM.render(
  <Router history={History}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/> 
      <Route path="/about" component={About} />
    </Route>
  </Router>,
  document.getElementById('app')
);
