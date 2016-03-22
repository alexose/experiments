var React = require('react');

module.exports = React.createClass({
  getInitialState : function(){
    return {};
  },
  handleFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    this.setState({
      modified: formatDate(file.lastModified),
      size:     formatSize(file.size),
      filename: file.name
    });

    console.log(file);

    reader.onload = function(upload) {
      self.setState({
        data_uri: upload.target.result,
      });
    }

    reader.readAsDataURL(file);
  },
  handleSubmit : function(e){
    console.log(e, this.refs);

    // Validate form
    e.preventDefault();
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
                <input id="title" name="title" type="text" placeholder={this.state.filename} />
                
                <label htmlFor="description">Description</label>
                <input id="description" name="description" type="text" />

                <label htmlFor="owner">Owner <span className="usa-additional_text">Required</span></label>
                <input id="owner" name="owner" type="text" required="" aria-required="true" />

              </fieldset>

              <button className="usa-button" style={{ "float" : "right" }}>Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
});

// via http://stackoverflow.com/questions/5416920
function formatDate() {
  var date = new Date();

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min + ":" + sec;

  return str;
}

// via http://stackoverflow.com/questions/10420352
function formatSize(bytes, si) {
  var thresh = si ? 1000 : 1024;
  if(Math.abs(bytes) < thresh) {
      return bytes + ' B';
  }
  var units = si
      ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
      : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
  var u = -1;
  do {
      bytes /= thresh;
      ++u;
  } while(Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1)+' '+units[u];
}
