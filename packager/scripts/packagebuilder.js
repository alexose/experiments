var React = require('react');

var Item = require('./item.js');
var defaults = require('../data.json');

var dnd = require('react-dnd');
var backend = require('react-dnd-touch-backend');

var PackageBuilder = React.createClass({

  getInitialState : function(){
    return {
      
    };
  },

  getDefaultProps : function(){
    return { items : defaults };
  },

  moveItem : function(dragIndex, hoverIndex){
    var items = this.props.items;
    var dragItem = items[dragIndex];

    this.setState(

    )
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

module.exports = dnd.DragDropContext(backend)(PackageBuilder);
