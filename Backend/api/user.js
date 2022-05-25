const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const weToken = require("jsonwebtoken");
require("dotenv").config();

//register api

router.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    if (username == undefined || username == ""
        || email == undefined || email == ""
        || password == undefined || password == "")
         {


        res.status(401).json({
            message: "please enter all fields",
            status: res.statusCode
        });

    }


    else {
        //check whether email is already registered or notin database model
        UserModel.findOne({
            attributes: ["username"],
            where: {
                email
            }


        })
  
            .then((value) => {

                //if no data create a record in db with hashed password
                if (value == null) {
                    bcrypt.genSalt(10, function (err, salt) {

                        bcrypt.hash(password, salt, (err, hash) => {
                            //create record
                            UserModel.create({
                                username,
                                email,
                                password: hash
                            })
                            .then((value) => {

                                res.status(201).json({
                                    message: "user created successfully",
                                    status: res.statusCode
                                })
                            })
                            
                            .catch((err) => 
                                res.status(400).json({
                                    message: "error occured"
                                 
                                }))

                            })
                        })

                    }
                    
                    else {
                        res.status(401).json({
                            message: "email already registered",
                            status: res.statusCode
                        })
                    }
            

                    })
                }

                })
          
       


module.exports = router