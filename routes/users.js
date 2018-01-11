const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const mail = require('../utils/mail');
const Redis = require('ioredis');
const uuidv4 = require('uuid/v4');
const keys = require('../config/keys');

const redis = new Redis(keys.redisURI);


/* GET users listing. */
router.get('/', (req, res, next) => {  
  Subscriber.find().then((subscribers) => res.json({ users: subscribers }))
  .catch((err) => res.json({ err }))


});


router.post('/', (req, res, next) => {
  console.log('Creating user');
  //pull the data from the form, in post in the request
  // create an object in the database using that data
  const subscriber = new Subscriber( req.body )
  subscriber.subscribedAt = new Date();

  subscriber.save().then((subscriber) => {
    console.log("Inside of then!");
    const signupToken = uuidv4();
    redis.set(signupToken, subscriber.id);

    const host = req.headers.host;
    const emailMessage = 'Confirm your email address now ' + req.protocol + '://' + host + '/users/confirm?token=' + signupToken;
    //protocol://host/path?queryparam1=value1
    mail.queueEmail(subscriber.email, 'Confirm your email', emailMessage).then((info => {
      res.json({user: subscriber})
    }))
    //error on email sending
    .catch((err) => res.json({ err }))
  })
    //error on subscribe save
  .catch((err) => res.json({ err }))

})

router.get('/confirm', (req, res, next) => {
  const signupToken = req.query.token;
  redis.get(signupToken).then( (result) => {
    console.log(result);

    const key = result + ':verified';
    redis.set(key, true);
    res.redirect('/finalconfirmation')
  }) 
  .catch(err => {
    res.redirect('/confirmationfailure')
  })

})



module.exports = router;
