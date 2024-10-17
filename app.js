const express=require('express');
const cors=require('cors');

const app =express();

const normalAuth = require('./auth1/normalAuth.route');
const hashAuth = require('./auth2/hashPass.route');
const bcryptAuth = require('./auth3/bcryptPass.route');

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



// Server another routes
app.use('/api/normalAuth',normalAuth);
app.use('/api/hashAuth',hashAuth);
app.use('/api/normalAuth',bcryptAuth);


// Server route not found
app.use((req,res,next)=>{
    return res.status(404).json({success:false,message:`The route isn't found`});
});




module.exports=app;