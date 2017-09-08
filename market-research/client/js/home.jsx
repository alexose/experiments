var React = require('react');
var List = require('./list.jsx');
var AddButton = require('./button.jsx');

var SearchKit = require('searchkit');
var sk = new SearchKit.SearchkitManager('/api/elastic');

module.exports = React.createClass({
  reload : function(){

    // TODO: websockets?
    setTimeout(sk.currentSearchRequest.run(), 2500);
  },
  render : function(){
    return (
      <div>
        <section className="usa-banner">
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <div className="usa-banner-content" id="main-content">
                <h1>Market Research Tool</h1>
                <p className="usa-font-lead">An open source tool for acquisition experts to organize, search, and share market research.</p> 
              </div>
            </div>
          </div>
        </section>
        <div className="usa-grid">
          <div className="usa-width-one-whole">
            <AddButton reload={this.reload} />
            <hr />
            <List searchKit={sk} />
          </div>
        </div>
      </div>
    )
  }
});
