const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");
const dbConnection = require("./Connection/db");

const path = require("path");
const cors = require("cors");

//database connection
dbConnection
  .authenticate()

  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

const app = express();

app.use(cors());
//use  front end for  serve web pages

app.use(express.static(path.join(__dirname, "public")));


//parse application/json&formurlencoded

app.use(bodyParse.json());


//api routes
app.use("/api/user", require("./api/user"));
app.get("/*", (req, res) => { res.sendFile(path.join(__dirname, "public/index.html")); });


app.unsubscribe(bodyParse.urlencoded({ extended: false }));

app.listen(process.eventNames.PORT || 3000, () =>
  console.log("Server is running on port 3000")
);

