const USER = require('../model/user.model');

const router =require('express').Router();


router.get('/users',async(req,res)=>{
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

router.get('/user/:id',async(req,res)=>{
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


router.post('/register',async(req,res)=>{
    try {
        const {name ,username,password}=req.body;
        if(name && username && password){
            const addUser =await USER({
                name:name,
                username:username,
                password:password
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
                return res.status(200).json(user);
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