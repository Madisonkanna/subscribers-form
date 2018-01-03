const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  emailAddress: String,
  subscriberName: String
//describe all my subscribers properties(what my subscribers will look like): their name, and their email address. 
});
