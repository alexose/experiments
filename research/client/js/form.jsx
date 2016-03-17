var React = require('react');
var Slider = require('rc-slider');

var Form = React.createClass({
  getInitialState : function(){
    return {
      hi : 'blank',
      or : 'blank'
    };
  },
  showAdvanced : function(){
    var switched = !this.state.advanced;
    this.setState({ advanced: switched });
  },
  cancel : function(e){

    // Restore backup
    this.props.update(null, true);
    this.props.changeFocus(e);
  },
  update : function(e){

    var person = this.props.person;

    if (e && e.target){
      var name = e.target.name,
          value = e.target.value;
   
      person[name] = value;
    } else {

      // Slider gives a value instead of an event yay
      person.fancy = e;
    }

    this.props.update(person);
  },
  render : function(){
    return (
      <div className="guest">

        <div className="form-group">
          <label className="control-label col-md-4" htmlFor="name">Your Name</label>
          <div className="col-md-6">
            <input onChange={this.update} id="name" name="name" type="text" value={this.props.person.name} className="form-control input-md" required="" />
          </div>
        </div>
        
        <div className="form-group">
          <label className="control-label col-md-4" htmlFor="email">Your electronic mail address</label>
          <div className="col-md-6">
            <input onChange={this.update} id="email" name="email" type="text" defaultValue={this.props.person.email} className="form-control input-md" required="" />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="radios">Party in Kea'au?</label>
          <div className="col-md-6">
            <div className="radio">
              <label htmlFor="radios-0">
                <input onChange={this.update} type="radio" name="hi" id="radios-0" checked="true" value="yes"/>
                Happily Accept
              </label>
            </div>
            <div className="radio">
              <label htmlFor="radios-1">
                <input onChange={this.update} type="radio" name="hi" id="radios-1" checked={this.props.person.hi == 'yes' ? "checked" : "checked"} value=""/>
                Regretfully Decline
              </label>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="radios">Ceremony in Applegate?</label>
          <div className="col-md-6">
            <div className="radio">
              <label htmlFor="radios-2">
                <input onChange={this.update} type="radio" name="or" id="radios-2" defaultChecked={this.props.person.or ? 'true' : 'false'} value="yes"/>
                Happily Accept
              </label>
            </div>
            <div className="radio">
              <label htmlFor="radios-3">
                <input onChange={this.update} type="radio" name="or" id="radios-3" defaultChecked={this.props.person.or ? 'false' : 'true'} value="no" />
                Regretfully Decline
              </label>
            </div>
          </div>
        </div>
      
       
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-6">
            <h4 onClick={this.showAdvanced} className={"toggle-advanced " + (this.state.advanced ? 'open' : 'closed')}>Advanced wedding options</h4>
          </div>
        </div>

        <div className={"animated" + (this.state.advanced ? '' : ' fadeout')}>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="diet">Any dietary restrictions?</label>
            <div className="col-md-6">                     
              <textarea onChange={this.update} rows="4" className="form-control" id="textarea" name="diet" />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="answer">{this.props.question}</label>
            <div className="col-md-6">                     
              <textarea onChange={this.update} rows="4" className="form-control" id="textarea" name="answer" defaultValue={this.props.answer} />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-md-4" htmlFor="needs">How fancy are you?</label>  
            <div className="col-md-6 slider-wrap">
              <Slider
                defaultValue={7}
                onChange={this.update}
                step={1}
                max={10}
                min={1} />
            </div>
          </div>
        </div>
       
        <div className="form-group">
          <div className="col-md-4"></div>
          <div className="col-md-6">
            <button name="singlebutton" className="btn btn-secondary btn-lg pull-left" onClick={this.cancel}>Cancel</button>
            <button name="singlebutton" className="btn btn-primary btn-lg pull-right" onClick={this.props.changeFocus}>Continue</button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Form; 
