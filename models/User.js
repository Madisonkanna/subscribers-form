const mongoose = require('mongoose');
//Used ES6 destructuring 
const { Schema } = mongoose;

//described all my subscribers properties(what my subscribers will look like): their name, and their email address. 
const userSchema = new Schema({
  emailAddress: String,
  subscriberName: String

});


//Tell mongoose that my new collection needs to be created 
