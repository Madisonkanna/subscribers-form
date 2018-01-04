const mongoose = require('mongoose');
//I need to hide the database in config/keys later so its not seen in my commits
mongoose.connect('mongodb://mkanna:Icanhandleit1@ds133657.mlab.com:33657/subscribersapp');


mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });
