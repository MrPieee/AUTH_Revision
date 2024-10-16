const mongoose =require('mongoose');


const CONNECT_DB=async(DBLINK)=>{
  try {
   await mongoose.connect(DBLINK);
   console.log(`DB Connected`);
 } catch (error) {
    console.error(`DB Connected error : ${error.message}`);
 };
};


module.exports =CONNECT_DB;