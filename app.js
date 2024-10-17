const express=require('express');
const cors=require('cors');

const app =express();

const normalAuth = require('./auth1/normalAuth.route');
const hashAuth = require('./auth2/hashPass.route');
const bcryptAuth = require('./auth3/bcryptPass.route');
const USER = require('./model/user.model');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// server home route
app.get('/',(req,res)=>{
    try {
        return res.status(200).json({success:true, message: 'Welcome to server authentication revision project'});
    } catch (error) {
        return res.status(500).json(`Something broke : ${error.message}`);
    };
});

// Get users from DB
app.get('/users',async(req,res)=>{
    try {
        const users= await USER.find();
        if(users.length>0){
            return res.status(200).json(users);
        }else{
            return res.status(404).json({success:false,message:`Data not found`});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`});
    };
});


// Get single user from DB
app.get('/user/:id',async(req,res)=>{
    try {
        const user = await USER.findOne({_id:req.params.id});
        if(user==!null){
            return res.status(200).json(user);
        }else{
            return res.status(404).json({success:false,message:`Data not found`});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`});
    };
});



// Server another routes
app.use('/api/normalAuth',normalAuth);
app.use('/api/hashAuth',hashAuth);
app.use('/api/bcryptAuth',bcryptAuth);


// Server route not found
app.use((req,res,next)=>{
    return res.status(404).json({success:false,message:`The route isn't found`});
});




module.exports=app;