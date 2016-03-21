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

var sk = new SearchKit.SearchkitManager('https://' + config.elastic.host);

module.exports = React.createClass({
  render : function(){
    return (
      <div> 
        <SearchkitProvider searchkit={sk}>
          <div>
            <div className="example-search-site__query">
              <SearchBox
               autofocus={true}
               searchOnChange={true}
               prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
            </div>
            <div className="example-search-site__applied-filters">
              <SelectedFilters/>
              <ResetFilters/>
              <HitsStats/>
            </div>
            <div className="example-search-site__filters">
              <HierarchicalMenuFilter
                fields={["type.raw", "genres.raw"]}
                title="Categories"
                id="categories"/>
              <RefinementListFilter
                id="actors"
                title="Actors"
                field="actors.raw"
                operator="AND"
                size={10}/>
            </div>
            <div className="example-search-site__results">
              <Hits hitsPerPage={10} sourceFilter={["title", "poster", "imdbId"]}/>
              <NoHits/>
            </div>
          </div>
        </SearchkitProvider>
      </div>
    )
  }
});
