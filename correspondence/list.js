// List of available templates
var fs = require('fs');

// TODO: Automate this
module.exports = {
  templates : [
    {
      name : 'Howdy_letter',
      data : fs.readFileSync('./templates/Howdy_letter.html', 'utf-8')
    },
    {
      name : 'AppointmentNotice',
      data : fs.readFileSync('./templates/AppointmentNotice_confirmation.html', 'utf-8')
    },
    {
      name : 'Illinois Template',
      data : fs.readFileSync('./templates/Illinois Template.html', 'utf-8')
    },
    {
      name : 'NJ_Intro_Demo_Template',
      data : fs.readFileSync('./templates/NJ_Intro_Demo_Template.html', 'utf-8')
    },
    {
      name : 'Real_Letter',
      data : fs.readFileSync('./templates/Idaho_Letter.html', 'utf-8')
    }
  ],
  partials : [
    {
      name : 'Standard_Header',
      data : fs.readFileSync('./templates/Standard_Header.html', 'utf-8')
    },
    {
      name : 'State_Letterhead',
      data : fs.readFileSync('./templates/State_Letterhead.html', 'utf-8')
    },
    {
      name : 'Real_Header',
      data : fs.readFileSync('./templates/Real_Header.html', 'utf-8')
    }
  ]
};
