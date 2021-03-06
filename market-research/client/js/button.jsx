var React = require('react');
var Modal = require('react-modal');
var Form = require('./form.jsx');

Modal.setAppElement('#app');

var style = {
  overlay : {
    position: 'fixed',
    top:      0,
    left:     0,
    right:    0,
    bottom:   0,
    backgroundColor:         'rgba(200, 200, 200, 0.75)'
  },
  content : {
    position:                'absolute',
    border:                  '1px solid #ccc',
    overflow:                'auto',
    WebkitOverflowScrolling: 'touch',
    outline:                 'none',
    padding:                 '20px',
    background:              'none'
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
  closeModal : function(){
    this.setState({ modalIsOpen : false });
  },
  render : function(){
    return (
      <div className="add-new">
        <button onClick={this.handleClick} className="usa-button-small add-new-button" type="button">Add a report</button>
        <Modal isOpen={this.state.modalIsOpen} style={style}>
          <Form closeModal={this.closeModal} reload={this.props.reload} />
        </Modal>
      </div>
    )
  }
});
