const assert = require('assert');
const mongoose = require('mongoose');
const Subscriber = require('../models/Subscriber');
// test for raeding files / db query
describe('Reading users out of the database', () => {
  // declare my user outside of the beforeEach
  let joe;
  // make sure Joe is in the db to read before test runs
  beforeEach(done => {
    joe = new Subscriber({ name: 'Joe', email: 'joe@joe.com', subscribedAt: '10-10-10' });
    joe.save()
      .then(() => done());
  });

  it('Finds all users with the name of joe', done => {
    // joe will now be an instance of a user
    // add query to find users with his name
    Subscriber.find({ name: 'Joe' })
      .then(subscribers => {
        done();
      });
  });
});
