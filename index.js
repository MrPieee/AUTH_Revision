require('dotenv').config();
const app = require("./app");
const CONNECT_DB = require('./config/dbConnect');

const PORT =process.env.PORT ||7374;


app.listen(PORT,async()=>{
    await CONNECT_DB(process.env.DBURI);
    console.log(`Server is runnig`);
});