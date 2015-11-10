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
      name : 'Howdy Letter',
      data : fs.readFileSync('./templates/Howdy_letter.html', 'utf-8')
    },
    {
      name : 'Appointment Notice',
      data : fs.readFileSync('./templates/AppointmentNotice_confirmation.html', 'utf-8')
    },
    {
      name : 'Illinois Letter',
      data : fs.readFileSync('./templates/Illinois Template.html', 'utf-8')
    },
    {
      name : 'NJ Intro Letter',
      data : fs.readFileSync('./templates/NJ_Intro_Demo_Template.html', 'utf-8')
    },
    {
      name : 'Idaho Letter',
      data : fs.readFileSync('./templates/Idaho_Letter.html', 'utf-8')
    }
  ],
  partials : [
    {
      name : 'Standard Header',
      data : fs.readFileSync('./templates/Standard_Header.html', 'utf-8')
    },
    {
      name : 'State Letterhead',
      data : fs.readFileSync('./templates/State_Letterhead.html', 'utf-8')
    },
    {
      name : 'Idaho Header',
      data : fs.readFileSync('./templates/Idaho_Header.html', 'utf-8')
    }
  ]
};
