// List of available templates
var fs = require('fs');

// TODO: Automate this
module.exports = [  
  {
    name : 'Howdy_letter.html',
    data : fs.readFileSync('./templates/Howdy_letter.html')
  },
  {
    name : 'AppointmentNotice_confirmation.html',
    data : fs.readFileSync('./templates/AppointmentNotice_confirmation.html')
  },
  {
    name : 'Illinois Template.html',
    data : fs.readFileSync('./templates/Illinois Template.html')
  },
  {
    name : 'NJ_Intro_Demo_Template.html',
    data : fs.readFileSync('./templates/NJ_Intro_Demo_Template.html')
  },
  {
    name : 'Standard_Header.html',
    data : fs.readFileSync('./templates/Howdy_Letter.html'),
    partial : true
  },
  {
    name : 'State_Letterhead.html',
    data : fs.readFileSync('./templates/State_Letterhead.html'),
    partial : true
  }
];
