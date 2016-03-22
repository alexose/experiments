var React     = require('react');
var SearchKit = require('searchkit');
var config    = require('../../config.js');
var format    = require('../utils/format.js');

var SearchkitProvider      = SearchKit.SearchkitProvider;
var SearchBox              = SearchKit.SearchBox;
var SelectedFilters        = SearchKit.SelectedFilters;
var ResetFilters           = SearchKit.ResetFilters;
var HitsStats              = SearchKit.HitsStats;
var HierarchicalMenuFilter = SearchKit.HierarchicalMenuFilter;
var RefinementListFilter   = SearchKit.RefinementListFilter;
var NoHits                 = SearchKit.NoHits;
var Hits                   = SearchKit.Hits;

var sk = new SearchKit.SearchkitManager('http://' + config.elastic.host);

var files = [];

var HitsTable = React.createClass({
  render : function(){
    var hits = this.props.hits;  
    console.log(this.props.result);

    return (
      <table>
        <thead>
          <tr>
            <th scope="col">File</th>
            <th scope="col">Description</th>
            <th scope="col">Owner</th>
            <th scope="col">Created</th>
            <th scope="col">Modified</th>
          </tr>
        </thead>
        <tbody>
          {
            hits.map(function(hit){
              var d = hit._source;
              return (
                <tr>
                  <td className={d.type}>{d.title}</td>
                  <td>{d.description}</td>
                  <td>{d.owner}</td>
                  <td>{format.date(d.created)}</td>
                  <td>{format.date(d.modified)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
});

module.exports = React.createClass({
  render : function(){
    return (
      <div> 
        <SearchkitProvider searchkit={sk}>
          <div className="search">
              <SearchBox/>
              <Hits 
                hitsPerPage={50} 
                highlightFields={["title", "body"]} 
                sourceFilter={["title", "owner", "size", "description", "modified"]} 
                listComponent={HitsTable} />
          </div>
        </SearchkitProvider>
      </div>
    )
  }
});
