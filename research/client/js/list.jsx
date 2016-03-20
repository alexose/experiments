var React = require('react')

// mock files
var files = [
  {
    path:        'test1.docx',
    description: 'Placeholder document 1',
    owner:       'Jane Smith',
    created:     new Date('October 17, 2015'),
    modified:    new Date('March 11, 2016'),
  },
  {
    path:        'test2.docx',
    description: 'Placeholder document 2',
    owner:       'Jane Smith',
    created:     new Date('October 17, 2015'),
    modified:    new Date('March 4, 2016'),
  },
  {
    path:        'test3.docx',
    description: 'Placeholder document 3',
    owner:       'Jane Smith',
    created:     new Date('October 8, 2015'),
    modified:    new Date('February 2, 2016'),
  }
];

// via http://stackoverflow.com/questions/3552461
function formatDate(date){

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

module.exports = React.createClass({
  render : function(){
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
            files.map(function(d){
              return (
                <tr>
                  <td><i className={ d.path.split('.')[1] }/>{d.path}</td>
                  <td>{d.description}</td>
                  <td>{d.owner}</td>
                  <td>{formatDate(d.created)}</td>
                  <td>{formatDate(d.modified)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
});
