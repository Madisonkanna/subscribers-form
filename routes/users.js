const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const mail = require('../utils/mail');
const Redis = require('ioredis');
const uuidv4 = require('uuid/v4');
const keys = require('../config/keys');

const redis = new Redis(keys.redisURI);

// From senior dev: we save the flag to redis. so on subscribe you should SET a key (for example 
//   "${userId}:verified") to true and when displaying all the subscribers you 
// should GET the same key to see if it exists.
//You can use ioredis as an npm module
//When a user saves to Database, I can generate a new token associated to that user and use that in the confirm url

//get all users showing
//above answer!


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

  subscriber.save().then((subscriber) => {
    const signupToken = uuidv4();
    redis.set(signupToken, subscriber.id);
    mail.sendEmail(subscriber.email, 'Confirm your email', 'Confirm your email address now');
    res.json({user: subscriber})
  })
  .catch((err) => res.json({ err }))


})

//Post request for my user to post data

module.exports = router;
