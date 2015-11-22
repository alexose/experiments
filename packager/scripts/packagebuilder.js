var React = require('react');

var Item = require('./item.js');
var defaults = require('../data.json');

module.exports = React.createClass({

  getInitialState : function(){
    return {
      
    };
  },

  getDefaultProps : function(){
    return { items : defaults };
  },

  render : function(){

    var items = this.props.items.map(function(d){
      return (
        <Item
          id={d.id}
          name={d.name}
          type={d.type}
        />
      )
    }, this);

    return (
      <div>
        <h1>Oh hi!</h1>
        <ul className="item-list">
          {items} 
        </ul>
      </div>
    );
  }
});
