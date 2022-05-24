const express = require("express");
const bodyParse = require("body-parser");
const dbConnection = require("./db");

const path = require("path");
const cors = require("cors");



//database connection
dbConnection.authenticate()

.then(()=>{
    console.log('Connection has been established successfully.');
})
    .catch((err)=>console.error('Unable to connect to the database:', err))


    const app = express();

    app.use (cors());

app.use(express.static(path.join(__dirname, "public")));
    app.listen(process.eventNames.PORT || 3000, ()=> console.log("Serbver is running on port 3000"))