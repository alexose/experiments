// List of available templates
var fs = require('fs');

// TODO: Automate this
module.exports = [  
  {
    name : 'Howdy_letter.html',
    data : fs.readFileSync('./templates/Howdy_letter.html', 'utf-8')
  },
  {
    name : 'AppointmentNotice_confirmation.html',
    data : fs.readFileSync('./templates/AppointmentNotice_confirmation.html', 'utf-8')
  },
  {
    name : 'Illinois Template.html',
    data : fs.readFileSync('./templates/Illinois Template.html', 'utf-8')
  },
  {
    name : 'NJ_Intro_Demo_Template.html',
    data : fs.readFileSync('./templates/NJ_Intro_Demo_Template.html', 'utf-8')
  },
  {
    name : 'Standard_Header.html',
    data : fs.readFileSync('./templates/Howdy_Letter.html', 'utf-8'),
    partial : true
  },
  {
    name : 'State_Letterhead.html',
    data : fs.readFileSync('./templates/State_Letterhead.html', 'utf-8'),
    partial : true
  }
];