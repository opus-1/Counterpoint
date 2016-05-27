/*
   Copyright IBM Corp. 2016
*/
//on the server
Meteor.startup(function () {

  var smtp = {
    username: '',
    password: '',
    server: 'na.relay.ibm.com',
    port: 25
  };

  // process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.server) + ':' + smtp.port;


});



Meteor.methods({
  sendEmail: function (to, from, subject, text) {

    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});
