const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const { isEmail, isMobilePhone } = require('validator');

// const { v4: uuidv4 } = require('uuid')
const pool = require('../db_config/config');   //represents pool pg object required from connection file
const { log, Console } = require('console');
const nodemailer = require('nodemailer'); //Send emails


/**
 * validates user signup/login credentials. returns object with error messages if credentails are not valid
 * @param {string} authtype signup OR login
 * @param {Object} user user credentials and info
 * @returns {Object} { isValid: bool, error: Object }
 */
function userValidation(authType, user) {
    let result = {
        isValid: true,
        errors: { email: '', password: '', username: ''}
    }

    //validate only for signup
    if(authType == 'signup' && !user.name) 
    {
        result.isValid = false;
        result.errors.name = 'please enter your name ';
    }


    //validate email for signup and login
    if(!user.email || !isEmail(user.email)) 
    {
        result.isValid = false;
        result.errors.email = 'please enter a valid email';
    }

    //validate password for signup and login
    if(!user.password || user.password.length < 6) 
    {
        result.isValid = false;
        result.errors.password = 'password must be atleast 6 characters long';
    }

    return result;
}

/**
 * handles errors caught by pool.query() catch block when making queries to DB based on PostgreSQL Error Codes
 * @param {Object} queryError error object from pool.query() catch block
 * @returns {Object} error object with user credental/info errors
 */
function queryErrorHandler(queryError) {
    let errors = { name: '', email: '', password: ''}
    
    //unique_violation error
    if(queryError.code == 23505) {
        errors.email = 'this user is already registered'
    }
    //not_null_violation error
    if(queryError.code == 23502) {
        errors[queryError.column] = 'field cannot be empty'; //ensure that DB table column names are the same as errors{} key names for this to work
    }
    
    
    // incorrect email or password
    if(queryError.message.includes('username does not exist')) {
        errors.email = queryError.message
    } else if (queryError.message.includes('password is incorrect')) {
        errors.password = queryError.message
    }

    return errors
}

//hash user's password
function hashPassword(pwd) {
    let salt = bcrypt.genSaltSync();
    let hashedPassword = bcrypt.hashSync(pwd, salt);
    return hashedPassword;
}

//create new jwt token for payload
const generateToken = (payload) => {
    return jwt.sign(payload, 'w', { expiresIn: '1h'})   // *issue: setting secret to .env.JWT_SECRET == undefined
}

/**
 * saves user details into DB guests table or hosts table
 * @param {Object} req { name, email, phone, password, address, userType}
 * @param {*} res 
 */
module.exports.signup = (req, res) => {
    const userType = req.params.userType;
    let newUser = {
        name: req.body.user_name, 
        email: req.body.email, 
        status: req.body.status,
        password: req.body.password
    };
    
    // check :userType paramater. only accept /clients or /moderator
    if (!(userType == 'moderator' || userType == 'clients' || userType == 'admin')) {
        res.status(400).send('invalid userType parameter in url.')
        throw Error ('Invalid value in request parameter. /:userType parameter must be equal to "moderator","Admin" or "clients"');
    }

    //validate user credentials
    if(!userValidation('signup', newUser).isValid) {
        let errors = userValidation('signup', newUser).errors
        return res.status(400).json(errors)
    }

    let hashedPassword = hashPassword(newUser.password); //hash user password
    // let newUserId = uuidv4(); //generate user id

    //query object
    let query = {
        text: `INSERT INTO users ( user_name, email, userType, status, password) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, userType, user_name`,
        value: [newUser.name, newUser.email, newUser.phone,  userType, newUser.status, hashedPassword]
    }
    
    // DB query
    pool.query(query.text, query.value)
        .then(data => {
            return res.status(201).json(data.rows[0])
        })
        .catch(err => {
            let error = queryErrorHandler(err)
            return res.status(400).json("User already exists")
        }
    );
}

/**
 * verifies existing customer user against DB credentials
 * @param {Object} req { body.email, body.password , body.userType}
 * @param {*} res 
 */
module.exports.login = (req, res) => {

    var user={
        username:"",
        password:""
    }
    user = {
        username: req.body.username, 
        password: req.body.password
    }

    // validate user credentials
    if(userValidation('login', user).isValid) {
        let errors = userValidation('login', user).errors
        return res.status(400).json(errors)
    }

    //Null query object
    let query = {
        text: '',
        value: ''
    }

// Checking if user type
    var usernsme = user.username.includes("@") ? "email" : "email";

    query = {
        text: `SELECT id, user_name, email, status, userType, password FROM users WHERE ${usernsme} = $1;`,
        value: [user.username]
    }
 
    // DB query
    pool.query(query.text, query.value)
        .then(data => {
            if (data.rowCount > 0) { //username exists
                if(data.rows[0].status == true){
                            
                    //verify password
                    let decryptPassword = data.rows[0].password
                    let passwordIsCorrect = bcrypt.compareSync(user.password, decryptPassword); //campare user password to hashed password in DB

                    if (passwordIsCorrect) {  //pwd correct
                        let payload = {
                            id: data.rows[0].id
                        }

                        let token = generateToken(payload); //jwt token
                        let object = {
                            id: data.rows[0].id,
                            username: data.rows[0].email,
                            user_names: data.rows[0].user_name,
                            usertype : data.rows[0].usertype,
                            status: data.rows[0].status,
                            token: token
                        }
                        console.log(object);
                        //response
                        return res.status(201).json(object);

                    } else {res.status(400).json('password is incorrect')}

                } else {res.status(400).json('Account locked by admin')}

            } else { res.status(400).json('username entered does not exist') }
        })
        .catch(err => {
            let error = queryErrorHandler(err);
            return res.status(400).json(error);
        }
    );

}

