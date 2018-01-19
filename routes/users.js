const express = require('express');

const router = express.Router();
const Subscriber = require('../models/Subscriber');
const mail = require('../utils/mail');
const Redis = require('ioredis');
const uuidv4 = require('uuid/v4');
const keys = require('../config/keys');

const redis = new Redis(keys.redisURI);


// Stefano comments: what you can do is to cycle all
// the subscribers and get their confirmation value from redis before sending everything
// to the browser
// 1 redis get per subscriber
// I'd say `Promise.all` is the key
// you an use `await` for `redis.get`

/* GET users listing. */

// make a function to get my keys and not write them over

const makeVerifiedKey = subscriberId => {
  // the value of key is verified now
  const key = subscriberId + ':verified';
  return key;
};

router.get('/', (req, res) => {
  Subscriber.find().then(subscribers => {
    // my redis promises
    // normally redis.get returns a promise. I'm attaching each verified status to its
    // associated subscriber as it goes around.
    // be in an async context to use await
    const promises = subscribers.map(async subscriber => {
      // by default map gives me a list which is the result of each callback function. When I made
      // it async, it returns a promise now instead of a result.
      const key = makeVerifiedKey(subscriber.id);
      // returns a promise
      // await is waiting for the promise to be fulfilled and then it will return a value
      // get our value and attach it to our ke
      // waiting until the below code happens before we proceed:
      const subscriberVerified = await redis.get(key);
      // make my subscriber into a plain object b/c mongoose is usually immutable
      subscriber = subscriber.toObject();
      // give object subscriber the property verified
      subscriber.verified = subscriberVerified;
      return subscriber;
    });
    // wait for all the promises to come back before this promise resolves
    Promise.all(promises).then(values => {
      // got all resolved results of all my promises aka returns all my users
      res.json({ users: values });
    });
  }

  )
    .catch(err => res.json({ err }));
});


router.post('/', (req, res) => {
  // console.log('Creating user');
  // pull the data from the form, in post in the request
  // create an object in the database using that data
  const subscriber = new Subscriber(req.body);
  subscriber.subscribedAt = new Date();

  subscriber.save().then(subscriber => {
    const signupToken = uuidv4();
    redis.set(signupToken, subscriber.id);

    const host = req.headers.host;
    const emailMessage = 'Confirm your email address now ' + req.protocol + '://' + host + '/users/confirm?token=' + signupToken;
    // protocol://host/path?queryparam1=value1
    mail.queueEmail(subscriber.email, 'Confirm your email', emailMessage).then((info => {
      res.json({ user: subscriber });
    }))
    // error on email sending
      .catch(err => res.json({ err }));
  })
    // error on subscribe save
    .catch(err => res.json({ err }));
});

router.get('/confirm', (req, res) => {
  const signupToken = req.query.token;
  // looking up subscriber id that corresponds to that token
  // key is signup token, value is subscriber id
  redis.get(signupToken).then(subscriberId => {
    const key = makeVerifiedKey(subscriberId);
    redis.set(key, true);
    res.redirect('/finalconfirmation');
  })
    .catch(err => {
      res.redirect('/confirmationfailure');
    });
});


module.exports = router;
