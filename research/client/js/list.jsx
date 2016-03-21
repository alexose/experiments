var React     = require('react');
var SearchKit = require('searchkit');
var config    = require('../../config.js');

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

module.exports = React.createClass({
  render : function(){
    return (
      <div> 
        <SearchkitProvider searchkit={sk}>
          <div>
              <SearchBox/>
              <Hits hitsPerPage={100} />
          </div>
        </SearchkitProvider>
      </div>
    )
  }
});
