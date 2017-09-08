var React     = require('react');
var format    = require('../utils/format.js');

var SearchKit = require('searchkit');
var SearchkitProvider      = SearchKit.SearchkitProvider;
var SearchBox              = SearchKit.SearchBox;
var SelectedFilters        = SearchKit.SelectedFilters;
var ResetFilters           = SearchKit.ResetFilters;
var HitsStats              = SearchKit.HitsStats;
var HierarchicalMenuFilter = SearchKit.HierarchicalMenuFilter;
var RefinementListFilter   = SearchKit.RefinementListFilter;
var NoHits                 = SearchKit.NoHits;
var Hits                   = SearchKit.Hits;
var Pagination             = SearchKit.Pagination;

var files = [];

var CustomHitsStats = React.createClass({
  render : function(){
    var h = this.props.hitsCount;
    return (
      <div className="stats"> {h} report{h === 1 ? "" : "s"}{h == 0 ? "" : ":"}</div>
    )
  }
});

var HitsTable = React.createClass({
  render : function(){
    var hits = this.props.hits;  
    return (
      <div>
        {
        hits.map(function(hit){

          hit.highlight = hit.highlight || {};

          var d      = hit._source,
              path   = '/files/' + hit._id,
              body   = hit.highlight.body || [],
              owner  = hit.highlight.owner || d.owner,
              email  = hit.highlight.owner || d.email,
              agency = hit.highlight.agency || d.agency,
              title  = hit.highlight.title || d.title;

          return (
            <div className="results">
              <div className="title">
                <a className={d.mimetype} href={path} title={d.description} dangerouslySetInnerHTML={{ "__html" : title }} />
              </div>
              <div className="created">
                Created by
                  <a href={"mailto:" + email}>
                    &nbsp;<span dangerouslySetInnerHTML={{ "__html" : owner }} />
                  </a>    
                &nbsp;(<span dangerouslySetInnerHTML={{ "__html" : agency }} />), 
                on {format.date(d.created)}
              </div>
              {
                body.map(function(d){
                  return (
                    <div className="content" dangerouslySetInnerHTML={{ "__html" : d + '...' }} />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )

  }
});

module.exports = React.createClass({
  render : function(){
    return (
      <div> 
        <SearchkitProvider searchkit={this.props.searchKit}>
          <div className="search">
              <SearchBox
                searchOnChange={true}
                queryOptions={{analyzer:"standard"}} 
                queryFields={["title", "body", "owner", "agency", "email"]} />
              <HitsStats component={CustomHitsStats} />
              <Hits 
                hitsPerPage={10} 
                highlightFields={["title", "body", "owner"]} 
                sourceFilter={["title", "owner", "size", "agency", "email", "modified", "mimetype", "path"]}
                listComponent={HitsTable} />
              <Pagination showNumbers={true}/>
          </div>
        </SearchkitProvider>
      </div>
    )
  }
});
