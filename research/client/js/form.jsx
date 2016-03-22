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
    console.log('lots of errorz');
  },
  handleSubmit : function(e){
    e.preventDefault();
    
    var formData = new FormData(),
        errors = {},
        fields = {
          file:        this.state.file,
          title:       this.state.title || this.state.filename,
          description: this.state.description || '',
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

    formData.append('description', fields.description);
    
    if (fields.owner){
      formData.append('owner', this.state.owner || '');
    } else {
      errors.title = "Please provide an owner."; 
    }

    if (Object.keys(errors).length === 0){
      superagent.post('/api/report')
        .send(formData)
        .end(function(err, response){
          this.props.closeModal();
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
    return (
      <div className="usa-grid">
        <div className="modal-content cf">
          <div className="left">
            <h3 style={{ "margin-top" : "50px" }}>Add new market research</h3>
            <p>Upload your market research here to make it available government-wide.</p>
            <p>We support .doc, .docx, and .txt files.</p>
          </div>
          <div className="right">
            <form onSubmit={this.handleSubmit} className="usa-form-large" style={{ "margin-left" : "40px" }}>
              <fieldset>
                
                <label htmlFor="file">File <span className="usa-additional_text">Required</span></label>
                <input className="main" onChange={this.handleFile} id="file" name="file" type="file" required="" aria-required="true" />
               
                <div className="usa-input-grid usa-input-grid-medium disabled">
                  <label htmlFor="owner">Last modified</label>
                  <input id="created" name="created" className="disabled" disabled type="text" aria-required="false" value={this.state.modified} />
                </div>
                <div className="usa-input-grid usa-input-grid-small disabled">
                  <label htmlFor="owner">Size</label>
                  <input id="size" name="size" className="disabled" disabled type="text" aria-required="false" value={this.state.size} />
                </div>

                <label htmlFor="title">Title <span className="usa-additional_text">Required</span></label>
                <input onChange={this.handleChange} id="title" name="title" type="text" placeholder={this.state.filename} />
                
                <label htmlFor="description">Description</label>
                <input onChange={this.handleChange} id="description" name="description" type="text" />

                <label htmlFor="owner">Owner <span className="usa-additional_text">Required</span></label>
                <input onChange={this.handleChange} id="owner" name="owner" type="text" required="" aria-required="true" />

              </fieldset>

              <button className="usa-button" style={{ "float" : "right" }}>Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
});
