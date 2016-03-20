var React = require('react');

module.exports = React.createClass({
  getInitialState : function(){
    return {};
  },
  handleFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        data_uri: upload.target.result,
      });
    }

    reader.readAsDataURL(file);
  },
  render : function(){
    return (
      <div className="usa-grid">
        <div className="usa-width-one-third">
          <h3 style={{ "margin-top" : "50px" }}>Add new market research</h3>
          <p>Upload your market research here to make it available government-wide.</p>
          <p>We support .doc, .docx, and .txt files.</p>
        </div>
        <div className="usa-width-two-thirds">
          <form className="usa-form-large" style={{ "margin-left" : "40px" }}>
            <fieldset>
              <label htmlFor="title">Title <span className="usa-additional_text">Required</span></label>
              <input id="title" name="title" type="text" />
              
              <label htmlFor="description">Description</label>
              <input id="description" name="description" type="text" />
              
              <label htmlFor="file">File <span className="usa-additional_text">Required</span></label>
              <input id="file" name="file" type="file" required="" aria-required="true" />

              <label htmlFor="owner">Owner <span className="usa-additional_text">Required</span></label>
              <input id="owner" name="owner" type="text" required="" aria-required="true" />
              
              <label htmlFor="owner">Originally created</label>
              <input id="created" name="created" className="disabled" disabled type="text" aria-required="false" />
            </fieldset>

            <button onClick={this.handleClick} className="usa-button" type="button" style={{ "float" : "right" }}>Save</button>
          </form>
        </div>
      </div>
    )
  }
});
