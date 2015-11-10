// List of available templates
var fs = require('fs');

// TODO: Automate this
module.exports = {
  templates : [
    {
      name : 'Demo',
      data : fs.readFileSync('./templates/hello.html', 'utf-8')
    },
    {
      name : 'Howdy_Letter',
      data : fs.readFileSync('./templates/Howdy_letter.html', 'utf-8')
    },
    {
      name : 'Appointment_Notice',
      data : fs.readFileSync('./templates/AppointmentNotice_confirmation.html', 'utf-8')
    },
    {
      name : 'Illinois_Letter',
      data : fs.readFileSync('./templates/Illinois Template.html', 'utf-8')
    },
    {
      name : 'NJ_Intro_Letter',
      data : fs.readFileSync('./templates/NJ_Intro_Demo_Template.html', 'utf-8')
    },
    {
      name : 'Idaho_Letter',
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
      name : 'Idaho_Header',
      data : fs.readFileSync('./templates/Idaho_Header.html', 'utf-8')
    }
  ]
};
