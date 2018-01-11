var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var nodemailerMailgun;
const keys = require('../config/keys');
const Q = require('q');

var queue = 'emails';
var open;

const connectAMQP = () => {
  var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
  open = require('amqplib').connect(url);

}

const initializeEmail = () => {
  var auth = {
    auth: {
      api_key: keys.mailgunApiKey,
      domain: keys.mailgunDomain,
    }
  }

  nodemailerMailgun = nodemailer.createTransport(mg(auth));  

}

const queueEmail = (to, subject, text) => {
  console.log("queue Email was called");
  const deferred = Q.defer();

  open.then(function(conn) {
    console.log("Inside open");
    var ok = conn.createChannel();
    ok = ok.then(function(ch) {
      console.log("Inside ok")
      ch.assertQueue(queue);
      const Details = {to:to, subject:subject, text:text}
      const newDetails = JSON.stringify(Details);
      console.log(newDetails);
      ch.sendToQueue(queue, new Buffer(newDetails));
      deferred.resolve(newDetails);
    });
  }).then(null, console.warn);

  return deferred.promise;

}

const processEmail = () => {
  console.log("Process email was called");
  // Consumer
  //consume happening everytime something is added to the queue
  open.then(function(conn) {
    console.log("Inside open");
    var ok = conn.createChannel();
    ok = ok.then(function(ch) {
      console.log("Inside ok");
      ch.assertQueue(queue);
      ch.consume(queue, function(msg) {
        console.log("inside consume");
        if (msg !== null) {
          const newMessage = JSON.parse(msg.content);
          console.log(newMessage);
          //when email sends, the queue is done processing the message
          sendEmail(newMessage.to, newMessage.subject, newMessage.text).then((emailInfo) => {
              ch.ack(msg);
            });
          }
        } 
      });
    });
    return ok;
  }).then(null, console.warn);


}



const sendEmail = (to, subject, text) => {
//promisified
  const deferred = Q.defer();
  nodemailerMailgun.sendMail({
    from: keys.fromEmail,
    to: to, // An array if you have multiple recipients.
    subject: subject,
    //You can use "html:" to send HTML email content. It's magic!
    //html: '<b>Wow Big powerful letters</b>',
    text: text
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
      deferred.reject(err);
    }
    else {
      console.log('Response: ' + info);
      deferred.resolve(info);
    }
  });  
  return deferred.promise;

}

module.exports = { sendEmail: sendEmail, initializeEmail: initializeEmail, processEmail: processEmail, connectAMQP: connectAMQP, queueEmail: queueEmail }




