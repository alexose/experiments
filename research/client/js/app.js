var React = require('react')
var ReactDOM = require('react-dom');

var Nav = require('./nav.jsx');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var History = require('react-router').browserHistory;

var Home = React.createClass({
  render : function(){
    return (
      <div className="page centered">
        <h1>Market Research Tool</h1>
      </div>
    )
  }
});

// List of navigable elements
var tabList = [
  {
    name : '/',
    display : 'Home',
    component : <Home />
  }
];

var App = React.createClass({
  getInitialState: function(){
    return { tab : tabList[0] }
  },
  render : function(){
    return (
      <div>
        {this.props.children}
        <Nav tabs={tabList} />
      </div>
    )
  }
});

ReactDOM.render(
  <Router history={History}>
    <Route path="/" component={App}></Route>
  </Router>,
  document.getElementById('app')
);
