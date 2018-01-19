const mongoose = require('mongoose');

// Get rid of Mongo promise depreciation warning. Whenever Mongoose wants to create a
// promise we'll use the ES6 Promise.
mongoose.Promise = global.Promise;
// I need to hide the database in config/keys later so its not seen in my commits

// use Before hook. Before is executed just one time for my entire test suite. Here I need to tell
// mongoose to connect to mongo one time.

// only once we've opened a connection to mongo do we call our done callback
before(done => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
  // once connection is open, inform mocha we can go on to our first test
    .once('open', () => { done(); })
    .on('error', () => {
    });
});

// add hook, a function executed before any test gets executed
// runs before each test
beforeEach(done => {
  // take all records inside user collection and get rid of them. Record cleanup before each test.
  // Drop accepts a callback function that executes once it is done dropping the collection of users
  mongoose.connection.collections.subscribers.drop(() => {
    // In here we are now ready to run our next test. After our users are dropped, we call Done
    // and this tells Mocha it can go run
    done();
  });
});
