const mongoose =require('mongoose');

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Username must be ruquired']
    },
    username:{
        type:String,
        required:[true,'username is required'],
        validate:{
            validator:(v)=>{
                return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/.test(v)
            },
            message:prp=> `${prp.value} is not a valid username`
        },
        unique:[true,'username must have been unique']
    },
    password:{
        type:String,
        required:[true,'Username must be ruquired']
    }
},{timestamps:true});

const USER = mongoose.model('users',UserSchema);


module.exports=USER;

