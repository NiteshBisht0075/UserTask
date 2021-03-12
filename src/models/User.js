const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name : {
       type:String
       
   }, 
   
   email: {
       type:String
   }

   
})

// we will create a new collection
const User = new mongoose.model('users', userSchema);
module.exports = User;

