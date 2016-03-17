var React = require('react');
var Form = require('./form.jsx');

var Guest = React.createClass({
  getInitialState : function(){
    return {};
  },
  render : function(){
    console.log(this.props.person);
    return(
      <div className={"guest"}>
        <div className={"guest-row animated" + (this.props.hide ? ' fadeout' : '')}>
          <div className="title-row row" onClick={this.props.changeFocus}>
            <div className="col-md-4">
              <div className={"fake-checkbox pull-right " + this.props.person.hi + this.props.person.or}>&nbsp;</div>
            </div>
            <div className="col-md-6">
              <h2>{this.props.person.name}</h2>
            </div>
          </div>
        </div>
        <div className={'guest-form animated' + (this.props.focused ? '' : ' fadeout')}> 
          <Form 
            person={this.props.person}
            question={this.props.question} 
            answer={this.props.answer} 
            update={this.props.update}
            changeFocus={this.props.changeFocus}
          />
        </div>
      </div>
    )
  }
});

module.exports = Guest; 