/**
 * logs out user by setting empty jwt token
 * @param {*} req
 * @param {*} res
 */
module.exports.logout = (req, res) => {
    res.status(200).json({token: ''});
}

module.exports.uploadDocs = async (req, res, next) => {
    try {
        var  qualification_url;
        if (req.file) {
            if(req.file.size>10485760){
                return res.status(400).send({msg:"size too large"});
            }
            if(!req.file.mimetype === 'application/pdf' ){
                return res.status(400).send({msg:"wrong file formart expected pdf"});
            }

             qualification_url = req.file.path ? req.file.path : "";
    
        }
        const uploadResponse = await cloudinary.uploader.upload(qualification_url, {
            folder: 'qualification',
            resource_type: 'auto',
            use_filename: true
        });

        const path = qualification_url;
        fs.unlinkSync(path);
        //take cloudinary response and get url set cert_url to cloudinary url

        let object = {
            response_url : uploadResponse.url,
            name: req.file.name
        }

        return res.status(201).json({object});


    } catch (error) {
       next(error);
    }
}

module.exports.myDocs = (req, res) => {

    //Save upload response to the db
    query = {
        text: 'INSERT INTO qualification (name, description, qualification, moderator_id) VALUES ($1,$2,$3,$4)',
        value: [req.body.name, req.body.description, req.body.upload_res, req.body.moderator_id]
    }
 
    // DB query
    pool.query(query.text, query.value)
        .then(data => {
            if (data.rowCount) 
            {
                //response
                return res.status(201).json('Successfully uploaded your qualification');

            } else { res.status(400).json('Qualification upload failed') }
        })
        .catch(err => {
            let error = queryErrorHandler(err);
            return res.status(400).json(error);
        });

}

module.exports.forgotPassword = (req, res) => {

    let email = req.body.email;

    let query = {
        text: 'SELECT email, user_name FROM users WHERE email = $1',
        value: [email]
    }
    
    pool.query(query.text, query.value).then(data => {
        if(data.rowCount > 0){
            let name = data.rows[0].user_name;
            let newPassword = Math.random().toString(36).slice(-8)
            let hashedPassword = hashPassword(newPassword)
            let query_1 = {
                text: 'UPDATE users SET password = $1 WHERE email = $2',
                value: [hashedPassword, email]
            }
            pool.query(query_1.text, query_1.value).then(uploadRes => {
                addCandidateMailer(email, name, newPassword)
                return res.status(201).json('Password Updated')
            }).catch(err => {
                return res.status(401).json(err);
            })

        }else{
            return res.status(401).json('Email not found');
        }
    }).catch(err => {
        return res.status(401).json(err);
    })
}

const Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "koenaite8@gmail.com",
        pass: "vkqtqhprquyzdhys"
    },
    tls: {
        rejectUnauthorized: false
    }
});

const addCandidateMailer = (email, name, password) => {
    let mailOptions = {
        from: 'koenaite8@gmail.com', // sender address
        to: email, // list of receivers
        //cc:'etlhako@gmail.com',
        subject: 'Temporary Password', // Subject line
        // text: text, // plain text body
        html:
            `<h3>Greetings ${name},</h3><br>
        <h3>This email serves to inform you that your account is now active😊, <br>
        
        Below are your login credentials you, your password can be updated at your own discretion on our platform:</h3><br>
        <h2><ul><u>Login Details</u><h2/>
        Username: ${email}<br>
        password: ${password}<br>
        visit our site at <a href="https://edu-app-inc.herokuapp.com/">Visit eduapp.co.za!</a><br><br>
        </ul><h3>
        kind Regards,<br>
         EduInc Team
         </h3>`
        // html body
    };
    Transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        }
    });

}

module.exports.updatePassword = (req, res) => {
    let object = {
        newPassword: req.body.newPassword,
        id: req.body.id
    }
    

    let query = {
        text: 'SELECT * FROM users WHERE id = $1',
        value: [object.id]
    }

    pool.query(query.text, query.value).then(data => {
        let decryptPassword = data.rows[0].password

        if(object.newPassword !== decryptPassword) {
            let hashedPassword = hashPassword(object.newPassword)
            let query_1 = {
                text: 'UPDATE users SET password = $1 WHERE id = $2',
                value: [hashedPassword, object.id]
            }
            pool.query(query_1.text, query_1.value).then(uploadRes => {
                return res.status(201).json('Password Updated')
            }).catch(err => {
                return res.status(400).json(err);
            })
        }
        else{
            return res.status(401).json('New password is the same as the old password')
        }
    }).catch(err => {
        return res.status(400).json(err);
    })

}

module.exports.userDocs = (req, res) => {
    let query = {
        text: 'SELECT * FROM qualification WHERE moderator_id = $1',
        value: [req.body.moderator_id]
    }

    pool.query(query.text, query.value).then(data => {
        return res.status(200).json(data.rows)
    }).catch(err => {
        return res.status(400).json(err);
    })
}
