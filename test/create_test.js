const assert = require('assert');
const Subscriber = require('../models/Subscriber');

describe('Creating records', () => {
  it('saves a subscriber', done => {
    // test assertion
    const joe = new Subscriber({ name: 'Joe', email: 'joe@joe.com', subscribedAt: '10/23/92' });
    // when joe is saved, a promise comes back to us
    joe.save()
      .then(() => {
        // built in flag: it's false when the new user is
        // succesfully saved in DB. !joe.isNew means Joe is saved in Mongo.
        assert(!joe.isNew);
        // Add our done callback to let Mocha know that it is only
        // after our then statement executes and our assertion is made, that Mocha can go on
        // to the next test
        done();
      });
  });
});
