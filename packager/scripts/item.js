var React = require('react');
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

var Item = React.createClass({
  render : function(){

    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;

    var name = this.props.name,
        type = this.props.type;

    return connectDragSource(
      <li className={type}><div className="item">{name}</div></li>
    )
  }
});

var itemSource = {
  beginDrag: function(props) {
    return { id: props.id };
  }
};

var itemTarget = {
  hover: function(props, monitor) {
    console.log(props);
    var draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.moveItem(draggedId, props.id);
    }
  }
};

// TODO: decorators are hard to follow.  let's refactor this...
var DragSourceDecorator = DragSource('item', itemSource, 
  function(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    };
});

var DropTargetDecorator = DropTarget('item', itemTarget,
  function(connect) {
    return {
      connectDropTarget: connect.dropTarget()
    };
});

var collect = function(){
  return {};
}

module.exports = DropTargetDecorator(DragSourceDecorator(Item));
