var React = require('react');
var superagent = require('superagent');
var format = require('../utils/format.js');

module.exports = React.createClass({
  getInitialState : function(){
    return {};
  },
  handleFile: function(e) {
    var self = this;
    var file = e.target.files[0];

    this.setState({
      modified: format.date(file.lastModified),
      size:     format.size(file.size),
      filename: file.name,
      file:     file
    });
  },
  showErrors : function(errors){
    this.setState({ errors: errors });
  },
  handleSubmit : function(e){
    e.preventDefault();
    
    var formData = new FormData(),
        errors = {},
        fields = {
          file:        this.state.file,
          title:       this.state.title || this.state.filename,
          agency:      this.state.agency,
          email:       this.state.email,
          owner:       this.state.owner
        };

    // Validate form and fill formData
    if (fields.file instanceof File) {
      formData.append('file', fields.file);
    } else {
      errors.file = "Please choose a file.";
    }

    if (fields.title){
      formData.append('title', fields.title);
    } else {
      errors.title = "Please provide a title."; 
    }
    
    if (fields.agency){
      formData.append('agency', fields.agency);
    } else {
      errors.agency = "Please provide the name of the agency."; 
    }
    
    if (fields.owner){
      formData.append('owner', this.state.owner || '');
    } else {
      errors.owner = "Please provide the owner's name."; 
    }
    
    if (fields.email){
      formData.append('email', this.state.email || '');
    } else {
      errors.email = "Please provide the owner's e-mail address."; 
    }

    if (Object.keys(errors).length === 0){
      superagent.post('/api/report')
        .send(formData)
        .end(function(err, response){
          this.props.closeModal();
          this.props.reload();
        }.bind(this)); 
    } else {
      this.showErrors(errors);
    }

    console.log(this);

  },
  handleChange : function(e){
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  },
  render : function(){

    var showError = function(prop){
      if (this.state.errors && this.state.errors[prop]){
        return (
          <span className="error">{this.state.errors[prop]}</span>
        )
      } 
    }.bind(this);

    return (
      <div className="usa-grid">
        <div className="closebox" onClick={this.props.closeModal} />
        <div className="modal-content cf">
          <div className="left">
            <h3 style={{ "margin-top" : "50px" }}>Add new market research</h3>
            <p>Upload your market research here to make it available government-wide.</p>
            <p>We support .doc, .docx, and .txt files.</p>
          </div>
          <div className="right">
            <form onSubmit={this.handleSubmit} className="usa-form-large" style={{ "margin-left" : "40px" }}>
              <fieldset>
                
                <label htmlFor="file">File {showError('file')}</label>
                <input className="main" onChange={this.handleFile} id="file" name="file" type="file" required="" aria-required="true" />
               
                <div className="usa-input-grid usa-input-grid-medium disabled">
                  <label htmlFor="created">Last modified</label>
                  <input id="created" name="created" className="disabled" disabled type="text" aria-required="false" value={this.state.modified} />
                </div>
                <div className="usa-input-grid usa-input-grid-small disabled">
                  <label htmlFor="size">Size</label>
                  <input id="size" name="size" className="disabled" disabled type="text" aria-required="false" value={this.state.size} />
                </div>

                <label htmlFor="title">Title {showError('title')}</label>
                <input onChange={this.handleChange} id="title" name="title" type="text" placeholder={this.state.filename} />
                
                <label htmlFor="agency">Agency {showError('title')}</label>
                <input onChange={this.handleChange} id="agency" name="agency" type="text" />

                {showError('owner')}
                {showError('email')}
                <div>
                  <div className="usa-input-grid usa-input-grid-small">
                    <label htmlFor="owner"> E-mail</label>
                    <input onChange={this.handleChange} id="email" name="email" type="text" required="" aria-required="true" />
                  </div>
                  <div className="usa-input-grid usa-input-grid-medium">
                    <label htmlFor="owner"> Name</label>
                    <input onChange={this.handleChange} id="owner" name="owner" type="text" required="" aria-required="true" />
                  </div>
                </div>

              </fieldset>

              <button className="usa-button" style={{ "float" : "right" }}>Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
});
