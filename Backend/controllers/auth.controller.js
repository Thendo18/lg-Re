const { response } = require('express')
const pool = require('../db_config/config')
const nodemailer = require('nodemailer'); //Send emails

/**
 * gets all the host and guest users from the DB
 * @param {null} req 
 * @param {Object} res status().json() 2 arrays of host and guest users
 */
module.exports.getAll = (req, res) => {

    pool.query(`SELECT id, username, email, status, userType, created_at, updated_at
                FROM users WHERE userType != 'admin';`)
        .then(data => {
            return res.status(201).json(data.rows);
        })
        .catch(err => {
            return res.status(401).json(err);
        }) 
}
module.exports.getAllTeachers = (req, res) => {

    pool.query(`SELECT id, username, email, status, userType, created_at, updated_at
                FROM users WHERE userType != 'admin' AND userType = 'teacher';`)
        .then(data => {
            //Getting all
            return res.status(201).json(data.rows);
        })
        .catch(err => {
            return res.status(401).json(err);
        })
        
    // setTimeout(() => {
    //     return res.status(201).json(allUsers)
    // }, 1000)  
}

module.exports.getAllLearners = (req, res) => {

    pool.query(`SELECT id, user_name , email, status, userType, created_at, updated_at
                FROM users WHERE userType != 'admin' AND userType = 'learner';`)
        .then(data => {
            //Getting all 
            // Users = data.rows
            return res.status(201).json(data.rows);
        })
        .catch(err => {
            return res.status(401).json(err);
        })
        
    // setTimeout(() => {
    //     return res.status(201).json(allUsers)
    // }, 1000)  
}

/**
 * gets a single user from the DB
 * @param {null} req params.id
 * @param {Object} res status().json() 2 arrays of host and guest users
 */
module.exports.getOne = (req, res) => {
    // const userType = req.params.userType;

    let query = {
        text: `SELECT id, user_name , email, status, userType, created_at, updated_at
               FROM users WHERE id = $1`,
        value: [req.params.id]
    }

    pool.query(query.text, query.value)
        .then(data => {
            if(data.rowCount) {
                return res.status(201).json(data.rows[0])
            }
        })
        .catch(err => {
            return res.status(401).json(err);
        })

    pool.query(query.text, query.value)
        .then(data => {
            if(data.rowCount) {
                return res.status(201).json(data.rows[0])
            }
        })
        .catch(err => {
            return res.status(401).json(err);
        })
}
 
 /**
 * update a single user's profile from the DB
 * @param {null} req params.id
 * @param {Object} res status().json() updated user data
 */
module.exports.updateOne = (req, res) => {
    const userType = req.params.userType;
    let user = {
        name: req.body.name, 
        email: req.body.email, 
        phone: req.body.phone
    };

    let query = {
        text: `UPDATE users SET user_name  = $1, email = $2, updated_at = NOW() 
                WHERE id = $4`,
        values: [user.name, user.email, user.phone, req.params.id]
    }

    pool.query(query.text, query.values)
        .then(data => {
            if(data.rowCount) {
                return res.status(200).json(`Successfully updated user with id: ${req.params.id}`)
            } else {
                return res.status(404).json('user not found')
            }
        })
        .catch(err => {
            return res.status(401).json(err);
        })
}

/**
 * deletes a single user from the DB
 * @param {null} req params.id
 * @param {Object} res status().json() 
 */
 module.exports.delete = (req, res) => {
    // const userType = req.params.userType;
    // let userId = req.userId;
    
    let query = {
        text: `DELETE FROM users WHERE id = $1`,
        value: [req.params.id]
    }

    pool.query(query.text, query.value)
        .then(data => {
            if(data.rowCount) {
                return res.status(201).json(`Successfully deleted user with id: ${req.params.id}`)
            }
        })
        .catch(err => {
            return res.status(401).json(err);
        })
    }

    module.exports.updateUserStatus = (req, res) => {
        let user = {
            user_id: req.body.user_id,
            user_status: req.body.user_status
        
        };
        let message = "";
    
        let query = {
            text: `UPDATE users SET status = $1, updated_at = NOW() 
                    WHERE id = $2 RETURNING email, user_name`,
            values: [user.user_status, user.user_id]
        }
    
        pool.query(query.text, query.values)
            .then(data => {
                if(data.rowCount) {

                    if(user.user_status != true){
                        message = "active"
                    }else{
                        message = "deactived"
                    }

                    activateUser(data.rows[0].email, data.rows[0].user_name , message)
                    return res.status(200).json(`Successfully updated staus of user with id: ${user.user_id}`)
                } else {
                    return res.status(404).json('user not found')
                }
            })
            .catch(err => {
                return res.status(401).json(err);
            })
    
}

const Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "thendo@gmail.com",
        pass: "vkqtqhprquyzdhys"
    },
    tls: {
        rejectUnauthorized: false
    }
});

const activateUser = (email, name, message) => {
    let mailOptions = {
        from: 'thendo@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'App Account Status', // Subject line
        // text: text, // plain text body
        html:
            `<h3>Greetings ${name},</h3><br>
        <h3>This email serves to inform you that your account is now ${message}, <br>

        <br>kind Regards,<br>
   Thendo Makherana
         </h3>`
        // html body
    };
    Transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        }
    });

}
