const USER = require('../model/user.model');
const bcrypt = require('bcrypt');
const router =require('express').Router();
const saltRound= 10;


router.post('/register',async(req,res)=>{
    try {
        const {name ,username,password}=req.body;
        if(name && username && password){
            const hashedPass =await bcrypt.hash(password,saltRound);
            const addUser =await USER({
                name:name,
                username:username,
                password:hashedPass
            });
            await addUser.save();
            return res.status(201).json({success:true,message:'User created',addUser});S
        }else{
            return res.status(400).json({success:false,message:`Please fill the form`});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`});
    };
});



router.post('/logIn',async(req,res)=>{
    try {
        const {username,password}=req.body;
        if( username && password){
            const user = await USER.findOne({username:username});
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    // result == true
                    if (result===true) {
                        return res.status(200).json({success:true, message :"Authentication Successfully"});
                    } else {
                        return res.status(400).json({success:false, message :"Authentication login failed : Password incorrect"});
                    }
                });
            }else{
                return res.status(404).json({success:false,message:`Authentication Failed`});
            }
        }else{
            return res.status(400).json({success:false,message:`Please fill the form`});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`});
    };
});


module.exports = router;