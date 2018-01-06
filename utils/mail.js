var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var nodemailerMailgun;
const keys = require('../config/keys');

const initializeEmail = () => {
  var auth = {
    auth: {
      api_key: keys.mailgunApiKey,
      domain: keys.mailgunDomain,
    }
  }

  nodemailerMailgun = nodemailer.createTransport(mg(auth));  

}

const sendEmail = (to, subject, text) => {
  nodemailerMailgun.sendMail({
    from: keys.fromEmail,
    to: to, // An array if you have multiple recipients.
    subject: subject,
    //'h:Reply-To': 'reply2this@company.com',
    //You can use "html:" to send HTML email content. It's magic!
    //html: '<b>Wow Big powerful letters</b>',
    //You can use "text:" to send plain-text content. It's oldschool!
    text: text
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    }
    else {
      console.log('Response: ' + info);
    }
  });  

}

module.exports = { sendEmail: sendEmail, initializeEmail: initializeEmail }




