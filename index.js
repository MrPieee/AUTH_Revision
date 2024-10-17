const app = require("./app");
require('dotenv').config();

const CONNECT_DB = require('./config/dbConnect');

const PORT =process.env.PORT ||7374;


app.listen(PORT,async()=>{
    await CONNECT_DB(process.env.DBURI);
    console.log(`Server is runnig http://localhost:${PORT}`);
});