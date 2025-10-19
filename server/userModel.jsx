const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({   //define the user schema
    name:String,
    email:String,
    age:Number
});

const Usermodel=mongoose.model('users',userSchema);   //creating user model for User

module.exports = Usermodel;    //exoprt the module



