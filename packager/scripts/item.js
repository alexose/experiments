var React = require('react');
var DragSource = require('react-dnd').DragSource;

var Item = React.createClass({
  render : function(){

    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;

    console.log(this.props);

    return connectDragSource(
      <li>This is an item!</li>
    )
  }
});

var source = {
  beginDrag : function(props){
    return {};
  },
  endDrag : function(props){
    return {};
  },
}

var collect = function(){
  return {};
}

module.exports = DragSource('item', source, collect)(Item);
