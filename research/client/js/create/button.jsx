var React = require('react');
var Modal = require('react-modal');
var Form = require('./form.jsx');

Modal.setAppElement('#app');

var style = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(200, 200, 200, 0.75)',
    'box-shadow'      : '5px 5px 5px rgba(0,0,0,0.3)'
  },
  content : {
    position                   : 'absolute',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
};

module.exports = React.createClass({
  getInitialState : function(){
    return { modalIsOpen: false };
  },
  handleClick : function(e){
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  },
  render : function(){
    return (
      <div>
        <button onClick={this.handleClick} className="usa-button-big" type="button">Add a report</button>
        <Modal isOpen={this.state.modalIsOpen} style={style}>
          <Form />
        </Modal>
      </div>
    )
  }
});
