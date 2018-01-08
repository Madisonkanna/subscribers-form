const assert = require('assert');
const mongoose = require('mongoose');
const Subscriber = require('../models/Subscriber');

describe('Creating records', () => {
  it('saves a subscriber', () => {
    //test assertion
    const joe = new Subscriber({ name: 'Joe', emailAddress: 'joe@joe.com', subscribed: false })

  });
})
