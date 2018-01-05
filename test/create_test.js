const assert = require('assert');
const mongoose = require('mongoose');

describe('Creating records', () => {
  it('saves a user', () => {
    //test assertion
    const joe = new Subscriber({ name: 'Joe', emailAddress: 'joe@joe.com', subscribed: false })

    joe.save();
  });
})
