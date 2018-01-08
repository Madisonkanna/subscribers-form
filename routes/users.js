const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const mail = require('../utils/mail');

// From senior dev: we save the flag to redis. so on subscribe you should SET a key (for example 
//   "${userId}:verified") to true and when displaying all the subscribers you 
// should GET the same key to see if it exists.
//You can use ioredis as an npm module
//When a user saves to Database, I can generate a new token associated to that user and use that in the confirm url

//get all users showing
//above answer!


/* GET users listing. */
router.get('/', (req, res, next) => {
//get users from database!

  db.collection("subcribers").find({}).toArray();
  res.json({message: 'Success!'})

});

router.post('/', (req, res, next) => {
  console.log('Creating user');

  //pull the data from the form, in post in the request
  // create an object in the database using that data
  const subscriber = new Subscriber( req.body )

  subscriber.save(err => {
    if (err) {
      res.json(err);
    } else {
      mail.sendEmail(subscriber.email, 'Confirm your email', 'Confirm your email address now');
      res.json({message: 'Success!'})

    }

  });

})

//Post request for my user to post data

module.exports = router;
