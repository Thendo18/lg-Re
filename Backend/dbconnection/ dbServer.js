const express = require("express")
const app = express()
const mysql = require("mysql2")


const db = mysql.createPool({
   connectionLimit: 100,
   host: "127.0.0.1",       //This is your localhost IP
   user: "newuser",         // "newuser" created in Step 1(e)
   password: "Thendo@123",  // password for the new user
   database: "LoginRegister",      // Database name
   port: "3000"             // port name, "3306" by default
})

db.getConnection((err, connection)=> {
   if(err)
   {
    // throw (err)
    console.log("Nonsense code this one");
   }else{
    console.log ("DB connected successful: " + connection.threadId)
   } 
   
})