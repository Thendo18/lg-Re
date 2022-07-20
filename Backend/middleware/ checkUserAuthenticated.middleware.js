const verify= (req, res, next) => {
    //console.log(req);
    console.log('authorization header:', req.headers.authorization)
    next()
}


module.exports ={
    verify
}
