require('dotenv').config()
const dbConfig = require("./config/db.config.js");
const express = require("express");
const sequelizec = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();
const clients = require("./app/routes/clients");

var corsOptions = {
  origin: "http://localhost:4400",
    credentials: true
};



app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
 

app.get("/", (req, res) => {
  res.json({ message: "Welcome to thendo's application." });
});


app.use('/api', clients);


app.use((err,req,res)=>{
  console.log(err);
})

const PORT = process.env.PORT || 4401;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




module.exports = app;