var React = require('react');
var Draggable = require('react-draggable');

// Read contents of directories
var clothingFiles = require('fs').readdirSync('./img/clothes');
var paperdollFiles = require('fs').readdirSync('./img/bodies');

var Garment = React.createClass({
  render : function(){
    return(
      <Draggable>
        <img src={'img/clothes/' + this.props.src} className="garment" draggable="false" />
      </Draggable>
    )
  }
});

var Paperdoll = React.createClass({
  render : function(){
    return(
      <img src={'img/bodies/' + this.props.src} className="paperdoll" />
    )
  }
});


var text = [
  'Loading analysis protocol...',
  'Spinning up EC2 instances...',
  'Analyzing...',
  'Initial results recieved.  Please wait',
  'Yes, you can wear this!'
];

var Analysis = React.createClass({
  getInitialState : function(){
    return { text : '' };
  },
  handleClick : function(){
    var context = this;
    text.forEach(function(d, i){
      this.setTimeout(function(){
        context.setState({ text : d });
      }, i * 2000);
    });

  },
  render : function(){
    return(
      <div>
        <button onClick={this.handleClick} className="analysis">Analyze outfit</button>
        <p>{this.state.text}</p>
      </div>
    )
  }
});

var Clothes = React.createClass({
  getInitialState: function(){
    return { current : paperdollFiles[0] };
  },
  render: function(){
    var context = this;
    var changePaperdoll = function(event){
      context.setState({ current : event.target.value });
    };
    return (
      <div className="page full">
        <div className="paperdolls">
          <select onChange={changePaperdoll} >
            {
              paperdollFiles.map(function(path){
                return (
                  <option value={path}>{path}</option>
                )
              })
            }
          </select>
          <br />
          <Paperdoll src={this.state.current} />
          <br />
          <Analysis />
        </div>
        {
          clothingFiles.map(function(path){
            return (
              <Garment src={path} />
            )
          })
        }
      </div>
    )
  }
});

module.exports = Clothes;
