var React = require('react');
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

var Item = React.createClass({
  render : function(){

    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <li>This is an item!</li>
    )
  }
});

var itemSource = {
  beginDrag: function(props) {
    console.log('hwat');
    return { id: props.id };
  }
};

var itemTarget = {
  hover: function(props, monitor) {
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
