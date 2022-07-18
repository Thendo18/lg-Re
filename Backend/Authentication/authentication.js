const jwt = require('jsonwebtoken');
/**
 * Authentication for userType 'moderator' and 'admin' for protected routes
 * @param {*} req { body.jwt }
 * @param {*} res { status(), json() }
 * @param {*} next 
 * @returns error message if user is not a moderator user
 */
 module.exports.authmoderatortUser = (req, res, next) => {
    let token = '';

    if (token) {    //token exists
        let decoded = jwt.verify(token, 'w');

        if (decoded) {  //token verified
            //set req{ userType, userId} to be used by controller
            req.userType = decoded.userType;
            req.userId = decoded.id;

            if(decoded.userType === 'moderator' || decoded.userType === 'admin') {    //user is a moderator user
                next();
            } else {return res.status(401).json('please login as a moderator to access this feature')}

        } else {return res.json.status(401).json('token invalid. Please Login')}

    } else { return res.status(401).json('token not found. Please Login.')}
}

/**
 * Authentication for userType 'client' and 'admin' for protected routes
 * @param {*} req { body.jwt }
 * @param {*} res { status(), json() }
 * @param {*} next 
 * @returns error message if user is not a client user
 */
 module.exports.authclienttUser = (req, res, next) => {
    let token = '';

    if (token) {    //token exists
        let decoded = jwt.verify(token, 'w');

        if (decoded) {  //token verified
            // set req{ userType, userId} to be used by controller
            req.userType = decoded.userType;
            req.userId = decoded.id;

            if(decoded.userType === 'client' || decoded.userType === 'admin') {    //user is a client user
                next();
            } else {return res.status(401).json('please login as a client to access this feature')}

        } else {return res.json.status(401).json('token invalid. Please Login')}

    } else { return res.status(401).json('token not found. Please Login.')}
}

/**
 * Authentication for userType 'admin' for protected routes
 * @param {*} req { body.jwt }
 * @param {*} res { status(), json() }
 * @param {*} next 
 * @returns error message if user is not a admin user
 */
 module.exports.authAdminUser = (req, res, next) => {
    let token = '';

    if (token) {    //token exists
        let decoded = jwt.verify(token, 'w');

        if (decoded) {  //token verified
            //set req{ userType, userId} to be used by controller
            req.userType = decoded.userType;
            req.userId = decoded.id;

            if(decoded.userType === 'admin') { //user is a Admin user
                next();
            } else {return res.status(401).json('please login as an admin to access this feature')}

        } else {return res.json.status(401).json('token invalid. Please Login')}

    } else { return res.status(401).json('token not found. Please Login.')}
}

/**
 * Authentication for any logged in user for protected routes
 * @param {*} req { body.jwt }
 * @param {*} res { status(), json() }
 * @param {*} next 
 * @returns error message if user is not logged in
 */
 module.exports.authUser = (req, res, next) => {
    let token = '';

    if (token) { //token exists
        let decoded = jwt.verify(token, 'w');

        if (decoded) {  //token verified
            //set req{ userType, userId} to be used by controller
            req.userType = decoded.userType;
            req.userId = decoded.id;
            next()
        } else {return res.json.status(401).json('token invalid. Please Login')}

    } else { return res.status(401).json('token not found. Please Login.')}
}
