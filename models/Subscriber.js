const mongoose = require('mongoose');
//Used ES6 destructuring 
const { Schema } = mongoose;

//described all my subscribers properties(what my subscribers will look like): their name, and their email address. 
const subscriberSchema = new Schema({
  emailAddress: String,
  name: String,
  //this property will let us know if the user has clicked on their confirm email or not
  subscribed: Boolean

});

//Create model class and tell mongoose it needs to know that that my new collection should be created 
mongoose.model('subscribers', subscriberSchema);
