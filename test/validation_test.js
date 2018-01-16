const assert = require('assert');
const mongoose = require('mongoose');
const Subscriber = require('../models/Subscriber');

describe('Validating records', () => {
  it('requires a name', () => {
    const subscriber = new Subscriber({ name: undefined, email: 'email@email', subscribedAt: '10-10-10' })
    //call function that returns all the results of validating the user model
    const validationResult = subscriber.validateSync();
    //const message = validationResult.errors.name.message;
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required');


  })

})
