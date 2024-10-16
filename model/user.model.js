const mongoose =require('mongoose');

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Username must be ruquired']
    },
    username:{
        type:String,
        required:[true,'Username must be ruquired'],
        unique:[true,'Username must be unique']
    },
    password:{
        type:String,
        required:[true,'Username must be ruquired']
    }
},{timestamps:true});

const USER = mongoose.model('users',UserSchema);


module.exports=USER;

