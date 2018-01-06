const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const mail = require('../utils/mail');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json([
    {id: 1, username: "Madison"},
    {id: 2, username: "Madison two"}
    ]);
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
