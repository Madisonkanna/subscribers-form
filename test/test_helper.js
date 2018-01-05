const mongoose = require('mongoose');
const keys = require('../config/keys')
//I need to hide the database in config/keys later so its not seen in my commits
mongoose.connect(keys.mongoURI);


mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });
